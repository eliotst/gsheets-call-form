import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import SelectField from "./fields/SelectField";
import TextField from "./fields/TextField";

const buildQuestion = (formFieldConfig, onFieldChange, volunteerData) => {
    const fieldName = formFieldConfig.name;
    const value = volunteerData[fieldName];
    switch (formFieldConfig.type) {
    case "select":
        return (
            <SelectField
                formFieldConfig={formFieldConfig}
                key={formFieldConfig.name}
                onFieldChange={onFieldChange}
                value={value}
            />);
    case "text":
        return (
            <TextField
                formFieldConfig={formFieldConfig}
                key={formFieldConfig.name}
                onFieldChange={onFieldChange}
                value={value}
            />);
    default:
        return null;
    }
};

export default function FormFieldGroup({ formConfig, onFieldChange, volunteerData }) {
    const formFields = formConfig.filter(config => config.type !== "readonly");
    const questions = formFields.map(formFieldConfig =>
        buildQuestion(formFieldConfig, onFieldChange, volunteerData));
    return (
        <div className="row form-question-group">
            {questions}
        </div>
    );
}

FormFieldGroup.propTypes = {
    formConfig: propTypes.formConfig.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    volunteerData: propTypes.volunteerData.isRequired, // eslint-disable-line react/no-typos
};
