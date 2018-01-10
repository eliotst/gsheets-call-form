import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import VolunteerPicker from "./VolunteerPicker";

const SPREADSHEET_ID = "1-vXFpYd1Re52zIm-Ih0CjojbklUyhdTxS54wrBL83C4";
const RANGE = "A1:AA600";

export default class SpreadsheetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            spreadsheetData: null,
        };
        this.getSpreadsheetData = this.getSpreadsheetData.bind(this);
    }

    componentDidMount() {
        this.getSpreadsheetData();
    }

    getSpreadsheetData() {
        // Make an API call to the People API, and print the user's given name.
        const params = {
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        };
        gapi.client.sheets.spreadsheets.values.get(params).then((response) => {
            const { result } = response;
            const { values } = result;
            this.setState({
                error: null,
                spreadsheetData: values,
            });
        }, (reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    render() {
        const { error, spreadsheetData } = this.state;
        const { stop, user } = this.props;
        if (error !== null) {
            return <div>{error}</div>;
        }
        if (spreadsheetData === null) {
            return <div>Loading ...</div>;
        }
        return (
            <VolunteerPicker
                spreadsheetData={spreadsheetData}
                onResetSpreadsheet={this.getSpreadsheetData}
                stop={stop}
                user={user}
            />
        );
    }
}

SpreadsheetContainer.propTypes = {
    stop: PropTypes.func.isRequired,
    user: propTypes.user,
};
