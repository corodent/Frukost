import { bubbles, menuItems, COMMENTS_PROP } from './Model';

// Client ID and API key from the Developer Console
// var CLIENT_ID = '542434086778-e1uvvh9rdq8c21si7p2d81tech4pahei.apps.googleusercontent.com';
var CLIENT_ID = '1012841776473-2lhkldc78e7q274b4ldjdia58f7t857r.apps.googleusercontent.com';

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
const STATUS_ROW = 30;
const ORDERED_TEXT = 'Beställt';
const KLAR_TEXT = '✔';

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
  'mjölk',
  'Kommentar',
  'Klar'
];

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad( onSigninChanged ) {
  window.gapi.load('client:auth2', initClient(onSigninChanged));
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient( onSigninChanged ) {
  const cb = onSigninChanged;
  return function () {
    window.gapi.client.init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(cb);

      // Handle the initial sign-in state.
      cb(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }
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

  let cellData = order.get( room, COMMENTS_PROP, COMMENTS_PROP ) || null;
  row.push( [cellData] );
  row.push( [ORDERED_TEXT] );

  const bubbleNumber = bubbles.findIndex( e => e.name===bubble );
  const roomNumber = bubbles[bubbleNumber].rooms.indexOf(room);
  const column = String.fromCharCode( START_COLUMN.charCodeAt(0) + roomNumber );
  const startCell = `${column}${START_ROW}`;
  const endCell = `${column}${row.length+START_ROW-1}`;
  return updateRange( bubble, startCell, endCell, row );
}

function resetBubble( bubbleNumber ) {
  console.log( `resetBubble ${bubbleNumber}`);
  const width = bubbles[bubbleNumber].rooms.length;
  const row = Array( width  ).fill('');
  const values = Array( spreadSheetRows.length ).fill(row);
  console.log( values );

  const endColumn = String.fromCharCode( START_COLUMN.charCodeAt(0) + width - 1 );
  const startCell = `${START_COLUMN}${START_ROW}`;
  const endCell = `${endColumn}${values.length+START_ROW-1}`;
  return updateRange( bubbles[bubbleNumber].name, startCell, endCell, values );
}

function signIn() {
  console.log( 'signIn');
  window.gapi.auth2.getAuthInstance().signIn({
    ux_mode: 'redirect'
  })
  .then( () => {
    console.log( 'signIn worked ... oh yeah!!!' );
  })
  .catch( error => {
    console.log(`Error signing in: ${error}`);
  });
}

function mergeState( sheetState, order ) {
  Object.entries(sheetState).forEach(
    ([key,value]) => {
      const bubble = bubbles.find( element => element.name===key );
      for( var i = 0 ; i<bubble.rooms.length ; i++ ) {
        if( i<value.length && value[i]===KLAR_TEXT ) {
          order.setOrderState( bubble.rooms[i], order.OrderState.READY );
        }
        if( ( i<value.length && value[i]==='' ) || i>=value.length ) {
          if( order.getOrderState(bubble.rooms[i])!=order.OrderState.START ) {
            order.cleanOrder(bubble.rooms[i]);
          }
        }
      }
    }
  );
}

function readSheetState() {
  const ranges = bubbles.map( elem => {
    const width = elem.rooms.length;
    const endColumn = String.fromCharCode( START_COLUMN.charCodeAt(0) + width - 1 );
    return `${elem.name}!${START_COLUMN}${STATUS_ROW}:${endColumn}${STATUS_ROW}`;
  });

  const params = {
    spreadsheetId: SPREADSHEET_ID,
    ranges: ranges
  };

  const re = /'(.*)'/;

  return window.gapi.client.sheets.spreadsheets.values.batchGet(params)
  .then( response => {
    var result = {};
    response.result.valueRanges.forEach( elem => {
//      console.log(`elem.range ${elem.range}`);
      let a = re.exec( elem.range );
      if( a!=null ) {
        result[a[1]] = elem.values ? elem.values[0] : [];
      }
    });
    return result;
  });
}

export {
  handleClientLoad,
  placeOrder,
  resetBubble,
  signIn,
  readSheetState,
  mergeState,
}
