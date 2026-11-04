# Shoestring Atlas: performance scoreboard

Source: outputs/2026-11-04-21-19/crawl.json, crawled 2026-11-04 (site: https://adwaith11366.github.io/rankrelay/). Every figure below is computed from that file.

## Scoreboard

Nine URLs were crawled. One (travel-insurance-basics.html) returned 404, so the quality checks use the 8 pages that returned 200 as the base. Percentages are rounded to one decimal.

| Metric | Count | Percentage |
|---|---|---|
| Pages crawled | 9 | n/a |
| Pages returning 200 | 8 of 9 | 88.9% |
| Pages with a description | 7 of 8 | 87.5% |
| Pages with a single H1 | 7 of 8 | 87.5% |
| Pages with schema | 1 of 8 | 12.5% |
| Pages with a sitemap entry | 6 of 8 | 75.0% |
| Average word count (200 pages) | 68.25 words (546 words across 8 pages) | n/a |

Notes on the counts:

- Description missing: hostel-vs-guesthouse.html (empty string).
- H1 not single: eat-on-a-budget.html has 0 H1s.
- Schema: only how-to-pack-carry-on-only.html has a type (Article).
- Sitemap: the crawl lists 6 sitemap URLs, and 6 crawled pages are flagged as in it. The two 200 pages outside it are eat-on-a-budget.html and packing-list-backpack.html.
- Other site files: robots.txt returned 200; sitemap.xml returned 200; llms.txt returned 404.

## Readiness scores

The weights are my own choice, since the crawl has no scoring standard. Each input is a percentage from the table above (equal weight, so the score is the plain average).

SEO readiness = average of (share of pages returning 200, share with a description, share with a single H1, share with a sitemap entry)

SEO = (88.9 + 87.5 + 87.5 + 75.0) / 4 = 338.9 / 4 = 84.7, which rounds to **85 out of 100**.

AEO readiness = average of (share with schema, share with a description, share with at least one H2, llms.txt present scored 100 or 0)

The H2 share is 4 of 8 pages (50.0%): how-to-pack, cheap-flights, hostel-vs-guesthouse and eat-on-a-budget have H2s. llms.txt returned 404, so it scores 0.

AEO = (12.5 + 87.5 + 50.0 + 0) / 4 = 150.0 / 4 = 37.5, which rounds to **38 out of 100**.

## Top 3 bottlenecks

1. Thin pages. The average is 68.25 words and the longest page (how-to-pack-carry-on-only.html) has 164. Seven of the 8 pages are under 100 words, and about.html has 10. Pages this short give search engines and answer engines little to quote.

2. Almost no structured data. Schema is on 1 of 8 pages (12.5%) and llms.txt is a 404. This holds the AEO score at 38 more than any other input.

3. Indexing and duplication faults. A page links to a 404 (travel-insurance-basics.html). eat-on-a-budget.html has no H1 and no sitemap entry. packing-list-backpack.html repeats the title and description of how-to-pack-carry-on-only.html, has 0 inbound links and no sitemap entry. hostel-vs-guesthouse.html has no description and 1 image missing alt text.

## Traffic and rankings

Traffic, impressions, clicks and ranking figures are n/a. The demo site has no analytics and no search console data, so there is nothing to read them from. The scores above measure on-page readiness only; they do not predict traffic or rank.
