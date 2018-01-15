import PropTypes from "prop-types";
import React from "react";

import propTypes from "./propTypes";
import Page from "./Page";

require("../../stylesheets/app.scss");

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
        this.onLoginStateChange = this.onLoginStateChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
    }

    onLoginStateChange(loginState) {
        const { isLoggedIn } = loginState;
        this.setState({ isLoggedIn });
    }

    onUserChange(user) {
        this.setState({ user });
    }

    render() {
        const { isLoggedIn, user } = this.state;
        const { parameters } = this.props;
        return (
            <div>
                <Page
                    isLoggedIn={isLoggedIn}
                    onLoginStateChange={this.onLoginStateChange}
                    onUserChange={this.onUserChange}
                    parameters={parameters}
                    user={user}
                />
            </div>
        );
    }
}

App.propTypes = {
    parameters: propTypes.appParameters.isRequired,
};
