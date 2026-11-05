# Technical audit: Shoestring Atlas

Source: outputs/2026-11-05-12-49/crawl.json, crawled 2026-11-05T12:49:37.499Z, site https://adwaith11366.github.io/rankrelay/. All fixes below are drafts for human approval. Nothing was edited on the site.

The crawl covers 9 URLs: 8 return 200 and 1 returns 404. robots.txt returns 200 and the sitemap returns 200 with 6 URLs. Crawl scores: SEO 85, AEO 41.

## Summary of defects

| # | Defect | Severity | URLs affected |
|---|---|---|---|
| 1 | Linked page returns 404 | High | 1 |
| 2 | Missing H1 | High | 1 |
| 3 | Duplicate title and description | High | 2 |
| 4 | Orphan page | Medium | 1 |
| 5 | Live page absent from sitemap | Medium | 1 (plus 2 that should stay out) |
| 6 | Missing meta description | Medium | 1 |
| 7 | Image missing alt text | Medium | 1 |
| 8 | Thin pages | Medium | 6 |
| 9 | Missing schema | Medium | 7 |
| 10 | No llms.txt | Medium | site-wide |

## 1. Linked page returns 404 (high)

URL: https://adwaith11366.github.io/rankrelay/travel-insurance-basics.html

Status is 404. The crawl shows one inbound link, from https://adwaith11366.github.io/rankrelay/cheap-flights-timing.html. Visitors and crawlers who follow that link reach a dead end.

Fix: in cheap-flights-timing.html, either remove the link to travel-insurance-basics.html or point it at a live page. If the insurance guide is wanted, publish travel-insurance-basics.html as a new page (a content decision for the client) and then add it to the sitemap. Do not add the 404 URL to the sitemap as it stands.

## 2. Missing H1 (high)

URL: https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html

h1Count is 0. The page has two H2s ("Shop at markets", "Use the hostel kitchen") and no top-level heading.

Fix: add one `<h1>` above the first H2. Suggested text, matching the existing title: "Eat well on ten dollars a day".

## 3. Duplicate title and description (high)

URLs:
- https://adwaith11366.github.io/rankrelay/how-to-pack-carry-on-only.html (word count 164, has Article schema, 1 inbound link)
- https://adwaith11366.github.io/rankrelay/packing-list-backpack.html (word count 44, no schema, 0 inbound links)

Both carry the title "How to pack for two weeks in one carry-on bag" and the same description, "A two-week packing list that fits one carry-on bag, with what to leave at home and how to do laundry on the road." The two pages compete for the same query, and the weaker one is a thin orphan (see items 4 and 8).

Fix: the fuller page is how-to-pack-carry-on-only.html, so keep it. For packing-list-backpack.html, choose one: delete the file; or replace its body with a meta refresh to how-to-pack-carry-on-only.html (GitHub Pages cannot send a 301); or give it a distinct title, description, H1 and at least 300 words if the client wants a separate backpack angle. Deleting or redirecting is the cheaper fix.

## 4. Orphan page (medium)

URL: https://adwaith11366.github.io/rankrelay/packing-list-backpack.html

inboundLinks is 0. No other crawled page links to it.

Fix: resolve it together with item 3. If the page is deleted or redirected, no link is needed. If it is kept, link to it from how-to-pack-carry-on-only.html and the homepage.

## 5. Live page absent from sitemap (medium)

URL: https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html

Returns 200, inSitemap is false. The sitemap lists 6 URLs; this page would make 7.

Fix: add `<url><loc>https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html</loc></url>` to sitemap.xml.

Two other URLs are also not in the sitemap and should stay out for now: travel-insurance-basics.html (404, item 1) and packing-list-backpack.html (duplicate, item 3). Revisit them only if the fixes above keep them live.

## 6. Missing meta description (medium)

URL: https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html

The description field is empty.

Fix: add `<meta name="description" content="...">` in the head. Draft text from the page's own H2s: "When a hostel is cheaper for a solo traveller, and when a guesthouse wins." Edit for tone before use.

## 7. Image missing alt text (medium)

URL: https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html

imagesMissingAlt is 1. The crawl does not say which image.

Fix: open hostel-vs-guesthouse.html, find the `<img>` with no alt attribute, and add a short alt describing what the photo shows. If the image is purely decorative, use `alt=""`.

## 8. Thin pages (medium)

The crawl sets no threshold. I used under 100 words as the line; that is my choice, not a crawl value. Word counts come from wordCount in crawl.json.

| URL | Words | Notes |
|---|---|---|
| visa-free-basics.html | 24 | Title "Visa basics", description "Visa basics." (repeats the title), no H2s |
| about.html | 10 | Title "About", description "About Shoestring Atlas.", no H2s |
| packing-list-backpack.html | 44 | Duplicate, see item 3 |
| eat-on-a-budget.html | 69 | Also missing H1 |
| cheap-flights-timing.html | 94 | Close to the line |
| hostel-vs-guesthouse.html | 98 | Close to the line |

All URLs are under https://adwaith11366.github.io/rankrelay/.

Fix: expand visa-free-basics.html and about.html first, as they are the thinnest. For each, write enough original content to answer the page's question, add at least two H2 sections, and replace the one-or-two-word title and description with specific ones. The client supplies the facts; I can't draft visa rules from the crawl. The other four need more body copy, which is an editorial task for the SEO writer.

## 9. Missing schema (medium)

Only how-to-pack-carry-on-only.html has schema (Article). Seven of the eight live pages have an empty schemaTypes list.

Fix, one JSON-LD block per page in the head:

- / : WebSite, with name "Shoestring Atlas" and the site URL.
- about.html : AboutPage.
- cheap-flights-timing.html, hostel-vs-guesthouse.html, eat-on-a-budget.html, visa-free-basics.html : Article, with headline, description and URL taken from each page's existing title and description. Add author and datePublished only once the client confirms them; the crawl has neither.
- packing-list-backpack.html : none needed if deleted or redirected (item 3); otherwise Article.

## 10. No llms.txt (medium)

https://adwaith11366.github.io/rankrelay/llms.txt returns 404.

Fix: publish the proposed file at outputs/2026-11-05-12-49/llms.txt as /llms.txt at the site root. It lists 7 pages. It leaves out travel-insurance-basics.html (404) and packing-list-backpack.html (duplicate). Add them back if their status changes.

## Not found

robots.txt and the sitemap both return 200. No page other than packing-list-backpack.html has 0 inbound links. Every live page has at least one H1 except eat-on-a-budget.html. The crawl contains no data on canonical tags, page speed, mobile rendering or structured-data validity, so none of those are assessed.
