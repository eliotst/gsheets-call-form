import React from "react";

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
        return (
            <div>
                <Page
                    isLoggedIn={isLoggedIn}
                    onLoginStateChange={this.onLoginStateChange}
                    onUserChange={this.onUserChange}
                    user={user}
                />
            </div>
        );
    }
}
