// Builds the demo client site (Shoestring Atlas, a fictional budget travel blog) into docs/
// for GitHub Pages. Pages deliberately ship with real SEO and AEO defects so the agents have
// something to find. The full defect list is in site-src/SEEDED-DEFECTS.md.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { hero, thumb, washCalendar, fareCalendar, hostelChart, eatChart } from "./art.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "docs");
const base = (process.env.SITE_URL || "http://localhost:4173").replace(/\/$/, "");

const css = `:root{--ink:#12343B;--muted:#55707A;--accent:#E8590C;--teal:#008F7E;--bg:#FBFAF6;--card:#fff;--line:#E6E1D6}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font:18px/1.7 Georgia,'Times New Roman',serif;color:var(--ink);background:var(--bg)}
img{max-width:100%;display:block;height:auto}
.top{position:sticky;top:0;z-index:5;background:rgba(251,250,246,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.top-in{max-width:1120px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between}
a.brand{display:flex;align-items:center;gap:10px;font:800 21px Arial,sans-serif;color:var(--ink);text-decoration:none}
a.brand img{width:34px;height:34px}
nav a{margin-left:22px;font:600 15px Arial,sans-serif;color:var(--ink);text-decoration:none}
nav a:hover{color:var(--accent)}
.hero{position:relative;height:540px;overflow:hidden;color:#fff;background:#12343B}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero-in{position:relative;max-width:1120px;margin:0 auto;padding:110px 24px 0}
.hero h1{font:800 clamp(40px,6.4vw,74px)/1.05 Arial,sans-serif;margin:0 0 16px;letter-spacing:-1px;max-width:760px}
.hero p{font-size:21px;max-width:560px;margin:0 0 26px}
.btn{display:inline-block;background:var(--accent);color:#fff;font:700 16px Arial,sans-serif;padding:14px 24px;border-radius:999px;text-decoration:none}
.btn:hover{background:#C94A08}
.wrap{max-width:1120px;margin:0 auto;padding:56px 24px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:26px}
.card{display:block;background:var(--card);border-radius:16px;overflow:hidden;text-decoration:none;color:var(--ink);box-shadow:0 8px 24px rgba(18,52,59,.09);transition:transform .25s,box-shadow .25s}
.card:hover{transform:translateY(-6px);box-shadow:0 16px 34px rgba(18,52,59,.16)}
.card span{display:block;padding:18px 20px 22px;font:700 19px/1.3 Arial,sans-serif}
.sec{font:800 32px/1.2 Arial,sans-serif;margin:0 0 8px}
.lead{color:var(--muted);margin:0 0 28px}
.budget{background:#fff;border-radius:16px;padding:30px;box-shadow:0 8px 24px rgba(18,52,59,.09)}
.bar{display:flex;gap:2px;height:44px;margin:22px 0 14px}
.bar i{display:block;border-radius:4px}
.legend{display:flex;flex-wrap:wrap;gap:10px 26px;font:15px Arial,sans-serif}
.legend b{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:7px}
.note{font:13px Arial,sans-serif;color:var(--muted);margin:14px 0 0}
.art-head{position:relative;height:360px;overflow:hidden;background:#12343B}
.art-head img{width:100%;height:100%;object-fit:cover;object-position:50% 35%}
main.article{max-width:740px;margin:-46px auto 0;background:#fff;position:relative;border-radius:18px;padding:38px 46px 46px;box-shadow:0 10px 30px rgba(18,52,59,.1)}
main.plain{max-width:740px;margin:0 auto;padding:44px 24px}
.article h1,.fake-title,.plain h1{font:800 38px/1.2 Arial,sans-serif;margin:0 0 18px}
.article h2{font:800 25px/1.25 Arial,sans-serif;margin:32px 0 8px}
.article a{color:var(--teal)}
.chart{margin:26px 0;background:var(--bg);border-radius:12px;padding:6px}
footer{background:#12343B;color:#CFE3E4;font:14px Arial,sans-serif;margin-top:60px}
footer div{max-width:1120px;margin:0 auto;padding:28px 24px}
@media(max-width:640px){main.article{padding:26px 22px;border-radius:0}.hero{height:460px}.hero-in{padding-top:70px}}`;

const articles = [
  {
    slug: "how-to-pack-carry-on-only",
    title: "How to pack for two weeks in one carry-on bag",
    desc: "A two-week packing list that fits one carry-on bag, with what to leave at home and how to do laundry on the road.",
    body: `<p>Two weeks in one carry-on works if you pack for five days and wash clothes twice. Most budget airlines charge more for a checked bag than a night in a hostel, so the smaller bag pays for itself.</p>
<h2>What goes in the bag</h2>
<p>Take five tops, two bottoms, one warm layer, one rain shell, five pairs of underwear and socks, and sandals in addition to the shoes you wear on the plane. Pick colours that all match each other.</p>
<h2>What stays at home</h2>
<p>Leave the hair dryer, the second pair of jeans, full-size toiletries and anything packed "just in case." Hostels and pharmacies abroad sell nearly everything you forgot.</p>
<h2>How do you do laundry while travelling?</h2>
<p>Wash small items in a sink with a bar of soap and hang them overnight. Every seven days or so, use a laundromat or a hostel's laundry service.</p>`,
  },
  {
    slug: "cheap-flights-timing",
    title: "When to book cheap flights",
    desc: "When to book flights for lower fares, how flexible dates help, and why the cheapest fare is not always the best one.",
    body: `<p>Flight prices change constantly, so no single day guarantees the lowest fare. Flexible dates usually save more than any booking trick.</p>
<h2>Search a whole month</h2>
<p>Use a fare calendar and compare every departure date in the month. Midweek departures are often cheaper than Fridays and Sundays.</p>
<h2>Count the real price</h2>
<p>Add bag fees, seat fees and the cost of reaching a distant airport. A low headline fare can end up costing more than a full-service ticket.</p>
<p>Read our <a href="/rankrelay/travel-insurance-basics.html">travel insurance guide</a> before you pay.</p>`,
  },
  {
    slug: "hostel-vs-guesthouse",
    title: "Hostel or guesthouse: which is cheaper for solo travellers?",
    desc: "",
    body: `<p>A hostel dorm bed is usually the cheapest bed in town, but a guesthouse room can beat it when two people split the cost.</p>
<h2>When a hostel wins</h2>
<p>Solo travellers save the most in dorms, and shared kitchens cut food costs. Hostels are also the easiest place to meet people.</p>
<h2>When a guesthouse wins</h2>
<p>Two people sharing a private room often pay about the same as two dorm beds, and they get a door that locks and a quieter night.</p>
<img src="assets-hostel.svg">`,
  },
  {
    slug: "eat-on-a-budget",
    title: "Eat well on ten dollars a day",
    desc: "How to eat well for ten dollars a day while travelling: markets, lunch menus and hostel kitchens.",
    noH1: true,
    body: `<p>Eat your biggest meal at lunch. Many restaurants run a fixed lunch menu that costs far less than the same food at dinner.</p>
<h2>Shop at markets</h2>
<p>Local markets sell fruit, bread and cheese for a fraction of what tourist-street cafes charge.</p>
<h2>Use the hostel kitchen</h2>
<p>One pot of pasta or rice can cover two meals.</p>`,
  },
  {
    slug: "visa-free-basics",
    title: "Visa basics",
    desc: "Visa basics.",
    body: `<p>Check the rules for your own passport with the embassy of the country you plan to visit before you book.</p>`,
  },
  {
    slug: "packing-list-backpack",
    title: "How to pack for two weeks in one carry-on bag",
    desc: "A two-week packing list that fits one carry-on bag, with what to leave at home and how to do laundry on the road.",
    orphan: true,
    body: `<p>This older version of our packing list covers the same ground. Pack for five days and wash twice, and leave the extras at home.</p>`,
  },
];

const art = {
  "how-to-pack-carry-on-only": ["dawn", "bag"],
  "cheap-flights-timing": ["noon", "plane"],
  "hostel-vs-guesthouse": ["plum", "bed"],
  "eat-on-a-budget": ["sand", "bowl"],
  "visa-free-basics": ["sea", "passport"],
  "packing-list-backpack": ["dusk", "list"],
};
const charts = {
  "how-to-pack-carry-on-only": ["chart-wash.svg", "Calendar of 14 days showing two wash days, on days 5 and 10"],
  "cheap-flights-timing": ["chart-fares.svg", "Heat calendar of example fares, lower from Tuesday to Thursday"],
  "eat-on-a-budget": ["chart-meals.svg", "Bar chart of example meal prices: market picnic $4, lunch menu $9, dinner $18"],
};

function page({ title, desc, h1, body, schema, cover, fakeTitle, home }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
${desc ? `<meta name="description" content="${desc}">` : ""}
<link rel="stylesheet" href="style.css">
${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ""}
</head><body>
<header class="top"><div class="top-in"><a class="brand" href="index.html"><img src="logo.svg" alt="">Shoestring Atlas</a>
<nav><a href="index.html">Home</a><a href="about.html">About</a></nav></div></header>
${home ? body : `${cover ? `<div class="art-head"><img src="${cover}" alt="${title} illustration"></div>` : ""}
<main class="${cover ? "article" : "plain"}">${h1 ? `<h1>${h1}</h1>` : ""}${fakeTitle ? `<div class="fake-title">${fakeTitle}</div>` : ""}${body}</main>`}
<footer><div>Shoestring Atlas is a fictional travel blog built as a demo client for a course assignment.</div></footer>
</body></html>`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "style.css"), css);
writeFileSync(join(out, ".nojekyll"), "");
writeFileSync(join(out, "assets-hostel.svg"), hostelChart());
writeFileSync(join(out, "chart-wash.svg"), washCalendar());
writeFileSync(join(out, "chart-fares.svg"), fareCalendar());
writeFileSync(join(out, "chart-meals.svg"), eatChart());
writeFileSync(join(out, "hero.svg"), hero());
writeFileSync(join(out, "logo.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">${`<circle r="46" fill="#12343B"/><path d="M0 -32 L10 -8 L32 0 L10 8 L0 32 L-10 8 L-32 0 L-10 -8Z" fill="#F4A261"/>`}</svg>`);
for (const [slug, [pal, icon]] of Object.entries(art)) writeFileSync(join(out, `art-${slug}.svg`), thumb(pal, icon));

for (const a of articles) {
  const schema = a.slug === "how-to-pack-carry-on-only"
    ? { "@context": "https://schema.org", "@type": "Article", headline: a.title, author: { "@type": "Organization", name: "Shoestring Atlas" } }
    : null;
  const chart = charts[a.slug] ? `<div class="chart"><img src="${charts[a.slug][0]}" alt="${charts[a.slug][1]}"></div>` : "";
  writeFileSync(join(out, `${a.slug}.html`), page({
    title: a.title, desc: a.desc, h1: a.noH1 ? "" : a.title, fakeTitle: a.noH1 ? a.title : "",
    body: a.body + chart, schema, cover: `art-${a.slug}.svg`,
  }));
}

const cards = articles.filter((a) => !a.orphan).map((a) => `<a class="card" href="${a.slug}.html"><img src="art-${a.slug}.svg" alt="" width="640" height="360"><span>${a.title}</span></a>`).join("\n");
const spend = [["Bed", 15, "#008F7E"], ["Food", 12, "#E8590C"], ["Transport", 8, "#2B6CB0"], ["Activities", 5, "#8E3B8A"]];
writeFileSync(join(out, "index.html"), page({
  title: "Shoestring Atlas: budget travel guides",
  desc: "Budget travel guides on packing light, finding cheap flights, and eating and sleeping well for less.",
  home: true,
  body: `<section class="hero"><img src="hero.svg" alt="" width="1600" height="620"><div class="hero-in"><h1>Budget travel guides</h1>
<p>Practical guides for travelling far on very little money.</p><a class="btn" href="#guides">Start reading</a></div></section>
<div class="wrap" id="guides"><h2 class="sec">Latest guides</h2><p class="lead">Packing, flights, beds and food.</p><div class="grid">${cards}</div></div>
<div class="wrap" style="padding-top:0"><div class="budget"><h2 class="sec">Where forty dollars a day can go</h2>
<div class="bar">${spend.map(([n, v, c]) => `<i title="${n}: $${v}" style="flex:${v};background:${c}"></i>`).join("")}</div>
<div class="legend">${spend.map(([n, v, c]) => `<span><b style="background:${c}"></b>${n} $${v}</span>`).join("")}</div>
<p class="note">Example budget for illustration, not survey data.</p></div></div>`,
}));
writeFileSync(join(out, "about.html"), page({
  title: "About",
  desc: "About Shoestring Atlas.",
  h1: "About Shoestring Atlas",
  body: `<p>Shoestring Atlas publishes budget travel guides.</p>`,
}));
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);

// Sitemap leaves out two live pages on purpose.
const urls = ["index.html", "about.html", ...articles.filter((a) => !a.orphan && a.slug !== "eat-on-a-budget").map((a) => `${a.slug}.html`)];
writeFileSync(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${base}/${u}</loc></url>`).join("\n")}
</urlset>
`);
console.log(`Built ${articles.length + 2} pages into docs/ for ${base}`);
