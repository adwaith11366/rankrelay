// Crawls the client site over HTTP and writes real findings to <outDir>/crawl.json.
// Starts at the home page, follows internal links, and also fetches every sitemap URL,
// so orphan pages that appear only in a known URL list can be compared.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const strip = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`, "i")) || [])[1];

function parse(html) {
  const meta = html.match(/<meta[^>]+name="description"[^>]*>/i);
  const images = html.match(/<img\b[^>]*>/gi) || [];
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  return {
    title: (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "",
    description: meta ? attr(meta[0], "content") || "" : "",
    h1Count: (html.match(/<h1\b/gi) || []).length,
    h2: [...html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/gi)].map((m) => m[1]),
    wordCount: strip(html.replace(/<footer[\s\S]*?<\/footer>/i, "").replace(/<header[\s\S]*?<\/header>/i, "")).split(" ").length,
    imagesMissingAlt: images.filter((i) => !/\balt="/i.test(i)).length,
    schemaTypes: scripts.map((m) => { try { return JSON.parse(m[1])["@type"]; } catch { return "invalid"; } }),
    links: [...html.matchAll(/<a\b[^>]*href="([^"#]+)"/gi)].map((m) => m[1]),
  };
}

export async function crawl(siteUrl, outDir, knownPaths = []) {
  const base = siteUrl.replace(/\/$/, "") + "/";
  const origin = new URL(base).origin;
  const get = async (url) => {
    try {
      const r = await fetch(url, { redirect: "follow", headers: { "User-Agent": "RankRelayCrawler/1.0" } });
      return { status: r.status, text: await r.text() };
    } catch (e) {
      return { status: 0, text: "", error: e.message };
    }
  };
  const norm = (u) => u.replace(/index\.html$/, "");

  const robots = await get(base + "robots.txt");
  const sitemap = await get(base + "sitemap.xml");
  const llms = await get(base + "llms.txt");
  const sitemapUrls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const pages = new Map();
  const inbound = new Map();
  const linkedFrom = new Map();
  const queue = [base];
  const seen = new Set(queue);
  while (queue.length) {
    const url = queue.shift();
    const res = await get(url);
    const info = { url, status: res.status };
    if (res.status === 200 && !/\.(xml|txt|css|svg)$/.test(url)) {
      Object.assign(info, parse(res.text));
      for (const href of info.links) {
        const target = new URL(href, url);
        if (target.origin !== origin) continue;
        const key = norm(target.href);
        if (key !== norm(url)) {
          inbound.set(key, (inbound.get(key) || 0) + 1);
          if (!linkedFrom.has(key)) linkedFrom.set(key, new Set());
          linkedFrom.get(key).add(url);
        }
        if (!seen.has(key)) { seen.add(key); queue.push(key); }
      }
      delete info.links;
    }
    pages.set(norm(url), info);
  }

  // Pages that the link graph can't reach still count if a sitemap or known path lists them.
  const crawled = new Set(pages.keys());
  const extras = [...sitemapUrls.map(norm), ...knownPaths.map((p) => norm(base + p))].filter((u) => !crawled.has(u));
  for (const url of new Set(extras)) {
    const res = await get(url);
    const info = { url, status: res.status };
    if (res.status === 200) { Object.assign(info, parse(res.text)); delete info.links; }
    pages.set(url, info);
  }

  const sitemapSet = new Set(sitemapUrls.map(norm));
  const list = [...pages.values()].map((p) => ({
    ...p,
    inboundLinks: inbound.get(norm(p.url)) || 0,
    linkedFrom: p.status === 200 ? undefined : [...(linkedFrom.get(norm(p.url)) || [])],
    inSitemap: sitemapSet.has(norm(p.url)),
  }));

  // Fixed formulas, so a score only moves when the site moves. Each score is a plain average of shares.
  const live = list.filter((p) => p.status === 200);
  const pct = (n) => (100 * n) / (live.length || 1);
  const shares = {
    live: (100 * live.length) / (list.length || 1),
    description: pct(live.filter((p) => p.description).length),
    singleH1: pct(live.filter((p) => p.h1Count === 1).length),
    sitemap: pct(live.filter((p) => p.inSitemap).length),
    schema: pct(live.filter((p) => p.schemaTypes?.length).length),
    h2: pct(live.filter((p) => p.h2?.length).length),
    llms: llms.status === 200 ? 100 : 0,
  };
  const avg = (...v) => Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  const scores = {
    seo: avg(shares.live, shares.description, shares.singleH1, shares.sitemap),
    aeo: avg(shares.schema, shares.description, shares.h2, shares.llms),
    seoFormula: "average of: pages returning 200, pages with a description, pages with one H1, pages in the sitemap",
    aeoFormula: "average of: pages with schema, pages with a description, pages with H2 sections, llms.txt present",
    shares,
  };

  const result = {
    site: base,
    scores,
    crawledAt: new Date().toISOString(),
    robotsTxt: { status: robots.status },
    sitemap: { status: sitemap.status, urlCount: sitemapUrls.length },
    llmsTxt: { status: llms.status },
    pages: list,
  };
  writeFileSync(join(outDir, "crawl.json"), JSON.stringify(result, null, 2));
  return result;
}
