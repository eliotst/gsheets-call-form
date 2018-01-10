import PropTypes from "prop-types";
import React from "react";

import Form from "./Form";

const SPREADSHEET_ID = "1-vXFpYd1Re52zIm-Ih0CjojbklUyhdTxS54wrBL83C4";

const fieldRowIndexMap = {
    name: 1,
    phoneNumber: 2,
    city: 4,
    state: 5,
    isMember: 6,
    lastTimeCanvassed: 7,
    contactDate: 9,
    caller: 10,
    contactStatus: 11,
    notes: 12,
    isInterestedInVolunteering: 13,
    interestAndSkills: 14,
    experienceWithLsu: 15,
    willAttendRally: 16,
    willDoAfternoonShift: 17,
    stayInTouch: 18,
};

const mapSpreadsheetRowToVolunteer = (row, results) => {
    const personRow = results[row];
    const fieldNames = Object.keys(fieldRowIndexMap);
    return fieldNames.reduce((acc, fieldName) => {
        const result = acc;
        const fieldIndex = fieldRowIndexMap[fieldName];
        result[fieldName] = personRow[fieldIndex] || "";
        return result;
    }, {});
};

const mapVolunteerDataToSpreadsheetRow = (volunteerData) => {
    const fieldNames = Object.keys(volunteerData);
    const row = Array(fieldNames.length).fill("");
    fieldNames.forEach((fieldName) => {
        const fieldIndex = fieldRowIndexMap[fieldName];
        row[fieldIndex] = volunteerData[fieldName];
    });
    return row;
};

export default class VolunteerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteerData: null,
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        this.buildVolunteer();
    }

    onFieldChange(name, value) {
        const { volunteerData } = this.state;
        volunteerData[name] = value;
        this.setState({
            volunteerData,
        });
    }

    onSave() {
        const { volunteerRow } = this.props;
        const { volunteerData } = this.state;
        const { stop } = this.props;
        const row = mapVolunteerDataToSpreadsheetRow(volunteerData);
        const rowNumber = volunteerRow + 1;
        const range = `L${rowNumber}:S${rowNumber}`;
        const saveStart = fieldRowIndexMap.contactStatus;
        const resource = {
            values: [
                row.slice(saveStart),
            ],
        };
        // TODO: handle errors
        gapi.client.sheets.spreadsheets.values.update({
            range,
            resource,
            spreadsheetId: SPREADSHEET_ID,
            valueInputOption: "USER_ENTERED",
        }).then((response) => {
            const { result } = response;
            console.log(`${result.updatedCells} cells appended.`);
            stop();
        });
    }

    buildVolunteer() {
        const { spreadsheetData, volunteerRow } = this.props;
        const volunteerData = mapSpreadsheetRowToVolunteer(volunteerRow, spreadsheetData);
        this.setState({
            volunteerData,
        });
    }

    render() {
        const { volunteerData } = this.state;
        const { releaseVolunteer } = this.props;
        if (volunteerData === null) {
            return <div>Loading ...</div>;
        }
        return (
            <Form
                onFieldChange={this.onFieldChange}
                onSave={this.onSave}
                releaseVolunteer={releaseVolunteer}
                volunteerData={volunteerData}
            />
        );
    }
}

VolunteerContainer.propTypes = {
    releaseVolunteer: PropTypes.func.isRequired,
    spreadsheetData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    stop: PropTypes.func.isRequired,
    volunteerRow: PropTypes.number.isRequired,
};
