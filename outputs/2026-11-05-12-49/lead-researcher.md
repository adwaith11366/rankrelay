# Shoestring Atlas: questions to answer

Source: outputs/2026-11-05-12-49/crawl.json, crawled 2026-11-05T12:49:37Z. It covers 9 URLs: 7 return 200 and are real pages, 1 is a duplicate (packing-list-backpack.html) and 1 is a 404 (travel-insurance-basics.html).

I did not run WebSearch this run. The questions below are phrased from the site's own titles and headings, so no outside URLs are cited and no search volume is given (n/a for every question).

## The 10 questions

| # | Question | Intent | Existing page or "gap" | Priority |
|---|---|---|---|---|
| 1 | Do I need travel insurance for a budget trip, and what does it cover? | Informational, pre-purchase | gap. cheap-flights-timing.html links to travel-insurance-basics.html, which returns 404 | high |
| 2 | How much does a day of travel cost on forty dollars? | Informational, planning | gap. The home page has an H2, "Where forty dollars a day can go", with no page behind it | high |
| 3 | Where can I travel on a small budget? | Informational, destination choice | gap. The home page has an H2, "Where a small budget can take you", with no destination page | high |
| 4 | When is the best time to book cheap flights? | Informational, how-to | cheap-flights-timing.html (94 words, no schema, no inbound links beyond 1) | high |
| 5 | Do I need a visa, and which countries are visa-free? | Informational, eligibility | visa-free-basics.html (24 words, description is "Visa basics.", no H2s) | medium |
| 6 | Is a hostel or a guesthouse cheaper for a solo traveller? | Comparison, commercial | hostel-vs-guesthouse.html (98 words, empty meta description, 1 image missing alt) | medium |
| 7 | How do I eat well on ten dollars a day? | Informational, how-to | eat-on-a-budget.html (69 words, 0 H1s, not in the sitemap) | medium |
| 8 | What should I pack for two weeks in one carry-on? | Informational, list | how-to-pack-carry-on-only.html (164 words, has Article schema). packing-list-backpack.html repeats its title and description | medium |
| 9 | How do I do laundry while travelling? | Informational, how-to | Partial. It is one H2 inside how-to-pack-carry-on-only.html, with no page of its own | low |
| 10 | How do I get around cheaply once I arrive? | Informational, how-to | gap. No page or heading in the crawl covers local transport | low |

## Coverage notes

Four of the ten questions are gaps (1, 2, 3, 10) and one is only a heading (9). The other five have a page, but every one of those pages is thin: the longest is 164 words and the shortest is 24.

Two existing pages need repair before new work competes with them: eat-on-a-budget.html has no H1 and is missing from the sitemap, and packing-list-backpack.html copies another page's title and description and has 0 inbound links. These are fixes for the technical owner, not new articles.

Priority is my judgment from the crawl alone (broken link, empty promise on the home page, thin page). I have no traffic, ranking or search-volume data, so none is claimed.

## Best article to write next

Write "Do you need travel insurance on a budget trip?" (question 1).

The site already sends readers there. cheap-flights-timing.html links to travel-insurance-basics.html and that URL returns 404, so the crawl shows a promised answer that does not exist. A new page at that URL, or a redirect to it, fixes a broken link and fills a gap in one piece of work.

It also fits the audience. A reader who has just learned how to book a cheap flight is the person deciding whether to add insurance, so the two articles can link to each other, and the new page would lift cheap-flights-timing.html above its current 1 inbound link.

The competition for this query is unchecked: I ran no search this run, so the field's difficulty is n/a. The next step is to pull the live result set before drafting. Any draft stays a draft for human approval.
