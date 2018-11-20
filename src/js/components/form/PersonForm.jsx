import PropTypes from "prop-types";
import React from "react";

import FormHeader from "../form/FormHeader";
import FormFieldGroup from "../form/FormFieldGroup";
import propTypes from "../propTypes";

const validate = (volunteer) => {
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
        const { onSaveRow, stop } = this.props;
        const { volunteerData } = this.state;
        const row = volunteerData;
        const validationErrors = validate(volunteerData);
        if (validationErrors.length !== 0) {
            this.setState({ validationErrors });
            return Promise.resolve();
        }
        return onSaveRow(row).then(() => {
            stop();
        }).catch((reason) => {
            if (reason.result !== undefined) {
                this.setState({
                    error: reason.result.error.message,
                });
            }
        });
    }

    buildVolunteer() {
        const { spreadsheetData, volunteerRow } = this.props;
        const volunteerData = spreadsheetData.values[volunteerRow];
        this.setState({
            volunteerData,
        });
    }

    render() {
        const { error, validationErrors, volunteerData } = this.state;
        const { formConfig, releaseVolunteer, stop } = this.props;
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
        const errorElements = validationErrors.map(message =>
            <div className="message">{message}</div>);
        return (
            <div>
                <FormHeader formConfig={formConfig} volunteerData={volunteerData} />
                <FormFieldGroup
                    formConfig={formConfig}
                    onFieldChange={this.onFieldChange}
                    volunteerData={volunteerData}
                />
                <div className="errors">{errorElements}</div>
                <div className="form-buttons">
                    <button className="btn" onClick={releaseVolunteer}>Cancel</button>
                    <button className="btn" onClick={this.onSave}>Save</button>
                </div>
            </div>
        );
    }
}

VolunteerContainer.propTypes = {
    formConfig: propTypes.formConfig.isRequired,
    onSaveRow: PropTypes.func.isRequired,
    releaseVolunteer: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
    volunteerRow: PropTypes.number.isRequired,
};
