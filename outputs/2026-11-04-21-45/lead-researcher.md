# Shoestring Atlas: question map for budget travellers

Source for all site facts: outputs/2026-11-04-21-45/crawl.json (crawled 2026-11-04T21:45:38Z, 9 URLs, 6 in the sitemap). Page lengths are the crawl's word counts. Search-demand figures: n/a, since no keyword tool was used this run.

## Questions

| # | Question | Intent | Existing page or gap | Priority |
|---|---|---|---|---|
| 1 | Is travel insurance worth it on a budget trip? | Decision | Gap. cheap-flights-timing.html links to travel-insurance-basics.html, which returns 404 | high |
| 2 | How much money do I need per day to travel on a budget? | Planning | Gap. The home page has a "Where forty dollars a day can go" section (81 words on the whole page) but no dedicated guide | high |
| 3 | When should I book flights to get the lowest fare? | How-to | cheap-flights-timing.html (94 words, no schema) | high |
| 4 | How do I pack for two weeks in one carry-on bag? | How-to | how-to-pack-carry-on-only.html (164 words, has Article schema). packing-list-backpack.html repeats its title and description, has 44 words, 0 inbound links and is not in the sitemap | medium |
| 5 | Is a hostel or a guesthouse cheaper for a solo traveller? | Comparison | hostel-vs-guesthouse.html (98 words, empty meta description, 1 image missing alt text) | medium |
| 6 | Where is the cheapest place to travel right now? | Discovery | Gap | medium |
| 7 | How can I eat well on ten dollars a day abroad? | How-to | eat-on-a-budget.html (69 words, no H1, not in the sitemap) | medium |
| 8 | Do I need a visa, and which countries are visa free? | Planning | visa-free-basics.html (24 words, no sections, description is "Visa basics.") | medium |
| 9 | How do I avoid baggage fees on budget airlines? | How-to | Gap. The carry-on page touches packing light but does not cover airline fee rules | low |
| 10 | How do I do laundry while travelling? | How-to | Partial. One H2 inside the carry-on page | low |

## How the questions were chosen

Questions 3, 4, 5, 7 and 8 come straight from pages the crawl found. Questions 1, 2, 6, 9 and 10 are gaps or partial coverage. Question 1 is the one the site already promises: a live page links to an address that does not exist.

I checked phrasing with two searches. The first showed that general budget travel guides cover cheapest destinations, flexible dates, budget airlines with baggage fees, hostels, and setting a daily budget ([AAA](https://discounts.aaa.com/discounts-articles/how-to-travel-cheap), [Worldpackers](https://www.worldpackers.com/articles/how-to-travel-for-cheap)). The second showed that "is travel insurance worth it" is a question many travel and finance sites answer directly, including for budget travellers ([Nomadic Matt](https://www.nomadicmatt.com/travel-blogs/is-travel-insurance-worth-it/), [Visitors Coverage](https://www.visitorscoverage.com/blog/is-trip-insurance-worth-it-for-budget-travelers/)). Questions 2, 6 and 9 rest on the first search's general summary, not on a page I read in full.

## Problems the crawl found that affect these answers

- Schema is on 1 of 8 live pages (12.5%), and llms.txt returns 404, so the AEO score is 41.
- eat-on-a-budget.html has no H1 and is missing from the sitemap.
- hostel-vs-guesthouse.html has no meta description.
- Most existing answers are under 170 words. Pages that short are unlikely to be the fullest answer to any of the questions above, though I did not read competing pages to confirm.

## Best article to write next

Write "Is travel insurance worth it on a budget trip?" at the address travel-insurance-basics.html.

Why: the site already links to that address from cheap-flights-timing.html, so the article gets an inbound link on day one and fixes the one 404 in the crawl. The question is asked directly by established travel sites, which the second search showed. A budget angle is open: a worked example of premium against nonrefundable trip cost, a check of what a credit card covers, and a clear list of when to skip cover.

Risk: the search results include large publishers and insurers, and I did not read their pages to judge whether the field is beatable. Check the live results and read three to six ranking pages before drafting. If the field is too crowded, the fallback is question 2 (daily budget), which ties to the home page's existing "forty dollars a day" section.

Draft only. Nothing here has been published or sent.
