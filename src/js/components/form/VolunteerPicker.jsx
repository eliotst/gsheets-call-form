import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import VolunteerContainer from "./VolunteerContainer";

const CALL_LOCK_COLUMN = 8;
const PHONE_NUMBER_COLUMN = 2;

const pickRandom = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

const setLock = (spreadsheetId, rowNumber, lockValue, caller) => {
    const range = `I${rowNumber + 1}:K${rowNumber + 1}`;
    const callDate = lockValue === "" ? "" : new Date().toISOString();
    const resource = {
        values: [[lockValue, callDate, caller]],
    };
    return gapi.client.sheets.spreadsheets.values.update({
        range,
        resource,
        spreadsheetId,
        valueInputOption: "USER_ENTERED",
    });
};

const checkLock = (spreadsheetId, rowNumber) => {
    const range = `I${rowNumber + 1}`;
    const params = {
        range,
        spreadsheetId,
    };
    return gapi.client.sheets.spreadsheets.values.get(params);
};

export default class VolunteerPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            volunteerRow: null,
        };
        this.releaseVolunteer = this.releaseVolunteer.bind(this);
    }

    componentDidMount() {
        this.pickVolunteer();
    }

    pickVolunteer() {
        const possibleRows = [];
        const { spreadsheetData, stop, user } = this.props;
        const { spreadsheetId } = spreadsheetData;
        const caller = user.name;
        spreadsheetData.values.forEach((row, index) => {
            const lockValue = row[CALL_LOCK_COLUMN];
            const phoneNumber = row[PHONE_NUMBER_COLUMN];
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
        return setLock(spreadsheetId, rowNumber, lockValue.toString(), caller).then(() => {
            checkLock(spreadsheetId, rowNumber).then((response) => {
                const { result } = response;
                const { values } = result;
                if (values[0][0] === lockValue.toString()) {
                    this.setState({
                        volunteerRow: rowNumber,
                    });
                } else {
                    stop();
                }
            }).catch((reason) => {
                this.setState({
                    error: reason.result.error.message,
                });
            });
        });
    }

    releaseVolunteer() {
        const { volunteerRow } = this.state;
        const { spreadsheetData, stop } = this.props;
        const { spreadsheetId } = spreadsheetData;
        setLock(spreadsheetId, volunteerRow, "", "").then(() => {
            stop();
        }).catch((reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    render() {
        const { onResetSpreadsheet, spreadsheetData, stop } = this.props;
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
            <VolunteerContainer
                onResetSpreadsheet={onResetSpreadsheet}
                releaseVolunteer={this.releaseVolunteer}
                spreadsheetData={spreadsheetData}
                stop={stop}
                volunteerRow={volunteerRow}
            />
        );
    }
}

VolunteerPicker.propTypes = {
    onResetSpreadsheet: PropTypes.func.isRequired,
    spreadsheetData: propTypes.spreadsheetData.isRequired,
    stop: PropTypes.func.isRequired,
    user: propTypes.user,
};
