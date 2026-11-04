# Technical audit: Shoestring Atlas

Source for every figure below: outputs/2026-11-04-21-45/crawl.json (crawledAt 2026-11-04T21:45:38.651Z). Site crawled: https://adwaith11366.github.io/rankrelay/

The crawl covers 9 URLs. 8 return 200 and 1 returns 404. Crawl scores: SEO 85, AEO 41. Nothing was changed on the site; every fix below is a proposal for human approval.

## Summary of defects

| # | Defect | Count | Severity |
|---|---|---|---|
| 1 | Broken internal link target (404) | 1 URL | High |
| 2 | Duplicate title and description | 2 URLs | High |
| 3 | No llms.txt | 1 file | Medium |
| 4 | Missing schema | 7 URLs | Medium |
| 5 | Missing H1 | 1 URL | Medium |
| 6 | Missing meta description | 1 URL | Medium |
| 7 | Live page absent from sitemap | 2 URLs | Medium |
| 8 | Orphan page | 1 URL | Medium |
| 9 | Image missing alt text | 1 image on 1 URL | Medium |
| 10 | Thin pages | 7 URLs | Low to medium |
| 11 | Pages with no H2 sections | 3 URLs | Low |
| 12 | Descriptions too short to be useful | 2 URLs | Low |

## 1. Non-200 status

URL: https://adwaith11366.github.io/rankrelay/travel-insurance-basics.html
Status: 404. Severity: high.
Linked from: https://adwaith11366.github.io/rankrelay/cheap-flights-timing.html (the only page the crawl lists as linking to it).

Fix: either publish a travel-insurance-basics.html page at that path, or edit the link in cheap-flights-timing.html to point at a live page, or remove the link. Do not add this URL to the sitemap until it returns 200.

## 2. Duplicate titles

URLs:
- https://adwaith11366.github.io/rankrelay/how-to-pack-carry-on-only.html
- https://adwaith11366.github.io/rankrelay/packing-list-backpack.html

Both have the title "How to pack for two weeks in one carry-on bag" and the same description. Severity: high.

Fix: decide which page is the real guide. The crawl shows how-to-pack-carry-on-only.html is the stronger one (164 words, Article schema, 3 H2s, in the sitemap, 1 inbound link) against packing-list-backpack.html (44 words, no schema, no H2s, not in the sitemap, 0 inbound links). Recommended: add `<link rel="canonical" href="https://adwaith11366.github.io/rankrelay/how-to-pack-carry-on-only.html">` to packing-list-backpack.html, or remove that page. If it stays as its own page, give it a unique title, a unique description and real content.

## 3. Missing llms.txt

The crawl records llmsTxt status 404. Severity: medium.

Fix: publish the proposed file at outputs/2026-11-04-21-45/llms.txt to the site root so it resolves at /rankrelay/llms.txt. Human approval needed before it goes live.

## 4. Missing schema

The crawl shows empty schemaTypes on 7 live pages. Only how-to-pack-carry-on-only.html has schema (Article). Severity: medium (schema share is 12.5 percent in the crawl).

Fix, per page, as JSON-LD in the head:
- https://adwaith11366.github.io/rankrelay/ : WebSite and Organization (name Shoestring Atlas).
- https://adwaith11366.github.io/rankrelay/about.html : AboutPage.
- https://adwaith11366.github.io/rankrelay/cheap-flights-timing.html : Article.
- https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html : Article.
- https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html : Article.
- https://adwaith11366.github.io/rankrelay/visa-free-basics.html : Article.
- https://adwaith11366.github.io/rankrelay/packing-list-backpack.html : none if it is canonicalised or removed under item 2; otherwise Article.

Each Article needs headline, description and URL taken from the page itself. The crawl does not give author or dates, so those are n/a until the site owner supplies them.

## 5. Missing H1

URL: https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html
h1Count: 0. Severity: medium.

Fix: add one H1 above the existing H2s, matching the title: "Eat well on ten dollars a day".

## 6. Missing meta description

URL: https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html
Description is an empty string. Severity: medium.

Fix: add a meta description of roughly 120 to 160 characters that says what the page compares. Draft: "Hostel or guesthouse for solo travellers: when each is cheaper, and what you give up with either." The site owner should confirm it matches the page.

## 7. Pages absent from the sitemap

The sitemap has 6 URLs (sitemap.urlCount). Two live pages are missing from it:
- https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html : status 200, inSitemap false. Severity: medium. Fix: add it to sitemap.xml.
- https://adwaith11366.github.io/rankrelay/packing-list-backpack.html : status 200, inSitemap false. Severity: low. Fix: leave it out if it is canonicalised or removed under item 2; add it only if it becomes a distinct page.

The 404 URL is also absent, which is correct until it exists.

## 8. Orphan pages

URL: https://adwaith11366.github.io/rankrelay/packing-list-backpack.html
inboundLinks: 0. Severity: medium.

Fix: this ties to item 2. If the page stays, link to it from the home page or a related guide. If it is a leftover duplicate, remove it.

## 9. Missing alt text

URL: https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html
imagesMissingAlt: 1. Severity: medium.

Fix: add a descriptive alt attribute to the one image. The crawl does not name the image file, so the exact element is n/a; search the page source for `<img` without alt.

## 10. Thin pages

The crawl has no threshold for thin, so this audit uses under 100 words as its own cutoff. These pages fall under it:

| URL | Words | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/about.html | 10 | Medium |
| https://adwaith11366.github.io/rankrelay/visa-free-basics.html | 24 | Medium |
| https://adwaith11366.github.io/rankrelay/packing-list-backpack.html | 44 | Medium |
| https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html | 69 | Low |
| https://adwaith11366.github.io/rankrelay/ | 81 | Low |
| https://adwaith11366.github.io/rankrelay/cheap-flights-timing.html | 94 | Low |
| https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html | 98 | Low |

Fix: expand each guide with substantive content. The only page above 100 words is how-to-pack-carry-on-only.html at 164. The home page is a hub, so 81 words may be acceptable there. For about.html, state who runs the site and what it covers. For visa-free-basics.html, the crawl shows a 24-word page; the word count alone does not say whether the content is accurate, so a human should write it.

## 11. Pages with no H2 sections

h2 is empty on:
- https://adwaith11366.github.io/rankrelay/about.html
- https://adwaith11366.github.io/rankrelay/visa-free-basics.html
- https://adwaith11366.github.io/rankrelay/packing-list-backpack.html

Severity: low. Fix: break the content into H2 sections when expanding these pages (see item 10). Question-style H2s help answer engines; how-to-pack-carry-on-only.html already has one.

## 12. Descriptions too short to be useful

- https://adwaith11366.github.io/rankrelay/about.html : "About Shoestring Atlas."
- https://adwaith11366.github.io/rankrelay/visa-free-basics.html : "Visa basics."

Severity: low. Fix: rewrite each as one sentence saying what the reader will find.

## Pages with no defect found in the crawl

None. Every one of the 9 URLs appears in at least one item above. The best-scoring page is https://adwaith11366.github.io/rankrelay/how-to-pack-carry-on-only.html, which is flagged only for sharing its title and description with the duplicate.

## Not checked

The crawl has no data on canonical tags, robots.txt rules (only its status, 200), page speed, structured data validity, or image file names. Nothing is claimed about them.
