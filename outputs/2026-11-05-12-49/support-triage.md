# Support triage: Shoestring Atlas reader inbox

Source: agency/data/reader-inbox.sample.json (6 sample messages, not real readers). Nothing here has been sent. Every reply below is a draft for a human to read and send.

## Triage table

| id | category | priority | action |
|---|---|---|---|
| R-101 | Site defect: broken link | High | Draft reply (below). Send to Technical Auditor. Reader plans to book "tomorrow". |
| R-102 | Content request: thin visa page | Medium | No reply drafted. Send to Content team as a content gap. Send to Technical Auditor as a thin-page check. |
| R-103 | Praise | Low | No reply drafted. Optional thank-you at the human's discretion. Log as positive feedback on the carry-on list. |
| R-104 | Spam: paid casino-link guest post | Spam | Flag. Do not reply. Do not engage with the offer. |
| R-105 | Content accuracy question | Medium | No reply drafted. Send to the content owner to check the claim against the page. |
| R-106 | Site defect: duplicate pages | Medium | No reply drafted. Send to Technical Auditor. |

Priority rule used: High is a reader who is blocked and has a stated deadline. Medium is a real question or a defect with no deadline. Low is praise. These are my own rules for this run, since no severity file was read.

## Draft reply for the high-priority message

### R-101: broken insurance link

Reader's words: "The travel insurance link in your cheap flights post gives a page not found error. I wanted to read it before booking tomorrow."

Subject: Re: Link broken on flights article

Hi,

Thanks for telling us about the broken link. I checked, and the link in the cheap flights post points to a travel insurance page that doesn't exist on the site right now. I've recorded it and passed it on.

Because you're booking tomorrow, I don't want to leave you waiting on us. I can't tell you when the page will be back. Your airline or booking site will list the insurance options it offers at checkout, and your own bank or credit card may already include some cover; check the terms of each before you pay.

Thanks again for flagging it.

Shoestring Atlas

Basis for each claim in the draft: the cheap flights page (docs/cheap-flights-timing.html) links to /rankrelay/travel-insurance-basics.html, and no file with that name exists in docs/. The draft makes no promise of a fix or a date. The "bank or credit card" line is general advice, not a claim about Shoestring Atlas; the human can delete it if unwanted.

## Spam

R-104 offers a guest post with casino links for $50. No reply. Don't click anything or ask for details.

## Messages that reveal site defects (for the Technical Auditor)

1. R-101, broken internal link. docs/cheap-flights-timing.html line 17 links to /rankrelay/travel-insurance-basics.html. No such file exists in docs/. Auditor should also check the link path, which uses an absolute /rankrelay/ prefix, and scan the other pages for links to missing files.
2. R-106, duplicate pages with the same title. docs/packing-list-backpack.html and docs/how-to-pack-carry-on-only.html both have the title and h1 "How to pack for two weeks in one carry-on bag". The first calls itself "This older version of our packing list" and is one short paragraph. Only how-to-pack-carry-on-only.html is in sitemap.xml and linked from index.html. Neither file has a canonical tag in the lines I searched. Auditor should decide between a redirect, a canonical tag or removing the old page.
3. R-102, thin page. docs/visa-free-basics.html has a heading and one sentence telling readers to check with an embassy. It is in the sitemap and linked from the home page as "Visa basics". The reader's complaint ("one line") matches. The Auditor should log it as a thin-content page.

## Messages for content review, not defects

R-105 questions the claim that guesthouses beat dorms for two people. docs/hostel-vs-guesthouse.html says two people sharing a private room "often pay about the same as two dorm beds". I found no mention of Western Europe and no price figures on that page, so I can't confirm or rule out the reader's price difference. Price data: n/a.

## Open items for the human

1. Read and send the R-101 reply, or edit it first.
2. Reply to R-102, R-105 and R-106 only after the content owner and Technical Auditor have answered, so no reply promises something that hasn't happened.
3. R-103 needs no action.
