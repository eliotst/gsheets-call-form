import PropTypes from "prop-types";
import React from "react";

import Form from "./Form";
import propTypes from "../propTypes";

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

function validate(volunteer) {
    const errors = [];
    if (volunteer.contactStatus === "") {
        errors.push("You must provide a Contact Status.");
    }
    return errors;
};

export default class VolunteerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            validationErrors: [],
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
            validationErrors: [],
            volunteerData,
        });
    }

    onSave() {
        const { spreadsheetData, volunteerRow } = this.props;
        const { spreadsheetId } = spreadsheetData;
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
        const validationErrors = validate(volunteerData);
        if (validationErrors.length !== 0) {
            this.setState({ validationErrors });
            return;
        }
        gapi.client.sheets.spreadsheets.values.update({
            range,
            resource,
            spreadsheetId,
            valueInputOption: "USER_ENTERED",
        }).then(() => {
            stop();
        }, (reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    buildVolunteer() {
        const { spreadsheetData, volunteerRow } = this.props;
        const volunteerData = mapSpreadsheetRowToVolunteer(volunteerRow, spreadsheetData.values);
        this.setState({
            volunteerData,
        });
    }

    render() {
        const { error, validationErrors, volunteerData } = this.state;
        const { releaseVolunteer, stop } = this.props;
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
        if (volunteerData === null) {
            return <div>Loading ...</div>;
        }
        return (
            <Form
                errors={validationErrors}
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
    spreadsheetData: propTypes.spreadsheetData.isRequired,
    stop: PropTypes.func.isRequired,
    volunteerRow: PropTypes.number.isRequired,
};
