import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";

import propTypes from "../propTypes";
import CallStarter from "../dialer/CallStarter";
import CanvasRouter from "../canvas/CanvasRouter";

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

export default class CsvContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldRowIndexMap: null,
            spreadsheetData: null,
        };
        this.onSaveRow = this.onSaveRow.bind(this);
    }

    componentWillMount() {
        this.parseSpreedsheetData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.parseSpreedsheetData(nextProps);
    }

    onSaveRow(rowNumber, csvData) {
        const { onSaveRow } = this.props;
        const { fieldRowIndexMap } = this.state;
        const row = mapVolunteerDataToSpreadsheetRow(csvData, fieldRowIndexMap);
        return onSaveRow(rowNumber + 1, row);
    }

    parseSpreedsheetData(props) {
        const { spreadsheetData } = props;
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

    render() {
        const {
            onResetSpreadsheet, user,
        } = this.props;
        const { spreadsheetData } = this.state;
        if (spreadsheetData === null) {
            return <div>Loading ...</div>;
        }
        return (
            <div>
                <Route
                    path="/call"
                    render={() => (
                        <CallStarter
                            onResetSpreadsheet={onResetSpreadsheet}
                            onSaveRow={this.onSaveRow}
                            spreadsheetData={spreadsheetData}
                            user={user}
                        />
                    )}
                />
                <Route
                    path="/map"
                    render={() => (
                        <CanvasRouter
                            onResetSpreadsheet={onResetSpreadsheet}
                            onSaveRow={this.onSaveRow}
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

CsvContainer.propTypes = {
    onResetSpreadsheet: PropTypes.func.isRequired,
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.spreadsheetData.isRequired,
    user: propTypes.user.isRequired,
};
