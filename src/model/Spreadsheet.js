import { bubbles, menuItems } from './Model';
import { Order } from './Order';

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

const START_ROW = 2;
const START_COLUMN = "B";

const spreadSheetRows = [
  'Macka 1',
  'Bröd',
  'Ost',
  'Skinka',
  'Grönt',
  'Macka 2',
  'Bröd',
  'Ost',
  'Skinka',
  'Grönt',
  'Fil',
  '',
  'Yoghurt',
  '',
  'Gröt',
  '',
  'Ägg',
  '',
  'Juice',
  'Näringsdryck',
  'Saft',
  'Kaffe',
  'söt',
  'mjölk',
  'Te',
  'söt',
  'mjölk'
];

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

function updateRange( sheet, startCell, endCell, values ) {
  const range = `${sheet}!${startCell}:${endCell}`;
  console.log( `updateRange ${range}` );
  const params = {
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    valueInputOption: "USER_ENTERED",
  };
  const valueRangeBody = {
    range: range,
    majorDimension: "ROWS",
    values: values,
  };
  return window.gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
}

function placeOrder( bubble, room, order ) {
  let row = [];
  order = order || {};

  menuItems.forEach( item => {
    if( item.name!=='Dryck' ) {
      const cellData = order.get( room, item.name, item.name ) ? item.name : null;
      row.push( [cellData] );
    }

    const groupOpts = item.options.filter( elem => elem.group );
    const checkOpts = item.options.filter( elem => !elem.group );

    if( groupOpts.length>0 ) {
      const opt = groupOpts.reduce( ( prevVal, elem ) => {
        if( prevVal==null && order.get( room, item.name, elem.name ) ) {
          prevVal = elem.name;
        }
        return prevVal;
      }, null );
      row.push( [opt] );
    }

    checkOpts.forEach( option => {
      let cellData = null;
      if( order.get( room, item.name, item.name ) ) {
        const value = order.get( room, item.name, option.name );
        cellData = value ? option.name : null;
      }
      row.push( [cellData] );
    });
  });

  const bubbleNumber = bubbles.findIndex( e => e.name==bubble );
  const roomNumber = bubbles[bubbleNumber].rooms.indexOf(room);
  const column = String.fromCharCode( START_COLUMN.charCodeAt(0) + roomNumber );
  const startCell = `${column}${START_ROW}`;
  const endCell = `${column}${row.length+START_ROW-1}`;
  return updateRange( bubble, startCell, endCell, row );
}

function resetBubble( bubbleNumber ) {
  console.log( `resetBubble ${bubbleNumber}`);
  const width = bubbles[bubbleNumber].rooms.length
  const row = Array( width  ).fill('');
  const values = Array( spreadSheetRows.length ).fill(row);
  console.log( values );

  const endColumn = String.fromCharCode( START_COLUMN.charCodeAt(0) + width - 1 );
  const startCell = `${START_COLUMN}${START_ROW}`;
  const endCell = `${endColumn}${values.length+START_ROW-1}`;
  return updateRange( bubbles[bubbleNumber].name, startCell, endCell, values );
}

export {
  handleClientLoad,
  placeOrder,
  resetBubble
}
