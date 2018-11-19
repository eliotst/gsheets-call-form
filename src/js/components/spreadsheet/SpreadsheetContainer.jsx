import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";

import propTypes from "../propTypes";
import CallStarter from "../dialer/CallStarter";
import CanvasRouter from "../canvas/CanvasRouter";

const RANGE = "A1:AA600";

const buildFieldRowIndexMap = (header) => {
    const result = {};
    header.forEach((key, index) => {
        result[key] = index;
    });
    return result;
};

const mapSpreadsheetRowToVolunteer = (row, fieldRowIndexMap) => {
    const fieldNames = Object.keys(fieldRowIndexMap);
    return fieldNames.reduce((acc, fieldName) => {
        const result = acc;
        const fieldIndex = fieldRowIndexMap[fieldName];
        result[fieldName] = row[fieldIndex] || "";
        return result;
    }, {});
};

const mapVolunteerDataToSpreadsheetRow = (volunteerData, fieldRowIndexMap) => {
    const fieldNames = Object.keys(fieldRowIndexMap);
    const row = Array(fieldNames.length).fill("");
    fieldNames.forEach((fieldName) => {
        const fieldIndex = fieldRowIndexMap[fieldName];
        row[fieldIndex] = volunteerData[fieldName];
    });
    return row;
};

export default class SpreadsheetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            fieldRowIndexMap: null,
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
        return gapi.client.sheets.spreadsheets.values.get(params).then((response) => {
            const { result } = response;
            const { values } = result;
            const fieldRowIndexMap = buildFieldRowIndexMap(values[0]);
            const csvValues = values.slice(1).map(row =>
                mapSpreadsheetRowToVolunteer(row, fieldRowIndexMap));
            const spreadsheetData = {
                keys: values[0],
                spreadsheetId,
                values: csvValues,
            };
            this.setState({
                error: null,
                fieldRowIndexMap,
                spreadsheetData,
            });
            return {
                spreadsheetData,
            };
        }, (reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    parseSpreedsheetData(spreadsheetData) {
        const { spreadsheetId, values } = spreadsheetData;
        const fieldRowIndexMap = buildFieldRowIndexMap(values[0]);
        // TODO: add Call Lock, Caller, Contact Date if don't already exist
        const csvValues = values.slice(1).map(row =>
            mapSpreadsheetRowToVolunteer(row, fieldRowIndexMap));
        this.setState({
            fieldRowIndexMap,
            spreadsheetData: {
                keys: values[0],
                spreadsheetId,
                values: csvValues,
            },
        });
    }

    saveRow(rowNumber, csvData) {
        const { parameters } = this.props;
        const { spreadsheetId } = parameters;
        const { fieldRowIndexMap } = this.state;
        const rowData = mapVolunteerDataToSpreadsheetRow(csvData, fieldRowIndexMap);
        const saveStart = 8;
        const resource = {
            values: [
                rowData.slice(saveStart),
            ],
        };
        // TODO: don't hardcode I:S
        const range = `I${rowNumber + 2}:W${rowNumber + 2}`;
        return new Promise((resolve) => {
            gapi.client.sheets.spreadsheets.values.update({
                range,
                resource,
                spreadsheetId,
                valueInputOption: "USER_ENTERED",
            }).then(() => null, (reason) => {
                this.setState({
                    error: reason.result.error.message,
                });
            }).then(() => this.getSpreadsheetData()).then(result => resolve(result));
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
            <div>
                <Route
                    path="/call"
                    render={() => (
                        <CallStarter
                            onResetSpreadsheet={this.getSpreadsheetData}
                            onSaveRow={this.saveRow}
                            spreadsheetData={spreadsheetData}
                            user={user}
                        />
                    )}
                />
                <Route
                    path="/map"
                    render={() => (
                        <CanvasRouter
                            onResetSpreadsheet={this.getSpreadsheetData}
                            onSaveRow={this.saveRow}
                            spreadsheetData={spreadsheetData}
                        />
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div>Default</div>
                    )}
                />
            </div>
        );
    }
}

SpreadsheetContainer.propTypes = {
    parameters: propTypes.appParameters.isRequired,
    user: propTypes.user.isRequired,
};
