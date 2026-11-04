# Shoestring Atlas: questions budget travellers ask

Source for site coverage: outputs/2026-11-04-21-36/crawl.json (crawled 2026-11-04, 9 URLs, 8 live pages and one 404). Question phrasing was checked with one web search on 2026-11-04; the sources are listed at the end. No search volume or ranking data was available, so priority reflects intent, coverage and fit with the site, not traffic.

## The 10 questions

| # | Question | Intent | Existing page or gap | Priority |
|---|---|---|---|---|
| 1 | Is travel insurance worth it on a budget trip? | Informational, leaning to buying | Gap. cheap-flights-timing.html links to travel-insurance-basics.html, which returns 404 | High |
| 2 | How much money do I need per day to backpack? | Informational, planning | Gap | High |
| 3 | When is the cheapest time to book a flight? | Informational, leaning to buying | cheap-flights-timing.html (94 words; thin) | High |
| 4 | How do I pack for two weeks in a carry-on only? | Informational, how-to | how-to-pack-carry-on-only.html (164 words; the only page with Article schema). packing-list-backpack.html repeats its title and description, is not in the sitemap and has 0 inbound links | Medium |
| 5 | Is a hostel or a guesthouse cheaper for a solo traveller? | Comparison | hostel-vs-guesthouse.html (98 words; no meta description; 1 image missing alt text) | Medium |
| 6 | How can I eat well on ten dollars a day? | Informational, how-to | eat-on-a-budget.html (62 words; no H1; not in the sitemap) | Medium |
| 7 | Do I need a visa for a short trip? | Informational, planning | visa-free-basics.html (24 words; title and description are placeholders) | Medium |
| 8 | What are the cheapest countries to visit? | Informational, planning | Gap | Medium |
| 9 | How do I get from the airport to the city cheaply? | Informational, how-to | Gap | Low |
| 10 | How do I avoid ATM and currency exchange fees abroad? | Informational, how-to | Gap | Low |

## What the crawl shows about coverage

The site has 5 topic pages and 1 broken internal link. Four of the five topic pages have under 170 words, so the answers exist only as outlines. The home page is 50 words and has no H2s.

Questions 3 to 7 have a page but not an answer a searcher would stay for. Those are refresh jobs. Questions 1, 2, 8, 9 and 10 have nothing.

Technical items that affect these pages (all from crawl.json):

- travel-insurance-basics.html is a 404 with 1 inbound link.
- eat-on-a-budget.html and packing-list-backpack.html are live but missing from the sitemap, which lists 6 URLs.
- llms.txt returns 404.
- Only 1 of 8 live pages has schema.

## Best article to write next

Write "Is travel insurance worth it on a budget trip?" and publish it at the existing broken address, travel-insurance-basics.html.

The reasons:

1. The site already links to that URL from the cheap flights page, so a visitor can hit a dead end today. Publishing there fixes the 404 and gives the new page an inbound link from day one.
2. The question sits next to the flight booking page. A traveller who has just paid for a fare is the reader most likely to ask it.
3. It is a clear yes-or-no question with a short answer, which suits both search results and AI answer engines.
4. The search I ran found the question answered consistently: sources said skipping cover is a risky place to save money.

Limit of this recommendation: I did not pull the live result set for this query, so I don't know how strong the pages that rank are. The first step of drafting should be to read the top results and check the site can beat them. If large insurers and publishers dominate, switch to question 2 (daily budget), which is the next gap.

## Sources used

Phrasing check only; no figures from these pages were used.

- https://www.income.com.sg/blog/what-to-look-for-budget-travel
- https://www.traveldojo.com/travel-advice/budgeting
- https://www.laidbacktrip.com/posts/travel-on-50-dollars-a-day
- https://www.hostelz.com/backpacker-budget

These came from search result listings for one query. I did not open the pages.
