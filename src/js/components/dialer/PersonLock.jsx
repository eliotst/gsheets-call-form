import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";

export default class PersonLock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
        this.releasePerson = this.releasePerson.bind(this);
    }

    componentDidMount() {
        this.lockPerson();
    }

    componentWillUnmount() {
        this.releasePerson(false);
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
            if (values[personRow]["Call Lock #"] !== lockValue.toString()) {
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
            personRow, stop,
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
        const newProps = { releasePerson: this.releasePerson, ...this.props };
        return (
            <div>
                {React.cloneElement(this.props.children, newProps)}
            </div>
        );
    }
}

PersonLock.propTypes = {
    children: PropTypes.element.isRequired,
    onSaveRow: PropTypes.func.isRequired,
    personRow: PropTypes.number.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
    user: propTypes.user.isRequired,
};
