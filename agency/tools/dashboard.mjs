// Builds docs/dashboard/index.html from a real run: crawl.json, ledger.csv and the kits' runlog.jsonl.
// The page is not linked from the client site, so it isn't part of the audited pages.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "../env.mjs";

const repo = "https://github.com/adwaith11366/rankrelay/blob/main";
const roster = JSON.parse(readFileSync(join(ROOT, "agency", "roster.json"), "utf8"));
const agents = [...roster.agents, roster.manager];

export function buildDashboard(runDir, sheetUrl) {
  const run = runDir || readdirSync(join(ROOT, "outputs"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort().pop();
  const dir = join(ROOT, "outputs", run);
  const crawl = JSON.parse(readFileSync(join(dir, "crawl.json"), "utf8"));
  const brief = existsSync(join(dir, "daily-brief.md")) ? readFileSync(join(dir, "daily-brief.md"), "utf8") : "";

  // Timing comes from each kit's own run log.
  const spans = agents.map((a) => {
    const file = join(ROOT, "employees", a.kit, "runlog.jsonl");
    const lines = existsSync(file) ? readFileSync(file, "utf8").trim().split("\n").map((l) => JSON.parse(l)) : [];
    const rec = lines.filter((l) => l.outputs?.[0]?.includes(run)).pop();
    return rec ? { ...a, start: +new Date(rec.start), end: +new Date(rec.end), status: rec.status } : { ...a, start: 0, end: 0, status: "no record" };
  }).filter((s) => s.start);
  const t0 = Math.min(...spans.map((s) => s.start));
  const t1 = Math.max(...spans.map((s) => s.end));
  const total = Math.max(1, (t1 - t0) / 1000);
  const okCount = spans.filter((s) => s.status === "ok").length;

  const stageColor = { 1: "#7A2BE0", 2: "#2563EB", 3: "#0E9F8E", 4: "#E0457B" };
  const gantt = spans.map((s) => {
    const left = (((s.start - t0) / 1000) / total) * 100;
    const width = Math.max(1, (((s.end - s.start) / 1000) / total) * 100);
    const secs = Math.round((s.end - s.start) / 1000);
    return `<div class="row"><div class="who">${s.name}</div><div class="track"><i title="${s.name}: ${secs}s, stage ${s.stage}" style="left:${left}%;width:${width}%;background:${stageColor[s.stage]}"></i></div><div class="sec">${secs}s</div></div>`;
  }).join("");

  const live = crawl.pages;
  const checks = [
    ["Status 200", (p) => p.status === 200],
    ["Description", (p) => !!p.description],
    ["One H1", (p) => p.h1Count === 1],
    ["In sitemap", (p) => p.inSitemap],
    ["Linked to", (p) => p.inboundLinks > 0],
    ["Alt text", (p) => p.status === 200 && !p.imagesMissingAlt],
    ["Schema", (p) => !!p.schemaTypes?.length],
    ["100+ words", (p) => (p.wordCount || 0) >= 100],
  ];
  const name = (p) => p.url.replace(crawl.site, "") || "home";
  const failed = live.reduce((n, p) => n + checks.filter(([, f]) => !f(p)).length, 0);
  const grid = `<table class="heat"><caption>Each cell is one check on one page</caption><thead><tr><th>Page</th>${checks.map(([c]) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${live.map((p) => `<tr><td class="pg">${name(p).replace(".html", "")}</td>${checks.map(([c, f]) => {
    const ok = f(p);
    return `<td title="${name(p)}: ${c} ${ok ? "pass" : "fail"}" class="${ok ? "pass" : "fail"}">${ok ? "pass" : "fail"}</td>`;
  }).join("")}</tr>`).join("")}</tbody></table>`;

  const gauge = (label, v, color) => {
    const r = 62, c = 2 * Math.PI * r, on = (v / 100) * c;
    return `<figure class="gauge"><svg viewBox="0 0 160 160" role="img" aria-label="${label} ${v} out of 100"><circle cx="80" cy="80" r="${r}" fill="none" stroke="#E9E6F5" stroke-width="16"/><circle cx="80" cy="80" r="${r}" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${on} ${c}" transform="rotate(-90 80 80)"/><text x="80" y="92" text-anchor="middle" font-size="38" font-weight="800" fill="#1B1740">${v}</text></svg><figcaption>${label} readiness</figcaption></figure>`;
  };

  const shares = crawl.scores.shares;
  const bars = [["Pages returning 200", shares.live], ["Have a description", shares.description], ["Have one H1", shares.singleH1], ["In the sitemap", shares.sitemap], ["Have H2 sections", shares.h2], ["Have schema", shares.schema]]
    .sort((a, b) => b[1] - a[1])
    .map(([l, v]) => `<div class="row"><div class="who">${l}</div><div class="track"><i title="${l}: ${Math.round(v)}%" style="left:0;width:${v}%;background:#2563EB"></i></div><div class="sec">${Math.round(v)}%</div></div>`).join("");

  const files = agents.map((a) => {
    const f = a.id === "project-manager" ? "daily-brief.md" : `${a.id}.md`;
    return `<a class="agent" href="${repo}/outputs/${run}/${f}"><b>${a.name}</b><span>${a.task}</span></a>`;
  }).join("");

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>RankRelay results dashboard</title><meta name="robots" content="noindex">
<style>*{box-sizing:border-box}body{margin:0;font:16px/1.5 Arial,sans-serif;color:#1B1740;background:#F6F4FF}
.head{background:linear-gradient(100deg,#7A2BE0,#2563EB);color:#fff;padding:44px 24px}
.in{max-width:1120px;margin:0 auto}.head h1{font-size:40px;margin:0 0 6px}.head p{margin:0;opacity:.92}
.head a{color:#fff}
.page{max-width:1120px;margin:-26px auto 40px;padding:0 24px;display:grid;gap:22px}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px}
.tile,.panel{background:#fff;border-radius:14px;padding:20px 22px;box-shadow:0 6px 20px rgba(60,40,140,.09)}
.tile b{display:block;font-size:36px;line-height:1.1}.tile span{color:#5B5680;font-size:14px}
.panel h2{font-size:20px;margin:0 0 4px}.panel p.sub{margin:0 0 16px;color:#5B5680;font-size:14px}
.two{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:22px}
.gauges{display:flex;gap:18px;justify-content:space-around;flex-wrap:wrap}.gauge{margin:0;text-align:center;width:170px}.gauge figcaption{font-weight:700}
.row{display:grid;grid-template-columns:170px 1fr 50px;gap:12px;align-items:center;margin:9px 0;font-size:14px}
.track{position:relative;height:18px;background:#F0EEF9;border-radius:4px}.track i{position:absolute;top:0;bottom:0;border-radius:4px}.sec{font-weight:700;text-align:right}
.key{display:flex;gap:18px;flex-wrap:wrap;font-size:13px;color:#5B5680;margin-top:10px}.key b{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:6px}
.scroll{overflow-x:auto}.heat{border-collapse:separate;border-spacing:3px;width:100%;font-size:13px}.heat caption{text-align:left;color:#5B5680;margin-bottom:8px}
.heat th{font-size:12px;color:#5B5680;font-weight:700;padding:4px}.heat td{text-align:center;padding:8px 6px;border-radius:4px}
.heat .pg{text-align:left;font-weight:700;white-space:nowrap}.pass{background:#DDF4EE;color:#0B5F4F}.fail{background:#FBD9DC;color:#9B1C2B;font-weight:700}
.agents{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}.agent{display:block;padding:14px;border-radius:10px;background:#F6F4FF;color:inherit;text-decoration:none}.agent:hover{background:#ECE7FF}.agent b{display:block}.agent span{font-size:13px;color:#5B5680}
pre{white-space:pre-wrap;font:14px/1.55 Arial,sans-serif;margin:0}
</style></head><body>
<div class="head"><div class="in"><h1>RankRelay results dashboard</h1><p>Run ${run}, for <a href="../index.html">Shoestring Atlas</a> (fictional client). <a href="${sheetUrl || "#"}">Open the live ledger</a></p></div></div>
<div class="page">
<div class="tiles"><div class="tile"><b>${okCount} of ${agents.length}</b><span>agents finished</span></div><div class="tile"><b>${live.length}</b><span>URLs crawled</span></div><div class="tile"><b>${failed}</b><span>failed checks found</span></div><div class="tile"><b>${Math.floor(total / 60)}m ${Math.round(total % 60)}s</b><span>agent run time</span></div></div>
<div class="two"><div class="panel"><h2>Readiness scores</h2><p class="sub">Out of 100, computed from the crawl by fixed formulas</p><div class="gauges">${gauge("SEO", crawl.scores.seo, "#7A2BE0")}${gauge("AEO", crawl.scores.aeo, "#2563EB")}</div></div>
<div class="panel"><h2>What holds the scores down</h2><p class="sub">Share of live pages passing each check</p>${bars}</div></div>
<div class="panel"><h2>Agent timeline</h2><p class="sub">Start and finish of each agent, from the kits' run logs</p>${gantt}<div class="key"><span><b style="background:#7A2BE0"></b>Stage 1: parallel analysis</span><span><b style="background:#2563EB"></b>Stage 2: writing</span><span><b style="background:#0E9F8E"></b>Stage 3: campaign and outbound</span><span><b style="background:#E0457B"></b>Stage 4: Project Manager</span></div></div>
<div class="panel"><h2>Page health</h2><p class="sub">Live results from the crawler</p><div class="scroll">${grid}</div></div>
<div class="panel"><h2>Project Manager brief</h2><p class="sub">Written by the agent at the end of this run</p><pre>${esc(brief)}</pre></div>
<div class="panel"><h2>Agent outputs</h2><p class="sub">Each card opens that agent's file on GitHub</p><div class="agents">${files}</div></div>
</div></body></html>`;
  mkdirSync(join(ROOT, "docs", "dashboard"), { recursive: true });
  writeFileSync(join(ROOT, "docs", "dashboard", "index.html"), html);
  return { run, failed, seo: crawl.scores.seo, aeo: crawl.scores.aeo, okCount, total: Math.round(total) };
}

if (process.argv[1]?.endsWith("dashboard.mjs")) {
  const { loadEnv } = await import("../env.mjs");
  loadEnv();
  console.log(buildDashboard(process.argv[2], process.env.SHEET_URL));
}
