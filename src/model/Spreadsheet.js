// Client ID and API key from the Developer Console
var CLIENT_ID = '542434086778-e1uvvh9rdq8c21si7p2d81tech4pahei.apps.googleusercontent.com';
//var CLIENT_ID = '542434086778-03kj94o9v8u3lngl8p3p2ir5c347137r.apps.googleusercontent.com';
var API_KEY = 'AIzaSyApd6eBtkhR5O3dlFj_5El6VmySAIic9e0';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

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
  handleAuthClick,
  handleSignoutClick,
  initClient,
  handleClientLoad,
}
