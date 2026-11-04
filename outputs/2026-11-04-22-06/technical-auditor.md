# Technical audit: Shoestring Atlas

Source for every figure: outputs/2026-11-04-22-06/crawl.json, crawled 2026-11-04T22:06:28.888Z, site https://adwaith11366.github.io/rankrelay/.

The crawl holds 9 URLs: 8 returned 200 and 1 returned 404. robots.txt returned 200. The sitemap returned 200 and lists 6 URLs. The crawl scores are SEO 85 and AEO 41. Nothing was fetched outside the crawl, so every finding below comes from that one file. Every fix is a proposal for a human to apply; nothing was changed on the site.

Base URL below is https://adwaith11366.github.io/rankrelay/ and is shortened to "base".

## Summary of defects

| Defect | Pages affected (crawl.json) |
|---|---|
| Non-200 status | 1 of 9 |
| Missing description | 1 of 8 live pages |
| Missing H1 | 1 of 8 live pages |
| Images missing alt text | 1 image, on 1 page |
| Duplicate title | 2 pages share one title |
| Thin pages (under 100 words, my threshold) | 6 of 8 live pages |
| Live pages absent from the sitemap | 2 of 8 |
| Orphan pages | 1 |
| No schema | 7 of 8 live pages |
| llms.txt | missing (404) |

## Non-200 pages

base/travel-insurance-basics.html
Severity: high. Status 404. One page links to it: base/cheap-flights-timing.html, so visitors and crawlers hit a dead end from a live guide.
Fix: either publish a travel insurance page at that path, or remove the link from cheap-flights-timing.html. If the page is planned, write it first and keep the link out until it exists. Keep this URL out of the sitemap either way.

## Missing meta descriptions

base/hostel-vs-guesthouse.html
Severity: medium. The description field is an empty string.
Fix: add a meta description in the head, about 150 characters, for example: "Compare hostels and guesthouses on price for solo travellers, and see when each one is the cheaper bed." Check the wording against the page before publishing.

## Missing H1

base/eat-on-a-budget.html
Severity: high. h1Count is 0. The page has two H2s ("Shop at markets", "Use the hostel kitchen") but no top-level heading.
Fix: add one H1 that matches the title, "Eat well on ten dollars a day", above the first H2. Make sure it is the only H1.

## Images missing alt text

base/hostel-vs-guesthouse.html
Severity: medium. imagesMissingAlt is 1. The crawl does not say which image.
Fix: find the img tag with no alt attribute and add a short description of what the picture shows. If the image is purely decorative, use alt="".

## Duplicate titles

"How to pack for two weeks in one carry-on bag" is the title of both:
- base/how-to-pack-carry-on-only.html (164 words, Article schema, 1 inbound link, in sitemap)
- base/packing-list-backpack.html (44 words, no schema, 0 inbound links, not in sitemap)

The two pages also share the same description.
Severity: high. The second page is a thinner copy of the first and competes with it for the same query.
Fix: keep how-to-pack-carry-on-only.html as the single page. On packing-list-backpack.html either delete the file, or add a canonical link in the head pointing to base/how-to-pack-carry-on-only.html. If the backpack angle deserves its own page, give it its own title, description, H1 and at least 300 words.

## Thin pages

The crawl gives word counts but sets no threshold. I used under 100 words as the line; that number is my choice, not a crawl value.

- base/about.html: 10 words. Severity: medium. Fix: add who runs the site, what it covers and how to get in touch, only with facts the owner supplies.
- base/visa-free-basics.html: 24 words. Severity: medium. Title is "Visa basics" and description is "Visa basics." Fix: expand into a real guide with H2 sections, and write a title and description that say what the page answers.
- base/packing-list-backpack.html: 44 words. Severity: high, because it is also a duplicate. See the duplicate titles fix.
- base/eat-on-a-budget.html: 69 words. Severity: medium. Fix: expand each H2 section with concrete prices, examples and tips.
- base/cheap-flights-timing.html: 94 words. Severity: low. Fix: add detail under "Search a whole month" and "Count the real price".
- base/hostel-vs-guesthouse.html: 98 words. Severity: low. Fix: add worked examples of cost under each H2.

The home page (139 words) and base/how-to-pack-carry-on-only.html (164 words) are above the line.

## Pages absent from the sitemap

The sitemap lists 6 URLs. Two live pages are not in it.

- base/eat-on-a-budget.html: severity medium. It is a real page returning 200. Fix: add it to sitemap.xml.
- base/packing-list-backpack.html: severity low. Fix: do not add it. Resolve the duplicate first, then add only the surviving URL.

base/travel-insurance-basics.html is also absent, and should stay absent while it returns 404.

## Orphan pages

base/packing-list-backpack.html has inboundLinks 0. Severity: medium.
Fix: if the page is kept, link to it from a relevant guide or the home page. If it is deleted or canonicalised as proposed above, no link is needed.

## Missing schema

Only base/how-to-pack-carry-on-only.html has schema (Article). The other 7 live pages have none. Severity: high for AEO.

- base/ (home): add WebSite and Organization JSON-LD with the site name and URL.
- base/about.html: add an AboutPage block, and Organization if the owner confirms the details.
- base/cheap-flights-timing.html, base/hostel-vs-guesthouse.html, base/eat-on-a-budget.html, base/visa-free-basics.html: add Article JSON-LD with headline, description, datePublished and author. The crawl has no dates or author, so the owner must supply them. Do not guess.
- base/packing-list-backpack.html: no schema needed if the page is removed or canonicalised.

## Missing llms.txt

The crawl shows llmsTxt status 404. Severity: medium.
Fix: publish the draft in outputs/2026-11-04-22-06/llms.txt at base/llms.txt. It lists only pages that returned 200 in the crawl and leaves out the 404 page and the duplicate packing page. A human needs to approve it and add it to the site.

## Also shown by the crawl: no H2 sections

Three live pages have an empty H2 list: base/about.html, base/visa-free-basics.html and base/packing-list-backpack.html. This lowers the AEO score (h2 share 62.5). Fix: add H2 sections when each page is expanded. For the duplicate packing page, skip this if it is removed.

## Fix order

1. Fix the 404 link in cheap-flights-timing.html.
2. Add the H1 to eat-on-a-budget.html and add that page to the sitemap.
3. Resolve the duplicate packing pages.
4. Add the description and alt text to hostel-vs-guesthouse.html.
5. Add schema to the 7 pages and publish llms.txt.
6. Expand the thin pages.

## Not checked

The crawl has no data on page speed, canonical tags already in place, redirects, mobile rendering or structured data errors. None of those are claimed here.
