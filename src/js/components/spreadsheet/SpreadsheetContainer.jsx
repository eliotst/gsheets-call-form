import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import CsvContainer from "./CsvContainer";

const RANGE = "A1:AA600";

export default class SpreadsheetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            spreadsheetData: null,
        };
        this.getSpreadsheetData = this.getSpreadsheetData.bind(this);
        this.saveRow = this.saveRow.bind(this);
    }

    componentDidMount() {
        this.getSpreadsheetData();
    }

    getSpreadsheetData() {
        const { parameters } = this.props;
        const { spreadsheetId } = parameters;
        // Make an API call to the People API, and print the user's given name.
        const params = {
            spreadsheetId,
            range: RANGE,
        };
        gapi.client.sheets.spreadsheets.values.get(params).then((response) => {
            const { result } = response;
            const { values } = result;
            this.setState({
                error: null,
                spreadsheetData: {
                    spreadsheetId,
                    values,
                },
            });
        }, (reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    saveRow(rowNumber, rowData) {
        const { parameters } = this.props;
        const { spreadsheetId } = parameters;
        const saveStart = 8;
        const resource = {
            values: [
                rowData.slice(saveStart),
            ],
        };
        // TODO: don't hardcode I:S
        const range = `I${rowNumber + 1}:T${rowNumber + 1}`;
        return new Promise((resolve) => {
            gapi.client.sheets.spreadsheets.values.update({
                range,
                resource,
                spreadsheetId,
                valueInputOption: "USER_ENTERED",
            }).then(() => resolve(), (reason) => {
                this.setState({
                    error: reason.result.error.message,
                });
            });
        });
    }

    render() {
        const { error, spreadsheetData } = this.state;
        const { user } = this.props;
        if (error !== null) {
            return <div>{error}</div>;
        }
        if (spreadsheetData === null) {
            return <div>Loading ...</div>;
        }
        return (
            <CsvContainer
                spreadsheetData={spreadsheetData}
                onResetSpreadsheet={this.getSpreadsheetData}
                onSaveRow={this.saveRow}
                user={user}
            />
        );
    }
}

SpreadsheetContainer.propTypes = {
    parameters: propTypes.appParameters.isRequired,
    user: propTypes.user.isRequired,
};
