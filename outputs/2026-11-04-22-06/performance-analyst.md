# Shoestring Atlas: performance scoreboard

Source: outputs/2026-11-04-22-06/crawl.json, crawled 2026-11-04T22:06:28Z, site https://adwaith11366.github.io/rankrelay/. Every figure below comes from that file.

## Scoreboard

The crawl found 9 URLs. One of them (travel-insurance-basics.html) returned 404, so the other measures use the 8 live pages as the denominator. This is the same denominator the crawl uses for its own shares.

| Measure | Count | Percentage |
|---|---|---|
| Pages crawled | 9 | n/a |
| Pages returning 200 | 8 of 9 | 88.9% |
| Pages with a description | 7 of 8 | 87.5% |
| Pages with a single H1 | 7 of 8 | 87.5% |
| Pages with schema | 1 of 8 | 12.5% |
| Pages with a sitemap entry | 6 of 8 | 75.0% |
| Average word count | 80.3 words (642 words over 8 live pages) | n/a |

The 404 page has no word count in the crawl, so it is left out of the average.

Site-level files: robots.txt returned 200, sitemap.xml returned 200 with 6 URLs, and llms.txt returned 404.

## Readiness scores

These are copied from the "scores" object in crawl.json, with the formulas as written there.

SEO readiness: 85. Formula: average of pages returning 200, pages with a description, pages with one H1, pages in the sitemap. Inputs: 88.9, 87.5, 87.5 and 75.0.

AEO readiness: 41. Formula: average of pages with schema, pages with a description, pages with H2 sections, llms.txt present. Inputs: 12.5, 87.5, 62.5 and 0.

For reference, 5 of 8 live pages have H2 sections (62.5%).

## Top 3 bottlenecks

1. Almost no structured data and no llms.txt. Only how-to-pack-carry-on-only.html carries schema (Article), which is 12.5% of live pages. llms.txt returns 404, so that input is 0. These two inputs are why AEO sits at 41 while SEO sits at 85.

2. Indexing gaps and a broken link. Two live pages are missing from the sitemap: eat-on-a-budget.html and packing-list-backpack.html. The page travel-insurance-basics.html returns 404 and is linked from cheap-flights-timing.html. Also, packing-list-backpack.html has the same title and description as how-to-pack-carry-on-only.html, has 0 inbound links and 44 words.

3. Thin and incomplete pages. The average live page has 80.3 words. about.html has 10 words and visa-free-basics.html has 24, and both have a one-line description and no H2 sections. hostel-vs-guesthouse.html has an empty description and 1 image missing alt text. eat-on-a-budget.html has 0 H1 tags.

## Traffic and rankings

Traffic and ranking figures are n/a. The demo site has no analytics and no search console data, so there are no visits, impressions, clicks or positions to report.
