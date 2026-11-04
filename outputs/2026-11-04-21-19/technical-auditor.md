# Technical audit: Shoestring Atlas

Source for every figure: outputs/2026-11-04-21-19/crawl.json (crawled 2026-11-04T21:19:27.511Z). The crawl covers 9 URLs: 8 return 200 and 1 returns 404. All paths below are under https://adwaith11366.github.io/rankrelay/. Nothing was changed on the site; every fix is a proposal for a human to apply.

Severity scale: high means a broken page or a page that competes with another; medium means a missing element that affects how a page is read or cited; low means a gap with small direct impact.

## Summary table

| # | Defect | Count | Highest severity |
|---|---|---|---|
| 1 | Non-200 page | 1 | High |
| 2 | Duplicate title | 2 pages, 1 title | High |
| 3 | Orphan page | 1 | High |
| 4 | Missing H1 | 1 | Medium |
| 5 | Missing meta description | 1 | Medium |
| 6 | Image missing alt text | 1 image, 1 page | Medium |
| 7 | Page absent from sitemap | 3 | Medium |
| 8 | Thin pages | 7 | Medium |
| 9 | Missing schema | 7 of 8 live pages | Medium |
| 10 | Missing llms.txt | 1 | Medium |

## 1. Non-200 page

URL: travel-insurance-basics.html
Severity: high
Crawl shows: status 404, inboundLinks 1, inSitemap false.

A page on the site links to a URL that does not exist. The crawl does not say which page holds the link.

Fix: find the one internal link pointing to travel-insurance-basics.html. Either publish a real page at that URL, or remove the link or point it to an existing page. If the page is published, add it to sitemap.xml.

## 2. Duplicate title

URLs:
- how-to-pack-carry-on-only.html
- packing-list-backpack.html

Severity: high
Crawl shows: both have the title "How to pack for two weeks in one carry-on bag". Their descriptions are also identical.

Fix: keep how-to-pack-carry-on-only.html as the main page (164 words, Article schema, in sitemap). On packing-list-backpack.html, either add `<link rel="canonical" href="https://adwaith11366.github.io/rankrelay/how-to-pack-carry-on-only.html">` in the head, or retitle and rewrite it as a distinct backpack page with its own title and description. Also see items 3, 7 and 8, which hit the same page.

## 3. Orphan page

URL: packing-list-backpack.html
Severity: high
Crawl shows: inboundLinks 0, inSitemap false, wordCount 44.

No page links to it.

Fix: decide with item 2. If the page stays, link to it from the home page and from how-to-pack-carry-on-only.html, and add it to the sitemap. If it is a duplicate, remove it or canonicalise it and do not link to it.

## 4. Missing H1

URL: eat-on-a-budget.html
Severity: medium
Crawl shows: h1Count 0. The page has two H2s ("Shop at markets", "Use the hostel kitchen").

Fix: add one `<h1>Eat well on ten dollars a day</h1>` at the top of the main content. The text matches the page's current title.

## 5. Missing meta description

URL: hostel-vs-guesthouse.html
Severity: medium
Crawl shows: description is an empty string.

Fix: add `<meta name="description" content="...">` in the head. Draft for human approval: "When a hostel is the cheaper choice for a solo traveller, and when a guesthouse wins." The wording draws only on the page's title and its two H2s.

## 6. Missing alt text

URL: hostel-vs-guesthouse.html
Severity: medium
Crawl shows: imagesMissingAlt 1.

The crawl does not give the image file name or what it shows.

Fix: open the page source, find the `<img>` with no alt attribute, and add alt text that describes the image. If the image is decorative, use `alt=""`.

## 7. Pages absent from the sitemap

The sitemap has 6 URLs (sitemap.urlCount 6). Three crawled URLs are not in it:

- eat-on-a-budget.html (status 200). Severity: medium. Fix: add a `<url><loc>` entry for it.
- packing-list-backpack.html (status 200). Severity: medium. Fix: add it only if it stays as a distinct page (see items 2 and 3).
- travel-insurance-basics.html (status 404). Severity: low. Fix: none while it is a 404. Add it only after the page is published (item 1).

## 8. Thin pages

The crawl gives word counts but sets no threshold. I used under 100 words as the line; that is my choice, not a crawl figure. Seven of the 8 live pages fall under it.

| URL | Words | Severity |
|---|---|---|
| about.html | 10 | Medium |
| visa-free-basics.html | 24 | Medium |
| packing-list-backpack.html | 44 | Medium (see items 2 and 3) |
| (home page) | 50 | Medium |
| eat-on-a-budget.html | 62 | Medium |
| cheap-flights-timing.html | 94 | Low |
| hostel-vs-guesthouse.html | 98 | Low |

Only how-to-pack-carry-on-only.html (164 words) is above the line.

Fix: expand each guide with the specific advice its title promises. For about.html, say who writes the site and what it covers. For the home page, add short intro text and links to each guide. Content writing belongs to the SEO role; this audit only flags the gap.

## 9. Missing schema

The crawl shows schemaTypes empty on 7 of the 8 live pages. Only how-to-pack-carry-on-only.html has a type (Article).

Fix, as JSON-LD in a `<script type="application/ld+json">` block on each page:

- Home page: WebSite, with name "Shoestring Atlas" and the site URL.
- about.html: AboutPage.
- cheap-flights-timing.html, hostel-vs-guesthouse.html, eat-on-a-budget.html, visa-free-basics.html: Article, using the page's title as headline and its description.
- packing-list-backpack.html: none until item 2 is settled.

The crawl has no publish dates or author names, so datePublished and author are n/a. Add them from the editor's records; do not guess them. Severity: medium on the guides, low on about.html.

## 10. Missing llms.txt

URL: llms.txt at the site root
Severity: medium
Crawl shows: llmsTxt.status 404.

Fix: publish the proposed file at outputs/2026-11-04-21-19/llms.txt as /rankrelay/llms.txt. It lists only pages the crawl returned with status 200, and leaves out packing-list-backpack.html (duplicate) and travel-insurance-basics.html (404). Update it if item 2 or item 1 is resolved differently.

## Checked and clean

- robots.txt returns 200. Its contents are not in the crawl, so I did not check its rules.
- sitemap.xml returns 200 with 6 URLs; all 6 return 200.
- Every live page has a title and exactly one H1, except eat-on-a-budget.html.
- Descriptions on about.html ("About Shoestring Atlas.") and visa-free-basics.html ("Visa basics.") are present but near-empty. They are not defects of the types requested; a rewrite would help.
