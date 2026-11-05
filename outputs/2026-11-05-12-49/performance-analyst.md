# Shoestring Atlas performance scoreboard

Source: outputs/2026-11-05-12-49/crawl.json, crawled 2026-11-05T12:49:37Z, site https://adwaith11366.github.io/rankrelay/. Every figure below is computed from that file.

## Scoreboard

The crawl found 9 URLs. One of them (travel-insurance-basics.html) returned 404, so 8 pages are live. Every share except "pages returning 200" uses the 8 live pages as its base, because the 404 page has no content to measure. This matches the "shares" object in crawl.json.

| Metric | Count | Percentage |
|---|---|---|
| Pages crawled | 9 | n/a |
| Pages returning 200 | 8 of 9 | 88.9% |
| Pages with a description | 7 of 8 | 87.5% |
| Pages with a single H1 | 7 of 8 | 87.5% |
| Pages with schema | 1 of 8 | 12.5% |
| Pages with a sitemap entry | 6 of 8 | 75.0% |
| Average word count | 80.25 words across 8 live pages (642 words total) | n/a |

Supporting checks from the same file: robots.txt returns 200, the sitemap returns 200 with 6 URLs, and llms.txt returns 404. Pages with H2 sections: 5 of 8 (62.5%).

## Readiness scores

These are the values in the "scores" object of crawl.json. I did not compute my own.

SEO readiness: 85. Formula from the file: average of pages returning 200, pages with a description, pages with one H1, pages in the sitemap. Check against the shares: (88.9 + 87.5 + 87.5 + 75.0) / 4 = 84.7, shown as 85.

AEO readiness: 41. Formula from the file: average of pages with schema, pages with a description, pages with H2 sections, llms.txt present. Check against the shares: (12.5 + 87.5 + 62.5 + 0) / 4 = 40.6, shown as 41.

## Top 3 bottlenecks

1. Almost no structured data and no llms.txt. Only how-to-pack-carry-on-only.html carries schema (Article). The other 7 live pages have none, and llms.txt returns 404, so it scores 0 in the AEO formula. These two items hold the AEO score down more than anything else: schema is 12.5% and llms.txt is 0%.

2. Thin pages. The average live page has 80 words. about.html has 10 words, visa-free-basics.html has 24, packing-list-backpack.html has 44, and eat-on-a-budget.html has 69. The longest page, how-to-pack-carry-on-only.html, has 164. The about page and visa page also have placeholder descriptions ("About Shoestring Atlas." and "Visa basics.") and no H2 sections.

3. Page-level faults that cost SEO points. Each is one fix:
   - eat-on-a-budget.html has 0 H1s and is missing from the sitemap.
   - hostel-vs-guesthouse.html has an empty description and 1 image missing alt text.
   - cheap-flights-timing.html links to travel-insurance-basics.html, which returns 404.
   - packing-list-backpack.html repeats the title and description of how-to-pack-carry-on-only.html, has 0 inbound links, and is not in the sitemap.

## Traffic and rankings

Traffic and ranking figures are n/a. The demo site has no analytics, and nothing in crawl.json records visits, impressions, clicks or search positions. No traffic or ranking number appears in this report, and none should be quoted from it.
