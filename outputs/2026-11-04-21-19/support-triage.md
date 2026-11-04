# Support triage: Shoestring Atlas reader inbox

Date: 2026-11-04
Source: agency/data/reader-inbox.sample.json (6 sample messages, not real readers)
Status: drafts only. Nothing has been sent, and no message has been marked read or closed.

## Triage table

| id | category | priority | action |
|---|---|---|---|
| R-101 | Site defect: broken link | High | Send reply draft A after human approval. Pass to Technical Auditor. |
| R-102 | Content request: visa guide | Medium | Pass to content team as a gap. No reply needed urgently; optional holding reply. |
| R-103 | Praise | Low | Optional thank-you. Log as a positive signal for the packing content. |
| R-104 | Spam: paid casino-link guest post | Spam | Flag as spam. Do not reply. |
| R-105 | Content question: possible accuracy gap | Medium | Pass to content team. Technical Auditor does not need to act. |
| R-106 | Site defect: duplicate pages | Medium | Pass to Technical Auditor. Hold reply until the auditor confirms. |

R-101 is the only high-priority message. The reader says they plan to book tomorrow, so the broken link has a deadline.

## Draft replies for high-priority messages

### R-101 (draft A, needs human approval before sending)

Reader's words: "The travel insurance link in your cheap flights post gives a page not found error. I wanted to read it before booking tomorrow."

Subject: Re: Link broken on flights article

Hi,

Thanks for telling us. I checked the cheap flights post and the travel insurance link in it points to a page that isn't among the pages we publish, so you were right to report it.

We've recorded the problem and passed it on. I can't give you a date for a fix, and I don't want you to wait on us before you book.

Until a guide is back, check the insurance terms of the provider you're buying from, and compare what they cover for cancellations and medical care before you pay.

Shoestring Atlas

Notes for the approver:
- The draft makes no promise of a fix date and does not say the link is fixed. No fix is recorded in any file I read.
- The insurance advice in the third paragraph is generic. If you want to name specific provider terms, add them yourself; I have no source for them.

## Spam

R-104 offers a guest post with casino links for $50. It is a paid-link pitch. Flag it and do not reply. Do not follow up on the offer.

## Messages that reveal site defects (for the Technical Auditor)

I checked each against the pages in docs/ this run.

1. R-101, broken internal link. docs/cheap-flights-timing.html links to /rankrelay/travel-insurance-basics.html. No file with that name exists in docs/. The path also starts with /rankrelay/, which differs from the relative links the other pages use. The auditor should confirm the link returns 404 on the live site and decide between a replacement page and a corrected link.
2. R-106, duplicate packing pages. docs/how-to-pack-carry-on-only.html and docs/packing-list-backpack.html have the identical title and meta description. The second page says it is an "older version" and has about one paragraph of content, with no schema markup. The auditor should check canonicalisation, sitemap entries and whether the old page needs a redirect or a canonical tag.

Related, not reported by a reader but seen while checking:
- docs/hostel-vs-guesthouse.html has no meta description, and its image has no alt text. This bears on R-105 only loosely.
- docs/visa-free-basics.html has a one-line body and a meta description of "Visa basics." This matches the reader's complaint in R-102, but it is a thin-content problem and not a technical fault.

## Content gaps (for the content team, not the auditor)

- R-102: the reader asks for a visa-free guide. The current page says only to check with the embassy.
- R-105: the reader asks whether guesthouses beat dorms for two people in Western Europe. The hostel page says a private room "often" costs about the same as two dorm beds, and it names no region or prices. I can't confirm or deny the reader's claim that prices looked different. Any answer needs a source the content team supplies.

## Counts

6 messages: 1 high (R-101), 3 medium (R-102, R-105, R-106), 1 low (R-103), 1 spam (R-104). 1 reply drafted. 2 messages flagged for the Technical Auditor (R-101, R-106).
