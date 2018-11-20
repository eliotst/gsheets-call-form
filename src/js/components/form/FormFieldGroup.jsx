import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import SelectField from "./fields/SelectField";
import TextField from "./fields/TextField";

const buildQuestion = (formFieldConfig, onFieldChange, personData) => {
    const fieldName = formFieldConfig.name;
    const value = personData[fieldName];
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

export default function FormFieldGroup({ formConfig, onFieldChange, personData }) {
    const formFields = formConfig.filter(config => config.type !== "readonly");
    const questions = formFields.map(formFieldConfig =>
        buildQuestion(formFieldConfig, onFieldChange, personData));
    return (
        <div className="row form-question-group">
            {questions}
        </div>
    );
}

FormFieldGroup.propTypes = {
    formConfig: propTypes.formConfig.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    personData: propTypes.personData.isRequired, // eslint-disable-line react/no-typos
};
