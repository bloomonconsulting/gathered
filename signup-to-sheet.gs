/**
 * Gathered in Community: email signup to Google Sheet
 *
 * Setup (about 5 minutes):
 * 1. Create a Google Sheet (for example "Gathered email list"). In row 1 type: Date | Email | Page
 * 2. In the sheet, open Extensions > Apps Script, delete what is there, and paste this whole file.
 * 3. Click Deploy > New deployment > Select type: Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Click Deploy, approve the permissions, and copy the Web app URL.
 * 5. In index.html, replace PASTE_APPS_SCRIPT_WEB_APP_URL with that URL.
 */

function doPost(e) {
  var email = String((e.parameter && e.parameter.email) || '').trim().toLowerCase();
  var page = String((e.parameter && e.parameter.page) || '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return ContentService.createTextOutput('invalid');
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    // skip duplicates
    var last = sheet.getLastRow();
    if (last > 1) {
      var existing = sheet.getRange(2, 2, last - 1, 1).getValues().flat().map(String);
      if (existing.indexOf(email) !== -1) return ContentService.createTextOutput('exists');
    }
    sheet.appendRow([new Date(), email, page]);
  } finally {
    lock.releaseLock();
  }
  // Optional: get an email each time someone signs up. Uncomment the next line.
  // MailApp.sendEmail('gatheredincommunity@gmail.com', 'New email signup', email + ' signed up on the website.');
  return ContentService.createTextOutput('ok');
}
