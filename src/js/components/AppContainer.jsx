import React from "react";

import App from "./App";

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parameters: {},
        };
    }

    componentWillMount() {
        const urlParameters = new URLSearchParams(window.location.search.slice(1));
        const globalConfig = window.callSheet || {};
        this.setState({
            parameters: {
                spreadsheetId: urlParameters.get("spreadsheetId") || globalConfig.spreadsheetId,
            },
        });
    }

    render() {
        const { parameters } = this.state;
        return <App parameters={parameters} />;
    }
}
