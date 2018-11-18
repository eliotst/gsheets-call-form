import PropTypes from "prop-types";
import React from "react";

import ConfigContainer from "../spreadsheet/ConfigContainer";
import propTypes from "../propTypes";

const pickRandom = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

export default class VolunteerPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            callDate: null,
            caller: null,
            error: null,
            lockValue: null,
            volunteerRow: null,
        };
        this.releaseVolunteer = this.releaseVolunteer.bind(this);
        this.onSaveRow = this.onSaveRow.bind(this);
    }

    componentDidMount() {
        this.pickVolunteer();
    }

    onSaveRow(rowData) {
        const { onSaveRow } = this.props;
        const {
            callDate, caller, lockValue, volunteerRow,
        } = this.state;
        const row = Object.assign({}, rowData);
        row["Call Lock #"] = lockValue.toString();
        row["Caller *"] = caller;
        row["Contact Date *"] = callDate;
        return onSaveRow(volunteerRow, row);
    }

    pickVolunteer() {
        const possibleRows = [];
        const {
            onSaveRow, spreadsheetData, stop, user,
        } = this.props;
        const caller = user.id;
        spreadsheetData.values.forEach((row, index) => {
            const lockValue = row["Call Lock #"];
            const phoneNumber = row["Phone Number *"];
            if ((lockValue === undefined || lockValue === "") &&
                phoneNumber !== undefined && phoneNumber.match(/\d/)) {
                possibleRows.push(index);
            }
        });
        if (possibleRows.length === 0) {
            return this.setState({
                error: "There is no one left to call.",
            });
        }
        const rowNumber = pickRandom(possibleRows);
        const lockValue = Math.ceil(Math.random() * 1000000);
        const rowData = spreadsheetData.values[rowNumber];
        rowData["Call Lock #"] = lockValue.toString();
        rowData["Caller *"] = caller;
        rowData["Contact Date *"] = new Date().toISOString();
        return onSaveRow(rowNumber, rowData).then((response) => {
            // TODO: Set state now, then refresh, then check incoming spreadsheet data vs. state
            const { result } = response;
            const { values } = result;
            // TODO: don't hardcode this
            if (values[rowNumber + 1][12] === lockValue.toString()) {
                this.setState({
                    callDate: new Date(),
                    caller,
                    lockValue,
                    volunteerRow: rowNumber,
                });
            } else {
                stop();
            }
        });
    }

    releaseVolunteer() {
        const { volunteerRow } = this.state;
        const { onSaveRow, spreadsheetData, stop } = this.props;
        const rowData = spreadsheetData.values[volunteerRow];
        rowData["Call Lock #"] = "";
        rowData["Caller *"] = "";
        rowData["Contact Date *"] = "";
        onSaveRow(volunteerRow, rowData).then(() => {
            stop();
        }).catch((reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    render() {
        const {
            spreadsheetData, stop,
        } = this.props;
        const { error, volunteerRow } = this.state;
        if (error !== null) {
            return (
                <div>
                    <div>
                        {error}
                    </div>
                    <div>
                        <button className="btn" onClick={stop}>Cancel</button>
                    </div>
                </div>
            );
        }
        if (volunteerRow === null) {
            return <div>Loading ...</div>;
        }
        return (
            <ConfigContainer
                onSaveRow={this.onSaveRow}
                releaseVolunteer={this.releaseVolunteer}
                spreadsheetData={spreadsheetData}
                stop={stop}
                volunteerRow={volunteerRow}
            />
        );
    }
}

VolunteerPicker.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
    user: propTypes.user.isRequired,
};
