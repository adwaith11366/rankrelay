# Technical audit: Shoestring Atlas

Source for every figure: outputs/2026-11-04-21-36/crawl.json (crawled 2026-11-04T21:36:46.271Z, site https://adwaith11366.github.io/rankrelay/). Nothing here comes from any other source. This audit is read-only; no site file was changed.

## Summary

The crawl covers 9 URLs: 8 return 200 and 1 returns 404. It found 10 defect types and 25 URL-level findings. The sitemap lists 6 URLs, and robots.txt returns 200. The llms.txt request returns 404.

The most urgent items are the broken internal link, the page with no H1, the duplicate page that is also an orphan, and the missing llms.txt. Most of the remaining findings are thin content and missing schema, which apply to nearly every page.

Severity is my own rating: high means a page is broken, invisible to crawlers or competing with itself; medium means it weakens a working page; low means a minor gap.

## 1. Non-200 status

| URL | Status | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/travel-insurance-basics.html | 404 | High |

The crawl shows 1 inbound link, from https://adwaith11366.github.io/rankrelay/cheap-flights-timing.html. Readers and crawlers hit a dead end there.

Fix: in cheap-flights-timing.html, remove the link to travel-insurance-basics.html, or repoint it to a live page. If a travel insurance page is wanted, publish it at that exact path, then add it to sitemap.xml and link to it from at least one other page. The crawl shows no content for this URL, so I can't say which option the site owner intends.

## 2. Missing H1

| URL | h1Count | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html | 0 | High |

Fix: add one H1 at the top of the page body: `<h1>Eat well on ten dollars a day</h1>`. This matches the page's current title. Keep the two existing H2s ("Shop at markets", "Use the hostel kitchen") below it.

## 3. Duplicate titles

| URL | Title | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/how-to-pack-carry-on-only.html | How to pack for two weeks in one carry-on bag | High |
| https://adwaith11366.github.io/rankrelay/packing-list-backpack.html | How to pack for two weeks in one carry-on bag | High |

The two pages also share an identical meta description ("A two-week packing list that fits one carry-on bag, with what to leave at home and how to do laundry on the road."). The first page has 164 words, 3 H2s, Article schema and is in the sitemap. The second has 44 words, no H2s, no schema, 0 inbound links and is not in the sitemap.

Fix: treat packing-list-backpack.html as the duplicate. Either delete it, or replace its content with a link to how-to-pack-carry-on-only.html. If it must stay live, give it its own title and description that match a different search intent, such as a backpack-specific packing list, and expand it past a stub. The crawl doesn't show whether either page has a canonical tag, so I'm not claiming one is missing.

## 4. Missing meta description

| URL | Severity |
|---|---|
| https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html | Medium |

The description field is an empty string.

Fix: add `<meta name="description" content="...">` in the head. Suggested text, 130 characters: "Hostel or guesthouse for solo travellers? Compare what each costs and when each one is the cheaper place to sleep." Check it against the page body before publishing.

## 5. Missing alt text

| URL | Images missing alt | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html | 1 | Medium |

The crawl counts the images but doesn't name which one, so its file name is n/a.

Fix: open hostel-vs-guesthouse.html, find the `<img>` with no alt attribute, and add a short alt that describes what the image shows. If the image is purely decorative, use `alt=""`.

## 6. Pages absent from the sitemap

| URL | inSitemap | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html | false | High |
| https://adwaith11366.github.io/rankrelay/packing-list-backpack.html | false | Medium |

The crawl reports a sitemap urlCount of 6, and the 6 pages marked inSitemap true match that. The 404 URL is also marked false, which is correct and needs no sitemap entry.

Fix for eat-on-a-budget.html: add `<url><loc>https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html</loc></url>` to sitemap.xml.

Fix for packing-list-backpack.html: do not add it. Resolve the duplicate first (section 3). Add it only if it stays live with unique content.

## 7. Orphan pages (inboundLinks 0)

| URL | inboundLinks | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/packing-list-backpack.html | 0 | Medium |

Fix: if the page is kept, link to it from how-to-pack-carry-on-only.html or the home page. If it is removed or merged (section 3), no link is needed. This is the only page with zero inbound links.

Related, and not a defect on its own: 5 of the 8 live pages have exactly 1 inbound link (how-to-pack-carry-on-only, cheap-flights-timing, hostel-vs-guesthouse, eat-on-a-budget, visa-free-basics). Those pages depend on a single link each.

## 8. Thin pages

The crawl sets no threshold. I used under 300 words, which is my choice and not a figure from the crawl. All 8 live pages fall under it.

| URL | wordCount | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/ | 50 | High (12 inbound links, the most-linked page) |
| https://adwaith11366.github.io/rankrelay/about.html | 10 | Medium |
| https://adwaith11366.github.io/rankrelay/how-to-pack-carry-on-only.html | 164 | Medium |
| https://adwaith11366.github.io/rankrelay/cheap-flights-timing.html | 94 | Medium |
| https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html | 98 | Medium |
| https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html | 62 | Medium |
| https://adwaith11366.github.io/rankrelay/visa-free-basics.html | 24 | Medium |
| https://adwaith11366.github.io/rankrelay/packing-list-backpack.html | 44 | Medium (resolve via section 3) |

Fix: this one needs a writer, not a code change. For the guides, expand each to answer the question in its title with specific figures, steps and examples; the SEO writer owns that work. For the home page, add a short intro and a link block to every guide. For about.html, state who runs the site and what it covers. The home page and about.html also have no H2s (the crawl shows an empty h2 list for both).

## 9. Missing schema

Only how-to-pack-carry-on-only.html has schema (Article). The other 7 live pages have none.

| URL | schemaTypes | Severity | Suggested type |
|---|---|---|---|
| https://adwaith11366.github.io/rankrelay/ | none | Medium | WebSite and Organization |
| https://adwaith11366.github.io/rankrelay/about.html | none | Low | AboutPage |
| https://adwaith11366.github.io/rankrelay/cheap-flights-timing.html | none | Medium | Article |
| https://adwaith11366.github.io/rankrelay/hostel-vs-guesthouse.html | none | Medium | Article |
| https://adwaith11366.github.io/rankrelay/eat-on-a-budget.html | none | Medium | Article |
| https://adwaith11366.github.io/rankrelay/visa-free-basics.html | none | Medium | Article |
| https://adwaith11366.github.io/rankrelay/packing-list-backpack.html | none | Low | none until the duplicate is resolved |

Fix: add a `<script type="application/ld+json">` block to each page's head with the suggested type. Each Article needs headline, description and URL matching the page's own title and description; add author and datePublished only with real values from the site owner. Copy the structure from the existing Article block on how-to-pack-carry-on-only.html. The crawl doesn't show that block's contents, so I haven't checked it for errors.

## 10. Missing llms.txt

| URL | Status | Severity |
|---|---|---|
| https://adwaith11366.github.io/rankrelay/llms.txt | 404 | Medium |

Fix: publish the file drafted at outputs/2026-11-04-21-36/llms.txt to the site root next to sitemap.xml. It is a draft for human approval and has not been published. It lists only live 200 pages from the crawl and leaves out the 404 URL and the duplicate packing-list-backpack.html. The draft's page summaries use each page's crawl description or title; the owner should check them before publishing.

## Not flagged

These were checked against the crawl and are fine: robots.txt returns 200, sitemap.xml returns 200, every live page has a title, and every live page except eat-on-a-budget.html has exactly one H1. I did not check title length, canonical tags, page speed or internal link anchor text, because the crawl has no data for them.
