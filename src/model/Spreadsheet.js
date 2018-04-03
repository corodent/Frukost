// Client ID and API key from the Developer Console
var CLIENT_ID = '542434086778-e1uvvh9rdq8c21si7p2d81tech4pahei.apps.googleusercontent.com';
var API_KEY = 'AIzaSyApd6eBtkhR5O3dlFj_5El6VmySAIic9e0';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

// Copy of Digital Breakfastlist WIP in my Google Drive
const SPREADSHEET_ID = '1NpGatbVywS9VuF_1KkRXcjVYhw3z6QnGZ5uApu9j_kY';
const GREEN_SHEET_ID = 0;
const BLUE_SHEET_ID  = 289210114;
const RED_SHEET_ID   = 717808041;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  window.gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  window.gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log("signed in");
  } else {
    console.log("not signed in");
    window.gapi.auth2.getAuthInstance().signIn();
  }
}

function testSheet1() {
  window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Grön!A1:A23',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for( var i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log(`row ${i} ${row}`);
      }
    } else {
      console.log('No data found.');
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

function testSheet() {
  const params = {
    spreadsheetId: SPREADSHEET_ID,
    range: 'Grön!B4:B4',
    valueInputOption: "USER_ENTERED",
  };
  const valueRangeBody = {
    range: 'Grön!B4:B4',
    majorDimension: "ROWS",
    values: [['✔']],
  };
  window.gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody)
  .then(function(response) {
    console.log(response);
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}


/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  window.gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  window.gapi.auth2.getAuthInstance().signOut();
}

export {
  handleClientLoad,
  testSheet
}
