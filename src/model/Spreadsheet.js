import { bubbles } from './Model';
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

/*
const GREEN_SHEET_ID = 0;
const BLUE_SHEET_ID  = 289210114;
const RED_SHEET_ID   = 717808041;
*/

const itemRowMap = {
  'Macka 1': 2,
  'Macka 2': 7,
  'Fil': 12,
  'Yogurt': 14,
  'Gröt': 16,
  'Flingor': 18,
  'Müesli': 19,
  'Ägg': 20,
  'Juice': 22,
  'Näringsdryck': 23,
  'Kaffe': 24,
  'Te': 27,
};

const TRUE_VALUE = '✔';
const FALSE_VALUE = '✖';

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

function updateCell( sheet, cell, value ) {
  const range = `${sheet}!${cell}:${cell}`;
  const params = {
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    valueInputOption: "USER_ENTERED",
  };
  const valueRangeBody = {
    range: range,
    majorDimension: "ROWS",
    values: [[value]],
  };
  window.gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody)
  .then(function(response) {
    console.log(response);
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

function updateValue( bubble, room, item, option, enabled ) {
  const sheet = bubbles[bubble].name;
  const column = String.fromCharCode( "B".charCodeAt(0) + room );
  var row = itemRowMap[item.name];
  console.log( `update ${sheet} ${column} ${row}`);

  // item == option - use the item row -> checkbox or x
  if( item===option ) {
      const cell = column + row;
      updateCell( sheet, cell, enabled ? TRUE_VALUE : FALSE_VALUE );
  } else {
    console.log( 'Not something I know how to deal with');
  }

  // Mackas - item row + 1 + option index -> checkbox or x
  // Fil, Yogurt - item row + 1 -> set to option name
  // Ägg -
  // Kaffe, Te - option == milk - item row + 2 -> checkbox or x
  //           - option != milk - item row + 2 -> set to option name

}

export {
  handleClientLoad,
  updateValue
}
