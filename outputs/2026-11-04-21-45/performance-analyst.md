# Shoestring Atlas performance report

Source: outputs/2026-11-04-21-45/crawl.json, crawled 2026-11-04T21:45:38Z, site https://adwaith11366.github.io/rankrelay/

## Scoreboard

The crawl found 9 URLs. One of them (travel-insurance-basics.html) returned 404, so it has no title, description or word count. The page-level shares below use the 8 pages that returned 200 as the base, which matches the shares stored in crawl.json.

| Measure | Count | Percentage |
|---|---|---|
| Pages crawled | 9 | n/a |
| Pages returning 200 | 8 of 9 | 88.9% |
| Pages with a description | 7 of 8 | 87.5% |
| Pages with a single H1 | 7 of 8 | 87.5% |
| Pages with schema | 1 of 8 | 12.5% |
| Pages with a sitemap entry | 6 of 8 | 75.0% |
| Average word count | 73.0 words (584 words over 8 pages) | n/a |

Site files: robots.txt returned 200. The sitemap returned 200 and lists 6 URLs. llms.txt returned 404.

## Readiness scores

These come from the "scores" object in crawl.json. I did not compute my own.

SEO readiness: 85. Formula from the file: average of pages returning 200, pages with a description, pages with one H1, pages in the sitemap. The stored shares are 88.9, 87.5, 87.5 and 75.

AEO readiness: 41. Formula from the file: average of pages with schema, pages with a description, pages with H2 sections, llms.txt present. The stored shares are 12.5, 87.5, 62.5 and 0.

## Top 3 bottlenecks

1. Almost no structured data, and no llms.txt. Only how-to-pack-carry-on-only.html has schema (Article); the other 7 live pages have none, and llms.txt returns 404. These two items are the 12.5 and the 0 that hold AEO at 41.

2. Broken, orphaned and unlisted URLs. travel-insurance-basics.html returns 404 and is linked from cheap-flights-timing.html. eat-on-a-budget.html is missing from the sitemap and has no H1. packing-list-backpack.html is missing from the sitemap, has 0 inbound links, and repeats the title and description of how-to-pack-carry-on-only.html. Two live pages out of eight are outside the sitemap, which is why that share is 75%.

3. Thin and incomplete pages. Average length is 73 words. about.html has 10 words, visa-free-basics.html has 24 and packing-list-backpack.html has 44. hostel-vs-guesthouse.html has an empty description and 1 image missing alt text. The pages about.html, visa-free-basics.html and packing-list-backpack.html have no H2 sections, so 3 of 8 pages lack them.

## Traffic and rankings

Traffic figures: n/a. Ranking figures: n/a. The demo site has no analytics and no search console connection, and no file read this run holds either. Nothing in this report is a traffic or ranking measurement; every figure is a crawl count.
