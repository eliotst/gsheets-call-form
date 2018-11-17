import PropTypes from "prop-types";
import React from "react";

import PersonFormConfig from "../form/PersonFormConfig";
import propTypes from "../propTypes";

export default class PersonLock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            callDate: null,
            caller: null,
            error: null,
            lockValue: null,
        };
        this.releasePerson = this.releasePerson.bind(this);
        this.onSaveRow = this.onSaveRow.bind(this);
    }

    componentDidMount() {
        this.lockPerson();
    }

    componentWillUnmount() {
        this.releasePerson(false);
    }

    onSaveRow(rowData) {
        const { onSaveRow, personRow } = this.props;
        const {
            callDate, caller, lockValue,
        } = this.state;
        const row = Object.assign({}, rowData);
        row["Call Lock #"] = lockValue.toString();
        row["Caller *"] = caller;
        row["Contact Date *"] = callDate;
        return onSaveRow(personRow, row);
    }

    lockPerson() {
        const {
            onSaveRow, personRow, spreadsheetData, user,
        } = this.props;
        const caller = user.id;
        const lockValue = Math.ceil(Math.random() * 1000000);
        const rowData = spreadsheetData.values[personRow];
        if (rowData["Call Lock #"] !== "") {
            return this.setState({
                error: "Person is being called by someone else.",
            });
        }
        rowData["Call Lock #"] = lockValue.toString();
        rowData["Caller *"] = caller;
        rowData["Contact Date *"] = new Date().toISOString();
        return onSaveRow(personRow, rowData).then((response) => {
            const { values } = response.spreadsheetData;
            if (values[personRow]["Call Lock #"] === lockValue.toString()) {
                this.setState({
                    callDate: new Date(),
                    caller,
                    lockValue,
                });
            } else {
                return this.setState({
                    error: "Something happened.",
                });
            }
        });
    }

    releasePerson() {
        const {
            onSaveRow, personRow, spreadsheetData, stop,
        } = this.props;
        const rowData = spreadsheetData.values[personRow];
        rowData["Call Lock #"] = "";
        onSaveRow(personRow, rowData).then(() => {
            stop();
        }).catch((reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    render() {
        const {
            personRow, spreadsheetData, stop,
        } = this.props;
        const { error } = this.state;
        if (error !== null) {
            return (
                <div className="person-lock">
                    <div className="error">
                        {error}
                    </div>
                    <div>
                        <button className="btn" onClick={stop}>Go Back</button>
                    </div>
                </div>
            );
        }
        if (personRow === null) {
            return <div>Loading ...</div>;
        }
        return (
            <PersonFormConfig
                onSaveRow={this.onSaveRow}
                releasePerson={this.releasePerson}
                spreadsheetData={spreadsheetData}
                stop={stop}
                personRow={personRow}
            />
        );
    }
}

PersonLock.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    personRow: PropTypes.number.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
    user: propTypes.user.isRequired,
};
