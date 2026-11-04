# Support triage: Shoestring Atlas reader inbox

Source: agency/data/reader-inbox.sample.json, read this run. It holds 6 sample messages, not real readers. Nothing below has been sent. Every reply is a draft for a human to read and send.

## Triage table

| id | category | priority | action |
|---|---|---|---|
| R-101 | Broken link (site defect) | High | Send draft reply 1. Pass to Technical Auditor. The reader plans to book tomorrow. |
| R-102 | Content request (thin visa page) | Medium | No reply drafted. Pass the thin page to Technical Auditor and the content team. |
| R-103 | Praise | Low | No action needed. Optional one-line thanks. Candidate testimonial only if the reader gives permission. |
| R-104 | Spam (paid casino-link guest post) | Low | Flag as spam. Do not reply. Do not click or open links. |
| R-105 | Content accuracy question | High | Send draft reply 2. Pass the claim to the content team to verify. |
| R-106 | Possible duplicate pages (site defect) | Medium | Pass to Technical Auditor. Reply after the auditor confirms which page is current. |

## Why these priorities

R-101 is high because the reader says "I wanted to read it before booking tomorrow", so the problem has a deadline, and the page is a dead link on a money-adjacent topic.

R-105 is high because a reader is challenging a factual claim ("Prices looked different to me"). The inbox gives no data to settle it either way, so I took the more severe reading. A wrong claim costs trust; a check costs little.

R-102 and R-106 are medium: each reader is stuck or confused, but nothing in the message sets a deadline.

## Draft replies (high priority only)

### Draft 1: reply to R-101 (reader-a@example.com)

Subject: Re: Link broken on flights article

Hi,

Thanks for telling us. We can't open the travel insurance link from your description alone, so we have passed the broken link on the cheap flights post to the person who checks the site.

Since you're booking tomorrow, don't wait on us. Compare policies on the websites of insurers you already trust, and check what each one covers for your route and dates before you pay.

Shoestring Atlas

Notes for the sender: the draft does not say the link is fixed or give a fix date. Send it only after a person has read it.

### Draft 2: reply to R-105 (reader-d@example.com)

Subject: Re: Wrong info?

Hi,

That's a fair question. We can't confirm from here that the guesthouse versus dorm comparison holds in Western Europe, so we have passed your note to the writer to check against current prices.

If you can send the cities and dates where prices looked different, plus what you saw, that gives the check something concrete to compare.

Shoestring Atlas

Notes for the sender: the draft does not defend or retract the claim. It makes no promise of a correction or a date.

## Spam

R-104 (partner@example.com) offers a guest post with casino links for $50. It is unsolicited paid-link outreach. Flagged as spam. No reply, no click, no purchase.

## Messages that reveal possible site defects

For the Technical Auditor to check. These are reader reports, not confirmed faults.

1. R-101: the travel insurance link in the cheap flights post is said to return "page not found". Check every outbound and internal link in that post, and the link's target.
2. R-102: the visa page is described as "one line". Check whether the page is thin or a stub, and whether a visa-free countries guide exists elsewhere on the site.
3. R-106: two packing pages are said to share one title. Check for duplicate titles, duplicate content, and whether one page should redirect to or canonicalise to the other.

R-105 is a content accuracy question, not a technical defect. It goes to the writer, not the auditor.

## Counts

6 messages read. 2 high, 2 medium, 2 low. 1 spam. 2 drafted replies. 3 flagged for the Technical Auditor.
