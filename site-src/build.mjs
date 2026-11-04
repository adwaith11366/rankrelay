// Builds the demo client site (Shoestring Atlas, a fictional budget travel blog) into docs/
// for GitHub Pages. Pages deliberately ship with real SEO and AEO defects so the agents have
// something to find. The full defect list is in site-src/SEEDED-DEFECTS.md.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "docs");
const base = (process.env.SITE_URL || "http://localhost:4173").replace(/\/$/, "");

const css = `:root{--ink:#1d2433;--muted:#5d6678;--accent:#d9480f;--bg:#fffdf9}
*{box-sizing:border-box}body{margin:0;font:18px/1.65 Georgia,serif;color:var(--ink);background:var(--bg)}
header,main,footer{max-width:720px;margin:0 auto;padding:20px}
header a.brand{font:700 22px Arial,sans-serif;color:var(--accent);text-decoration:none}
nav a{margin-right:16px;font:15px Arial,sans-serif;color:var(--ink)}
h1,h2{font-family:Arial,sans-serif;line-height:1.25}
.card{padding:14px 0;border-bottom:1px solid #eadfce}.card a{font:700 20px Arial,sans-serif;color:var(--ink)}
footer{font:14px Arial,sans-serif;color:var(--muted)}`;

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

function page({ title, desc, h1, body, schema }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
${desc ? `<meta name="description" content="${desc}">` : ""}
<link rel="stylesheet" href="style.css">
${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ""}
</head><body>
<header><a class="brand" href="index.html">Shoestring Atlas</a>
<nav><a href="index.html">Home</a><a href="about.html">About</a></nav></header>
<main>${h1 ? `<h1>${h1}</h1>` : ""}${body}</main>
<footer>Shoestring Atlas is a fictional travel blog built as a demo client for a course assignment.</footer>
</body></html>`;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "style.css"), css);
writeFileSync(join(out, ".nojekyll"), "");
writeFileSync(join(out, "assets-hostel.svg"), `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="200"><rect width="640" height="200" fill="#f3e7d3"/><path d="M80 170V90l60-40 60 40v80z" fill="#d9480f"/></svg>`);

for (const a of articles) {
  const schema = a.slug === "how-to-pack-carry-on-only"
    ? { "@context": "https://schema.org", "@type": "Article", headline: a.title, author: { "@type": "Organization", name: "Shoestring Atlas" } }
    : null;
  writeFileSync(join(out, `${a.slug}.html`), page({ title: a.title, desc: a.desc, h1: a.noH1 ? "" : a.title, body: a.body, schema }));
}

const cards = articles.filter((a) => !a.orphan).map((a) => `<div class="card"><a href="${a.slug}.html">${a.title}</a></div>`).join("\n");
writeFileSync(join(out, "index.html"), page({
  title: "Shoestring Atlas: budget travel guides",
  desc: "Budget travel guides on packing light, finding cheap flights, and eating and sleeping well for less.",
  h1: "Budget travel guides",
  body: `<p>Practical guides for travelling far on very little money.</p>${cards}`,
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
