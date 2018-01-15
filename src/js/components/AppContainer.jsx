import React from "react";

import App from "./App";

const DEFAULT_SPREADSHEET_ID = "1-vXFpYd1Re52zIm-Ih0CjojbklUyhdTxS54wrBL83C4";

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parameters: {},
        };
    }

    componentWillMount() {
        const urlParameters = new URLSearchParams(window.location.search.slice(1));
        this.setState({
            parameters: {
                spreadsheetId: urlParameters.get("spreadsheetId") || DEFAULT_SPREADSHEET_ID,
            },
        });
    }

    render() {
        const { parameters } = this.state;
        return <App parameters={parameters} />;
    }
}
