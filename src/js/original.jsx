$(document).ready(() => {
    $("#sign-in").on("click", handleSignInClick);
});

function handleClientLoad() {
    // Loads the client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
    gapi.client.init({
        discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
            "https://people.googleapis.com/$discovery/rest?version=v1",
        ],
        clientId: '674412593540-u39pufgjgtm4ruvq7fb8lc0icu88r8uc.apps.googleusercontent.com',
        scope: 'profile https://www.googleapis.com/auth/spreadsheets',
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }).catch(function(err) {
        console.error("Could not initialize client:", err);
    });
}

function updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    console.log("Signed in");
    if (isSignedIn) {
        makeApiCall();
    }
}

function handleSignInClick(event) {
    // Ideally the button should only show up after gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function getPerson() {
    // Make an API call to the People API, and print the user's given name.
    gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
    }).then(function(response) {
        $("#main").text('Hello, ' + response.result.names[0].givenName);
    }, function(reason) {
        $("#main").text('Error: ' + reason.result.error.message);
    });
}

function getSpreadsheet() {
    // Make an API call to the People API, and print the user's given name.
    var params = {
        spreadsheetId: "1-vXFpYd1Re52zIm-Ih0CjojbklUyhdTxS54wrBL83C4",
        range: "A1",
    };
    gapi.client.sheets.spreadsheets.values.get(params).then(function(response) {
        $("#spreadsheet").text(JSON.stringify(response.result));
    }, function(reason) {
        $("#spreadsheet").text('Error: ' + reason.result.error.message);
    });
}

function makeApiCall() {
    getPerson();
    getSpreadsheet();
}
