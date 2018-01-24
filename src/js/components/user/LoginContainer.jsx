import PropTypes from "prop-types";
import React from "react";

import LoginForm from "./LoginForm";
import propTypes from "../propTypes";
import UserContainer from "./UserContainer";

const clientId = OAUTH_CLIENT_ID || "674412593540-cm4if09mdfebk5e6j4enf0skdgt6t483.apps.googleusercontent.com";

export default class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    componentDidMount() {
        this.handleClientLoad();
    }

    handleClientLoad() {
        // Loads the client library and the auth2 library together for efficiency.
        // Loading the auth2 library is optional here since `gapi.client.init` function will load
        // it if not already loaded. Loading it upfront can save one network request.
        gapi.load("client:auth2", () => this.initClient());
    }

    initClient() {
        const { onLoginStateChange } = this.props;
        // Initialize the client with API key and People API, and initialize OAuth with an
        // OAuth 2.0 client ID and scopes (space delimited string) to request access.
        gapi.client.init({
            clientId,
            discoveryDocs: [
                "https://sheets.googleapis.com/$discovery/rest?version=v4",
                "https://people.googleapis.com/$discovery/rest?version=v1",
            ],
            scope: "profile https://www.googleapis.com/auth/spreadsheets",
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2
                .getAuthInstance()
                .isSignedIn
                .listen(isLoggedIn => onLoginStateChange({ isLoggedIn }));

            // Handle the initial sign-in state.
            onLoginStateChange({
                isLoggedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
            });
        }).catch((error) => {
            this.setState({ error: error.details });
        });
    }

    render() {
        const {
            isLoggedIn, onUserChange, parameters, user,
        } = this.props;
        const { error } = this.state;
        if (error !== null) {
            return <div>{error}</div>;
        }
        if (!isLoggedIn) {
            return <LoginForm />;
        }
        return (
            <div>
                <UserContainer onUserChange={onUserChange} parameters={parameters} user={user} />
            </div>
        );
    }
}

LoginContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLoginStateChange: PropTypes.func.isRequired,
    onUserChange: PropTypes.func.isRequired,
    parameters: propTypes.appParameters.isRequired,
    user: propTypes.user,
};

LoginContainer.defaultProps = {
    user: null,
};
