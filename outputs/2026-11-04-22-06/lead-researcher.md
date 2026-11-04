# Question map for Shoestring Atlas

Source: outputs/2026-11-04-22-06/crawl.json, crawled 2026-11-04T22:06:28.888Z. The crawl found 9 URLs: 7 return 200 and are real pages, 1 returns 404, and 1 is a duplicate of another page.

I did not run WebSearch. The question wording below is my own phrasing of what budget travellers ask, not checked against live queries, so no URLs are cited. Search volume and competitor strength are n/a for every row. Priority reflects the crawl evidence and my judgment of how central each topic is to a budget travel blog.

## The 10 questions

| # | Question | Intent | Existing page or gap | Priority |
|---|---|---|---|---|
| 1 | Do I need travel insurance on a budget trip? | Informational, pre-purchase decision | Gap. The page travel-insurance-basics.html returns 404 and is linked from cheap-flights-timing.html | High |
| 2 | How much does a day of budget travel cost? | Informational, planning | Gap. The home page has an H2 "Where forty dollars a day can go" but no page behind it | High |
| 3 | When is the best time to book cheap flights? | Informational, planning | cheap-flights-timing.html (94 words, no schema, 1 inbound link) | High |
| 4 | Do I need a visa for my trip? | Informational, planning | visa-free-basics.html (24 words, description is "Visa basics.", no H2s) | High |
| 5 | How do I pack for two weeks in one carry-on bag? | Informational, how-to | how-to-pack-carry-on-only.html (164 words, has Article schema). packing-list-backpack.html repeats its title and description and has no inbound links | Medium |
| 6 | Is a hostel or a guesthouse cheaper for a solo traveller? | Commercial investigation | hostel-vs-guesthouse.html (98 words, empty description, 1 image missing alt text) | Medium |
| 7 | How can I eat well on ten dollars a day while travelling? | Informational, how-to | eat-on-a-budget.html (69 words, no H1, not in the sitemap) | Medium |
| 8 | Where can I travel on a small budget? | Informational, inspiration | Gap. The home page has an H2 "Where a small budget can take you" but no destination pages | Medium |
| 9 | How do I do laundry while travelling? | Informational, how-to | Covered only as one H2 inside how-to-pack-carry-on-only.html. No standalone page | Low |
| 10 | How do I get around cheaply once I arrive? | Informational, planning | Gap. No page or heading in the crawl mentions local transport | Low |

## Coverage reading

Four of the 10 questions have no page: rows 1, 2, 8 and 10. Row 9 has only a section inside another page. The five questions that do have pages (rows 3 to 7) are all thin: the longest page in the crawl is 164 words, and the site's schema share is 12.5% (one page of eight crawled with a 200 status).

Existing pages also need repair before they can answer anything well. Rows 4 and 6 have weak or empty descriptions, row 7 has no H1 and is missing from the sitemap, and row 5 has a duplicate page. Those fixes belong to the technical audit, so I list them here as context only.

## Best article to write next

Write "Do you need travel insurance on a budget trip?" at travel-insurance-basics.html.

Reason 1: the URL already exists as a link. cheap-flights-timing.html points to it and gets a 404, so the site is sending readers to a page that isn't there today. Publishing at that exact URL repairs the broken link and fills a topic gap in one step.

Reason 2: it is a decision a budget traveller has to make before buying a ticket, which fits the site's flights and accommodation content.

Reason 3: no other page in the crawl touches the topic, so it won't compete with anything the site already has.

Limits on this call: I have no search volume and haven't checked who ranks for the query. The role charter says to read the live result set before drafting, so the drafting step should check that the field is beatable. If large publishers dominate it, row 2 (the daily cost guide) is the next candidate.
