# RankRelay submission checklist

| Requirement | Where |
|---|---|
| Agency Plan | [RankRelay-Agency-Plan.pdf](RankRelay-Agency-Plan.pdf) |
| Live Google Sheet ledger | [RankRelay Agent Ledger](https://docs.google.com/spreadsheets/d/1WIaCAeqMOtJV_dRXvPSTJsNWiryTa1oEJNWNT4tGy9M/edit?usp=sharing) |
| Confirmation email copies | Screenshot from your inbox, subject "RankRelay daily brief" |
| Code implementation | [github.com/adwaith11366/rankrelay](https://github.com/adwaith11366/rankrelay) |
| `.installed.json` files | `employees/<kit>/.installed.json`, one per kit |
| Automation bridges | `agency/bridge/` and `agency/run-all.mjs` |
| Project PowerPoint | [RankRelay-Presentation.pptx](RankRelay-Presentation.pptx) |
| Screen recording | Record `npm run demo` (steps below) |

Live demo site: https://adwaith11366.github.io/rankrelay/

Results dashboard: https://adwaith11366.github.io/rankrelay/dashboard/

## Recording the demo

The run takes about 4 minutes and needs no narration, because each step is labelled in the terminal.

1. Start a screen recording with the Snipping Tool (Win+Shift+R) or Game Bar (Win+Alt+R).
2. Show the demo site and the empty end of the Sheet.
3. In a terminal in this project's folder, run `npm run demo`.
4. When it finishes, refresh the Sheet to show 8 new rows.
5. Open the bulletin in your inbox.
6. Open the dashboard. GitHub Pages takes about a minute to update.
7. Open one file in the newest `outputs` folder.
