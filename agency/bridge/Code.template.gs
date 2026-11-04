// RankRelay bridge: paste into Extensions > Apps Script on the ledger Sheet.
// npm run bridge:render fills the secret and recipient into a local copy that git ignores.
const SECRET = '__SECRET__';
const RECIPIENT = '__RECIPIENT__';
const LEDGER = 'Ledger';
const BRIEFS = 'Briefs';
const HEADERS = ['Timestamp', 'Agent Name', 'Task Performed', 'Output Status'];

// Run once from the editor. Creates the tabs and the 8:00 AM email trigger.
function setup() {
  const ss = SpreadsheetApp.getActive();
  ss.setName('RankRelay Agent Ledger');
  const ledger = ss.getSheetByName(LEDGER) || ss.insertSheet(LEDGER);
  ledger.getRange(1, 1, 1, 4).setValues([HEADERS]).setFontWeight('bold').setFontColor('#ffffff').setBackground('#5b2be0');
  ledger.setFrozenRows(1);
  ledger.setColumnWidth(1, 170); ledger.setColumnWidth(2, 170); ledger.setColumnWidth(3, 460); ledger.setColumnWidth(4, 110);
  const briefs = ss.getSheetByName(BRIEFS) || ss.insertSheet(BRIEFS);
  briefs.getRange(1, 1, 1, 2).setValues([['Timestamp', 'Brief']]).setFontWeight('bold');
  const blank = ss.getSheetByName('Sheet1');
  if (blank) ss.deleteSheet(blank);
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('sendDailyBrief').timeBased().everyDays(1).atHour(8).nearMinute(0).create();
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return reply_({ ok: false, error: 'bad json' }); }
  if (body.secret !== SECRET) return reply_({ ok: false, error: 'unauthorized' });
  const ss = SpreadsheetApp.getActive();
  if (body.action === 'log') {
    const rows = body.rows.map(function (r) { return [r.timestamp, r.agent, r.task, r.status]; });
    const sheet = ss.getSheetByName(LEDGER);
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 4).setValues(rows);
    return reply_({ ok: true, appended: rows.length, sheetUrl: ss.getUrl() });
  }
  if (body.action === 'brief') {
    ss.getSheetByName(BRIEFS).appendRow([new Date().toISOString(), body.brief]);
    return reply_({ ok: true });
  }
  if (body.action === 'email') {
    return reply_({ ok: true, sentTo: RECIPIENT, subject: sendDailyBrief() });
  }
  return reply_({ ok: false, error: 'unknown action' });
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Runs from the 8:00 AM trigger, so it works with the PC off. It reports only what is in the Sheet.
function sendDailyBrief() {
  const ss = SpreadsheetApp.getActive();
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const values = ss.getSheetByName(LEDGER).getDataRange().getValues().slice(1);
  const rows = values.filter(function (r) { return new Date(r[0]).getTime() >= cutoff; });
  const failed = rows.filter(function (r) { return String(r[3]).toLowerCase() !== 'success'; }).length;
  const briefRows = ss.getSheetByName(BRIEFS).getDataRange().getValues().slice(1);
  const latest = briefRows.length ? briefRows[briefRows.length - 1] : null;
  const fresh = latest && new Date(latest[0]).getTime() >= cutoff;
  const date = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'd MMM yyyy');
  const subject = rows.length === 0
    ? 'RankRelay daily brief, ' + date + ': NO AGENT RUNS IN 24 HOURS'
    : 'RankRelay daily brief, ' + date + ': ' + (rows.length - failed) + ' of ' + rows.length + ' tasks succeeded';
  const esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  const table = rows.map(function (r) {
    const ok = String(r[3]).toLowerCase() === 'success';
    return '<tr><td style="padding:8px;border-bottom:1px solid #eee">' + esc(r[1]) + '</td>' +
      '<td style="padding:8px;border-bottom:1px solid #eee">' + esc(r[2]) + '</td>' +
      '<td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;color:' + (ok ? '#0a7d4f' : '#c0202a') + '">' + esc(r[3]) + '</td></tr>';
  }).join('');
  const briefHtml = fresh ? esc(latest[1]).replace(/\n/g, '<br>') : 'No Project Manager brief in the last 24 hours.';
  const html = '<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#1d2433">' +
    '<div style="background:#5b2be0;background:linear-gradient(90deg,#7a2be0,#2563eb);color:#fff;padding:20px;border-radius:10px 10px 0 0">' +
    '<div style="font-size:22px;font-weight:bold">RankRelay daily brief</div><div>' + date + '</div></div>' +
    '<div style="padding:16px;background:#f6f4ff"><b>' + (rows.length - failed) + '</b> succeeded, <b>' + failed + '</b> need attention, <b>' + rows.length + '</b> logged in 24 hours</div>' +
    '<div style="padding:16px;line-height:1.5">' + briefHtml + '</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:14px"><tr style="text-align:left;background:#f0f0f5"><th style="padding:8px">Agent</th><th style="padding:8px">Task</th><th style="padding:8px">Status</th></tr>' + table + '</table>' +
    '<p style="padding:16px"><a href="' + ss.getUrl() + '">Open the live ledger</a></p></div>';
  MailApp.sendEmail({ to: RECIPIENT, subject: subject, htmlBody: html, name: 'RankRelay Project Manager' });
  return subject;
}
