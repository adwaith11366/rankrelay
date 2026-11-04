# Support triage: Shoestring Atlas reader inbox

Source: agency/data/reader-inbox.sample.json (6 sample messages, not real readers). Site facts below come from outputs/2026-11-04-21-45/crawl.json (crawled 2026-11-04) and the page files in docs/. Nothing has been sent. Every reply below is a draft for a human to read and send.

## Triage table

| id | category | priority | action |
|---|---|---|---|
| R-101 | Broken link (site defect) | High | Draft reply; send to Technical Auditor. Reader plans to book tomorrow. |
| R-102 | Content request (visa guide) | Medium | Pass to content team as a topic request; no reply drafted. |
| R-103 | Praise | Low | Optional thank-you; no reply drafted. |
| R-104 | Spam (paid casino guest post) | Spam | Flag as spam. Do not reply. |
| R-105 | Accuracy challenge | High | Draft reply; send to Technical Auditor and content team. |
| R-106 | Possible duplicate page (site defect) | Medium | Send to Technical Auditor; no reply drafted. |

Priority rule used: high means the reader has a time limit or is questioning the accuracy of what we published. Medium means a real gap with no deadline. This is my own reading, since no severity rules file was part of this work order.

## Draft replies for high-priority messages

### R-101: broken insurance link

Reader's words: "The travel insurance link in your cheap flights post gives a page not found error. I wanted to read it before booking tomorrow."

Subject: Re: Link broken on flights article

Hi,

Thanks for telling us. You're right: the insurance link in the cheap flights post leads to a page that doesn't exist, and we don't have a travel insurance page on the site today.

Since you're booking tomorrow, I'd check a policy's cover limits, exclusions and claim process on the insurer's own site before you pay. The flights post itself is still readable.

We've passed your report on to the person who looks after the site's links.

Shoestring Atlas

Basis for each claim: the crawl shows travel-insurance-basics.html returns 404 and is linked from cheap-flights-timing.html. The last sentence says only that the report was passed on, which the Technical Auditor handoff below makes true once a human sends this. It makes no promise of a fix or a date.

### R-105: guesthouse versus dorm for two people

Reader's words: "You say guesthouses beat dorms for two people. Is that true in Western Europe too? Prices looked different to me."

Subject: Re: Wrong info?

Hi,

Fair question. Our hostel and guesthouse post says a guesthouse room can beat a dorm "when two people split the cost," and that two people sharing a private room "often pay about the same as two dorm beds." That is a general statement. The post gives no prices and doesn't name a region, so it doesn't tell you whether Western Europe is different.

If the prices you saw were higher for guesthouses, that's a useful data point. It would help if you could tell us which city and roughly what you compared.

We've passed your note on to the person who checks the accuracy of our posts.

Shoestring Atlas

Basis: quotes come from docs/hostel-vs-guesthouse.html. The draft doesn't say who is right, because the site has no price data to settle it.

## Spam

R-104 offers a guest post with casino links for $50. It's a paid link offer. Flag it as spam and don't reply. Don't follow up on it, and don't let it near the site's links.

## Messages that reveal site defects (for the Technical Auditor)

R-101: confirmed by the crawl. https://adwaith11366.github.io/rankrelay/travel-insurance-basics.html returns 404. It is linked from cheap-flights-timing.html and isn't in the sitemap. The page may need to be created, or the link removed or pointed elsewhere; that is the auditor's call.

R-106: confirmed by the crawl. Two pages share the title "How to pack for two weeks in one carry-on bag" and the same description: how-to-pack-carry-on-only.html (164 words, Article schema, in sitemap, 1 inbound link) and packing-list-backpack.html (44 words, no schema, not in sitemap, 0 inbound links). Which one is current is a content decision. The thinner one looks like the older or stray copy, but I haven't confirmed that.

R-105: partly checkable. The guesthouse post has no description meta tag, one image missing alt text, and makes a price comparison with no figures or region. Whether the claim is wrong for Western Europe is n/a; no price data was supplied.

R-102: the reader's complaint matches the crawl. visa-free-basics.html has 24 words, no H2 sections and the description "Visa basics." This is a thin page, not a broken one. It is a content gap more than a technical defect, but the auditor may want it on the thin-content list.

R-103 and R-104 reveal no defects.

## Reply status

Replies drafted: 2 (R-101, R-105). Spam flagged: 1 (R-104). Messages needing no reply from this desk: R-102, R-103, R-106. No drafts were written for those; they are low-urgency.
