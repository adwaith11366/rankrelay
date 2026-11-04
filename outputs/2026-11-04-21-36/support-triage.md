# Support triage: Shoestring Atlas reader inbox

Date: 2026-11-04. Source: agency/data/reader-inbox.sample.json (6 sample messages, not real readers). Nothing here has been sent. Every reply below is a draft for a human to read and send.

Priority rule used: high means the reader has a deadline or cannot complete what they came to do. Medium means a content question that may point to a site problem. Low means no action is needed from the reader's side. Response targets are n/a (no response target recorded).

## Triage table

| id | category | priority | action |
|---|---|---|---|
| R-101 | Site defect: broken link | High | Send the draft reply below after human approval. Pass the link to the Technical Auditor. |
| R-102 | Content gap: thin visa page | Medium | Reply with a short, honest answer (no draft written, since the priority is not high). Pass the page to the Technical Auditor and the content team. |
| R-103 | Praise | Low | No reply needed. Optional thank-you at the human's discretion. Record the carry-on list as a page readers use. |
| R-104 | Spam: paid casino link offer | Low | Flag as spam. Do not reply. |
| R-105 | Content accuracy question | Medium | Send to the content owner to check the guesthouse versus dorm claim for Western Europe. Reply after the claim is checked. |
| R-106 | Site defect: possible duplicate pages | Medium | Pass to the Technical Auditor. Reply once the current page is confirmed. |

## Spam

R-104 is spam. The sender offers a guest post with casino links for $50 and asks for a reply. Replying would confirm the address is read. Paid links are also a search risk for the site. No reply, no forwarding to the client as a lead.

## Messages that may reveal site defects

These are reader reports, not confirmed faults. I have not opened the site this run, so none of them is verified.

R-101: the reader says "The travel insurance link in your cheap flights post gives a page not found error." Check the outbound and internal links in the cheap flights post, and run a broken-link check across the site, since one dead link suggests others.

R-102: the reader says "Your visa page is one line." Check the visa page for thin content, and whether any visa-free country guide exists elsewhere on the site.

R-106: the reader says "I found two packing pages with the same title." Check for duplicate or near-duplicate packing list pages, their titles, canonical tags, redirects and which one is in the sitemap. R-103 praises the Vietnam carry-on list, so it is worth checking that the page readers use is the one that stays.

R-105 is probably a content accuracy question and not a site defect. The Technical Auditor does not need it unless the content owner finds a data or template problem.

## Draft reply for R-101 (high priority)

Status: draft, not sent. Needs human approval.

Reader's words: "The travel insurance link in your cheap flights post gives a page not found error. I wanted to read it before booking tomorrow."

Subject: Re: Link broken on flights article

Hi,

Thanks for telling us about the broken travel insurance link in the cheap flights post. I'm sorry it got in the way of your booking.

We've recorded the problem and passed it on to be checked. I can't tell you yet whether or when it will be fixed, and I don't want you to wait on us with a flight to book tomorrow. If you need travel insurance cover before then, comparing policies directly with a provider you trust is the quickest route.

If you can tell us which link you clicked (the text it was under is enough), that helps whoever checks it.

The Shoestring Atlas team

Notes for the sender: the draft makes no promise of a fix, a date or a replacement link, and recommends no insurer, because I have no source for either. If the human confirms the link is fixed before sending, they can change the middle paragraph.

## Lower-priority replies, not drafted

R-102, R-105 and R-106 each need a fact I don't have: whether a visa guide exists, whether the guesthouse claim holds in Western Europe, and which packing page is current. Draft these after the Technical Auditor and content owner report back. R-103 needs no reply.
