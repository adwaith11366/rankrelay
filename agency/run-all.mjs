// RankRelay daily run. One command: live crawl, 7 agents, Project Manager audit, Sheet ledger, email.
// Flags: --no-email skips the email (the 8:00 AM Apps Script trigger sends it on scheduled days).
//        --dry-run skips Claude and the bridge, to test the wiring.
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, readdirSync, writeFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, loadEnv } from "./env.mjs";
import { crawl } from "./tools/crawl.mjs";
import { orders } from "./prompts.mjs";
import { post } from "./bridge/bridge.mjs";

loadEnv();
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const noEmail = args.has("--no-email");
const roster = JSON.parse(readFileSync(join(ROOT, "agency", "roster.json"), "utf8"));
const siteUrl = process.env.SITE_URL || "http://localhost:4173";
const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
const relDir = `outputs/${stamp}`;
const outDir = join(ROOT, relDir);
mkdirSync(outDir, { recursive: true });

const c = { p: "\x1b[95m", b: "\x1b[94m", g: "\x1b[92m", r: "\x1b[91m", y: "\x1b[93m", d: "\x1b[2m", x: "\x1b[0m", B: "\x1b[1m" };
const say = (s = "") => console.log(s);
const banner = (n, title, note) => {
  say(`\n${c.p}${c.B}=== STEP ${n}: ${title} ===${c.x}`);
  if (note) say(`${c.d}${note}${c.x}`);
};

function runClaude(agent, prompt) {
  return new Promise((resolve) => {
    const start = new Date();
    if (dryRun) {
      const file = join(outDir, `${agent.id}.md`);
      if (!existsSync(file)) writeFileSync(file, `Dry run output for ${agent.name}.\n`);
      return resolve({ agent, start, end: new Date(), code: 0, result: "dry run" });
    }
    const env = { ...process.env };
    for (const k of Object.keys(env)) if (k.startsWith("CLAUDE_CODE_") || k === "CLAUDECODE") delete env[k];
    const argv = ["-p", "--output-format", "json", "--model", process.env.AGENT_MODEL || "sonnet",
      "--permission-mode", "acceptEdits", "--allowedTools", "Read,Write,Glob,Grep,WebSearch"];
    const child = spawn("claude", argv, { cwd: ROOT, env, shell: process.platform === "win32", stdio: ["pipe", "pipe", "pipe"] });
    let out = "", err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.stdin.end(prompt);
    const timer = setTimeout(() => child.kill(), 12 * 60 * 1000);
    child.on("close", (code) => {
      clearTimeout(timer);
      let result = "", isError = code !== 0;
      try { const j = JSON.parse(out); result = j.result || ""; isError = isError || j.is_error; } catch { result = out.slice(-300); }
      const line = (result.match(/RESULT:\s*(.+)/) || [])[1]?.trim();
      writeFileSync(join(outDir, `${agent.id}.log.txt`), `${result}\n${err}`);
      resolve({ agent, start, end: new Date(), code: isError ? 1 : code, result: line || result.slice(0, 160) || err.slice(0, 160) });
    });
  });
}

async function runStage(agents, audit) {
  const started = Date.now();
  const pending = new Set(agents.map((a) => a.name));
  agents.forEach((a) => say(`${c.b}>> ${a.name}${c.x} ${c.d}(${a.kit}) ${a.task}${c.x}`));
  const tick = setInterval(() => say(`${c.d}   working (${Math.round((Date.now() - started) / 1000)}s): ${[...pending].join(", ")}${c.x}`), 20000);
  const results = await Promise.all(agents.map(async (a) => {
    const r = await runClaude(a, orders[a.id](a, relDir, audit));
    pending.delete(a.name);
    const ok = r.code === 0 && existsSync(join(outDir, `${a.id}.md`)) || (a.id === "project-manager" && existsSync(join(outDir, "daily-brief.md")));
    r.ok = ok;
    say(`${ok ? c.g + "[DONE]" : c.r + "[FAIL]"}${c.x} ${a.name} ${c.d}${Math.round((r.end - r.start) / 1000)}s${c.x}: ${r.result}`);
    return r;
  }));
  clearInterval(tick);
  return results;
}

// Records each run in the kit's own runlog.jsonl, the file the Chief of Staff kit is built to read.
function kitRunlog(r) {
  if (dryRun) return true;
  const a = r.agent;
  const kit = join(ROOT, "employees", a.kit);
  const res = spawnSync(process.execPath, [join(kit, "scripts", "runlog.mjs"), "--root", kit, "--routine", a.routine,
    "--period", stamp.slice(0, 10), "--start", r.start.toISOString(), "--end", r.end.toISOString(),
    "--status", r.ok ? "ok" : "failed", "--output", `${relDir}/${a.id}.md`, "--notes", "RankRelay work order"], { encoding: "utf8" });
  return res.status === 0;
}

function auditFiles(results) {
  return results.map((r) => {
    const file = join(outDir, `${r.agent.id}.md`);
    const bytes = existsSync(file) ? statSync(file).size : 0;
    return {
      agent: r.agent.name,
      kit: r.agent.kit,
      exitOk: r.code === 0,
      outputFile: `${r.agent.id}.md`,
      bytes,
      runlogWritten: r.logged,
      seconds: Math.round((r.end - r.start) / 1000),
      verdict: r.code === 0 && bytes > 200 ? "Success" : "Failed",
    };
  });
}

say(`${c.p}${c.B}RankRelay${c.x}: ${roster.type} for ${roster.client}`);
say(`${c.d}Run folder: ${relDir}${c.x}`);

banner(1, "Live crawl of the client site", `Fetching ${siteUrl}`);
const site = await crawl(siteUrl, outDir, ["packing-list-backpack.html"]);
const live = site.pages.filter((p) => p.status === 200).length;
const broken = site.pages.filter((p) => p.status !== 200);
say(`${c.g}[DONE]${c.x} ${site.pages.length} URLs checked, ${live} returned 200, ${broken.length} failed ${broken.map((p) => p.url.split("/").pop()).join(" ")}`);
if (live === 0) { say(`${c.r}Site unreachable. Stopping.${c.x}`); process.exit(1); }

banner(2, "Stage 1 agents work in parallel", "Each one is a separate Claude Code run with its kit's ROLE.md as its charter");
const stage1 = await runStage(roster.agents.filter((a) => a.stage === 1));
banner(3, "Stage 2 agents build on stage 1 outputs");
const stage2 = await runStage(roster.agents.filter((a) => a.stage === 2));
const seven = [...stage1, ...stage2];
seven.forEach((r) => (r.logged = kitRunlog(r)));

banner(4, "Project Manager audits all 7 agents", "Files, sizes and exit codes are checked by code, then the PM reads the work");
const audit = auditFiles(seven);
audit.forEach((a) => say(`  ${a.verdict === "Success" ? c.g : c.r}${a.verdict.padEnd(8)}${c.x}${a.agent.padEnd(22)}${String(a.bytes).padStart(7)} bytes  runlog:${a.runlogWritten ? "yes" : "NO"}`));
const [pm] = await runStage([roster.manager], audit);
pm.logged = kitRunlog(pm);
const briefFile = join(outDir, "daily-brief.md");
const brief = existsSync(briefFile) ? readFileSync(briefFile, "utf8") : "The Project Manager did not produce a brief on this run.";

banner(5, "Files created this run");
readdirSync(outDir).filter((f) => !f.endsWith(".log.txt")).forEach((f) => say(`  ${relDir}/${f} ${c.d}(${statSync(join(outDir, f)).size} bytes)${c.x}`));

const now = () => new Date().toISOString();
const rows = [
  ...seven.map((r, i) => ({ timestamp: r.end.toISOString(), agent: r.agent.name, task: r.agent.task, status: audit[i].verdict })),
  { timestamp: now(), agent: roster.manager.name, task: roster.manager.task, status: existsSync(briefFile) ? "Success" : "Failed" },
];
appendFileSync(join(ROOT, "outputs", "ledger.csv"), rows.map((r) => [r.timestamp, r.agent, r.task, r.status].map((v) => `"${v}"`).join(",")).join("\n") + "\n");

banner(6, "Update the live Google Sheet ledger");
if (dryRun) {
  say(`${c.y}Dry run: ${rows.length} rows held back${c.x}`);
} else {
  const res = await post({ action: "log", rows });
  say(`${c.g}[DONE]${c.x} ${res.appended} rows appended`);
  say(`${c.d}Ledger: ${res.sheetUrl}${c.x}`);
  await post({ action: "brief", brief });
  say(`${c.g}[DONE]${c.x} Daily brief stored in the Briefs tab`);
}

banner(7, "Send the status bulletin");
if (dryRun || noEmail) {
  say(`${c.y}Skipped here; the 8:00 AM Apps Script trigger sends it.${c.x}`);
} else {
  const res = await post({ action: "email" });
  say(`${c.g}[DONE]${c.x} Sent "${res.subject}"`);
}

const failures = rows.filter((r) => r.status !== "Success").length;
say(`\n${c.p}${c.B}Run complete:${c.x} ${rows.length - failures} of ${rows.length} agents succeeded.`);
process.exit(failures ? 1 : 0);
