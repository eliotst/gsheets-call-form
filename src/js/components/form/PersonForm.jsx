import PropTypes from "prop-types";
import React from "react";

import FormHeader from "../form/FormHeader";
import FormFieldGroup from "../form/FormFieldGroup";
import propTypes from "../propTypes";

const validate = (person) => {
    const errors = [];
    if (person.contactStatus === "") {
        errors.push("You must provide a Contact Status.");
    }
    return errors;
};

export default class PersonContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            newPerson: false,
            personData: null,
            validationErrors: [],
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        this.buildPerson();
    }

    onFieldChange(name, value) {
        const { personData } = this.state;
        personData[name] = value;
        this.setState({
            validationErrors: [],
            personData,
        });
    }

    onSave() {
        const { onSaveRow, personRow, stop } = this.props;
        const { personData } = this.state;
        const row = personData;
        const validationErrors = validate(personData);
        if (validationErrors.length !== 0) {
            this.setState({ validationErrors });
            return Promise.resolve();
        }
        return onSaveRow(personRow, row).then(() => {
            stop();
        }).catch((reason) => {
            if (reason.result !== undefined) {
                this.setState({
                    error: reason.result.error.message,
                });
            }
        });
    }

    buildPerson() {
        const { spreadsheetData, personRow } = this.props;
        let personData = spreadsheetData.values[personRow];
        if (personData === undefined) {
            personData = {};
        }
        this.setState({
            newPerson: true,
            personData,
        });
    }

    render() {
        const {
            error, validationErrors, newPerson, personData,
        } = this.state;
        const {
            formConfig, releasePerson, stop,
        } = this.props;
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
        if (personData === null) {
            return <div>Loading ...</div>;
        }
        const errorElements = validationErrors.map(message =>
            <div className="message">{message}</div>);
        return (
            <div className="person-form container">
                <FormHeader
                    formConfig={formConfig}
                    newPerson={newPerson}
                    onFieldChange={this.onFieldChange}
                    personData={personData}
                />
                <FormFieldGroup
                    formConfig={formConfig}
                    onFieldChange={this.onFieldChange}
                    personData={personData}
                />
                <div className="errors">{errorElements}</div>
                <div className="form-buttons">
                    <button className="btn" onClick={releasePerson}>Cancel</button>
                    <button className="btn btn-primary" onClick={this.onSave}>Save</button>
                </div>
            </div>
        );
    }
}

PersonContainer.propTypes = {
    formConfig: propTypes.formConfig.isRequired,
    onSaveRow: PropTypes.func.isRequired,
    releasePerson: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
    personRow: PropTypes.number.isRequired,
};
