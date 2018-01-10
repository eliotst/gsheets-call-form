export default class LoginClient {
    login() {
        gapi.auth2.getAuthInstance().signIn();
    }

    logout() {
        gapi.auth2.getAuthInstance().signOut();
    }

    handleClientLoad() {
        // Loads the client library and the auth2 library together for efficiency.
        // Loading the auth2 library is optional here since `gapi.client.init` function will load
        // it if not already loaded. Loading it upfront can save one network request.
        gapi.load("client:auth2", () => this.initClient());
    }

    initClient() {
        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        gapi.client.init({
            discoveryDocs: [
                "https://sheets.googleapis.com/$discovery/rest?version=v4",
                "https://people.googleapis.com/$discovery/rest?version=v1",
            ],
            clientId: "674412593540-u39pufgjgtm4ruvq7fb8lc0icu88r8uc.apps.googleusercontent.com",
            scope: "profile https://www.googleapis.com/auth/spreadsheets",
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(isLoggedIn => this.setState({ isLoggedIn }));

            // Handle the initial sign-in state.
            this.setState({
                isLoggedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
            });
        }).catch((err) => {
            console.error("Could not initialize client:", err);
        });
    }
}
