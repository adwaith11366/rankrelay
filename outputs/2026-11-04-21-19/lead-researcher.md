# Shoestring Atlas: questions budget travellers ask

Source for coverage: outputs/2026-11-04-21-19/crawl.json (crawled 2026-11-04, 8 URLs, 6 in the sitemap). Page paths below are relative to https://adwaith11366.github.io/rankrelay/. Word counts are the crawl's figures.

## Question table

| # | Question | Intent | Existing page or "gap" | Priority |
|---|---|---|---|---|
| 1 | How much money do I need per day for a budget trip? | Informational, planning | gap | high |
| 2 | Is travel insurance worth it on a budget trip? | Informational, decision | gap (travel-insurance-basics.html returns 404 and has 1 inbound link) | high |
| 3 | Do I need a visa for my trip, and how do I check? | Informational, planning | visa-free-basics.html (24 words, title "Visa basics", no headings) | high |
| 4 | When is the cheapest time to book a flight? | Informational, decision | cheap-flights-timing.html (94 words, 2 H2s, no schema) | medium |
| 5 | Is a hostel or a guesthouse cheaper for a solo traveller? | Commercial investigation | hostel-vs-guesthouse.html (98 words, empty meta description, 1 image missing alt) | medium |
| 6 | How can I eat well on ten dollars a day? | Informational, how-to | eat-on-a-budget.html (62 words, no H1, not in the sitemap) | medium |
| 7 | Which destinations are cheapest for a first big trip? | Commercial investigation | gap | medium |
| 8 | How do I avoid ATM and card fees abroad? | Informational, how-to | gap | medium |
| 9 | What should I pack for two weeks in one carry-on bag? | Informational, how-to | how-to-pack-carry-on-only.html (164 words, Article schema, covers laundry). packing-list-backpack.html repeats its title and description, has 0 inbound links and is not in the sitemap | low |
| 10 | How do I get from the airport to the city cheaply? | Informational, how-to | gap | low |

## What the crawl shows

Four of the ten questions have no working page. Five have a page, but none is longer than 164 words, so each is thin next to a full answer.

Three technical faults touch these questions. travel-insurance-basics.html is a broken link on the site. packing-list-backpack.html duplicates the carry-on page and is an orphan. eat-on-a-budget.html is missing from the sitemap and has no H1.

The site has no llms.txt (status 404). The home page has 50 words and no H2s.

## How I checked phrasing

I ran one WebSearch on daily budgets, travel insurance and flight timing. It returned travel blogs and insurance sites that frame the questions in the same way as rows 1, 2 and 4. I did not open any of those pages and I take no figures from them, so there is no search volume or difficulty number here (n/a). Pages the search returned, used for phrasing only:

- https://www.nomadicmatt.com/travel-blogs/best-backpacker-travel-insurance/
- https://gobackpacking.com/travel-budget-tips/
- https://freenance.io/travel/travel-budget-planning-guide/

Priorities rest on gaps in the crawl and on how basic the question is. They are not measured demand. Rows 7 to 10 come from my own judgment of what budget travellers ask, and I did not search for them.

## Best article to write next

Write "How much does budget travel cost per day?" (row 1).

It is a gap, and it is the question most trips start with. The existing pages on flights, hostels and food each have one inbound link and under 100 words. A daily-cost article can link to all three and give each a second inbound link. It can also link to the insurance page once that is rebuilt.

One risk: I haven't pulled the live result set, so I don't know whether large publishers dominate this query. Before drafting, pull that day's results. If they do, narrow the angle to a single region or a stated daily figure the site can source itself. If the field is too hard to beat, write row 2 (insurance) instead. It also fixes a 404.
