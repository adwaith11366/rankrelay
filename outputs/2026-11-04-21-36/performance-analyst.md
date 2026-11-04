# Shoestring Atlas: performance scoreboard

Source: outputs/2026-11-04-21-36/crawl.json, crawled 2026-11-04 at 21:36 UTC. Site: https://adwaith11366.github.io/rankrelay/

## Scoreboard

The crawl found 9 URLs. One of them (travel-insurance-basics.html) returns 404 and has no page data, so the quality checks use the 8 pages that returned 200 as the base.

| Metric | Count | Base | Percentage |
|---|---|---|---|
| Pages crawled | 9 | n/a | n/a |
| Pages returning 200 | 8 | 9 crawled | 88.9% |
| Pages with a description | 7 | 8 | 87.5% |
| Pages with a single H1 | 7 | 8 | 87.5% |
| Pages with schema | 1 | 8 | 12.5% |
| Pages with a sitemap entry | 6 | 8 | 75.0% |
| Average word count | 68.25 words | 8 | n/a |

Notes on the counts:

- The one page without a description is hostel-vs-guesthouse.html (empty string).
- The one page without a single H1 is eat-on-a-budget.html (0 H1 tags).
- The only page with schema is how-to-pack-carry-on-only.html (Article).
- The two 200 pages missing from the sitemap are eat-on-a-budget.html and packing-list-backpack.html. The sitemap lists 6 URLs, and all 6 are 200 pages.
- Word counts: 50, 10, 164, 94, 98, 62, 24 and 44, which total 546.

Site files: robots.txt returns 200, sitemap.xml returns 200, llms.txt returns 404.

## Readiness scores

Both scores are my own simple heuristics, not an industry standard. Each is the plain average of its inputs, each input scored 0 to 100.

Content depth score = min(average word count / 300, 1) x 100 = 68.25 / 300 x 100 = 22.75. The 300-word target is my assumption, not a figure from the crawl.

SEO readiness = average of: 200 rate (88.89), description (87.5), single H1 (87.5), sitemap (75.0), content depth (22.75).
(88.89 + 87.5 + 87.5 + 75.0 + 22.75) / 5 = 361.64 / 5 = 72.33

SEO readiness: 72 / 100.

AEO readiness = average of: schema (12.5), llms.txt present (0, it returns 404), pages with at least one H2 (4 of 8 = 50.0), content depth (22.75), description (87.5).
(12.5 + 0 + 50.0 + 22.75 + 87.5) / 5 = 172.75 / 5 = 34.55

AEO readiness: 35 / 100.

## Top 3 bottlenecks

1. Thin pages. The average page has 68 words, and the longest has 164. Four pages have 50 words or fewer: about.html at 10, visa-free-basics.html at 24, packing-list-backpack.html at 44 and the home page at 50. This pulls both scores down the most: content depth is 22.75 out of 100.

2. Almost no structured data or answer structure. Schema is on 1 of 8 pages, llms.txt is missing, and 4 of 8 pages have no H2 headings. Search engines and answer engines have little to quote from.

3. Index hygiene. A 404 is linked from cheap-flights-timing.html (travel-insurance-basics.html). packing-list-backpack.html repeats the title and description of how-to-pack-carry-on-only.html, has 0 inbound links and is not in the sitemap. eat-on-a-budget.html has no H1 and is not in the sitemap. hostel-vs-guesthouse.html has no description and 1 image missing alt text.

## Traffic and rankings

Traffic, impressions, clicks and ranking figures are n/a. The demo site has no analytics and no search console data, so there is nothing to read. Every number above comes from the crawl alone.
