# RankRelay

RankRelay is an 8-agent SEO and AEO agency built on the [ai-employees](https://github.com/markfulton/ai-employees) kits. One command crawls a live client site, runs seven specialist agents in Claude Code, has a Project Manager agent audit their work, writes the results to a Google Sheet ledger and emails a status bulletin.

The client, [Shoestring Atlas](https://adwaith11366.github.io/rankrelay/), is a fictional budget travel blog built for this assignment. Its SEO and AEO defects were planted on purpose and are listed in [site-src/SEEDED-DEFECTS.md](site-src/SEEDED-DEFECTS.md). The reader inbox in `agency/data/` is sample data.

## The team

| Role | Kit | Kit routine | Work order |
|---|---|---|---|
| Project Manager | chief-of-staff | cos-fleet-reconcile | Audits all 7 agents, updates the ledger, writes the brief |
| Lead Researcher | seo-employee | seo-calendar-refill | Maps traveller questions to pages and ranks gaps |
| Content Writer | social-media-employee | soc-draft-queue | Drafts an answer-first article with FAQ schema |
| Performance Analyst | gtm-engineer | gtm-scoreboard | Scores SEO and AEO readiness from crawl data |
| Campaign Builder | ad-manager-employee | ads-creative-studio | Builds a 7-day promotion schedule |
| Technical Auditor | web-dev-employee | web-site-sweep | Audits the crawl and proposes fixes |
| Support Triage | customer-satisfaction-employee | csat-inbox-sweep | Triages the sample inbox and drafts replies |
| Outbound Strategist | sales-employee | sales-prospect-sweep | Lists link targets and drafts outreach |

Each kit's receipt is at `employees/<kit>/.installed.json`, written by `npx ai-employees hire`.

The agents use each kit's `ROLE.md` as their charter and record each run in the kit's own `runlog.jsonl` through its `scripts/runlog.mjs`. They follow the work orders in [agency/prompts.mjs](agency/prompts.mjs); the full kit routines aren't run, because those need browser sessions and business accounts that a fictional client doesn't have.

## How a run works

1. [agency/tools/crawl.mjs](agency/tools/crawl.mjs) fetches the live site and writes `crawl.json`.
2. The Lead Researcher, Technical Auditor, Performance Analyst and Support Triage run in parallel.
3. The Content Writer drafts from the research.
4. The Campaign Builder and Outbound Strategist work from the draft.
5. Code checks each agent's exit status and output file, then the Project Manager reads the work and writes `daily-brief.md`.
6. [agency/bridge/bridge.mjs](agency/bridge/bridge.mjs) posts one row per agent and the brief to [the Apps Script web app](agency/bridge/Code.template.gs).
7. The script emails the bulletin. A time trigger also sends it at 8:00 AM, including an alert if no agent ran in the last 24 hours.

Agents can write only inside their run folder under `outputs/`. Nothing is sent, posted or published by an agent; outreach stays as drafts.

## Run it

You need Node 18 or newer and a signed-in Claude Code CLI.

```bash
npm run demo
```

`npm run dry-run` tests the wiring without Claude or Google. `node agency/run-all.mjs --no-bridge` runs real agents with no Google calls.

## Setup

1. Copy `.env.example` to `.env` and fill it in.
2. Run `npm run bridge:render`, which writes `agency/bridge/Code.local.gs`.
3. In a new Google Sheet, paste that file into Extensions > Apps Script, then run `setup` once.
4. Deploy it as a web app that executes as you, with access for anyone, and put the URL in `.env`. Requests need the secret in `.env`.
5. Run `agency/schedule.ps1` to register the 7:15 AM daily run in Windows Task Scheduler.
