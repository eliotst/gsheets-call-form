import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import VolunteerContainer from "./VolunteerContainer";

const SPREADSHEET_ID = "1-vXFpYd1Re52zIm-Ih0CjojbklUyhdTxS54wrBL83C4";
const CALL_LOCK_COLUMN = 8;
const PHONE_NUMBER_COLUMN = 2;

const pickRandom = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

const setLock = (rowNumber, lockValue, caller) => {
    const range = `I${rowNumber + 1}:K${rowNumber + 1}`;
    const callDate = lockValue === "" ? "" : new Date().toISOString();
    const resource = {
        values: [[lockValue, callDate, caller]],
    };
    return gapi.client.sheets.spreadsheets.values.update({
        range,
        resource,
        spreadsheetId: SPREADSHEET_ID,
        valueInputOption: "USER_ENTERED",
    });
};

const checkLock = (rowNumber) => {
    const range = `I${rowNumber + 1}`;
    const params = {
        range,
        spreadsheetId: SPREADSHEET_ID,
    };
    return gapi.client.sheets.spreadsheets.values.get(params);
};

export default class VolunteerPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const caller = user.name;
        spreadsheetData.forEach((row, index) => {
            const lockValue = row[CALL_LOCK_COLUMN];
            const phoneNumber = row[PHONE_NUMBER_COLUMN];
            if ((lockValue === undefined || lockValue === "") &&
                phoneNumber !== undefined && phoneNumber.match(/\d/)) {
                possibleRows.push(index);
            }
        });
        const rowNumber = pickRandom(possibleRows);
        const lockValue = Math.ceil(Math.random() * 1000000);
        setLock(rowNumber, lockValue.toString(), caller).then(() => {
            checkLock(rowNumber).then((response) => {
                const { result } = response;
                const { values } = result;
                if (values[0][0] === lockValue.toString()) {
                    this.setState({
                        volunteerRow: rowNumber,
                    });
                } else {
                    stop();
                }
            });
        });
    }

    releaseVolunteer() {
        const { volunteerRow } = this.state;
        const { stop } = this.props;
        setLock(volunteerRow, "", "").then(() => {
            stop();
        });
    }

    render() {
        const { onResetSpreadsheet, spreadsheetData, stop } = this.props;
        const { volunteerRow } = this.state;
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
    spreadsheetData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    stop: PropTypes.func.isRequired,
    user: propTypes.user,
};
