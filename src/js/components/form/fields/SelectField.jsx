import React from "react";
import PropTypes from "prop-types";

import propTypes from "../../propTypes";

export default function SelectField({ formFieldConfig, onFieldChange, value }) {
    const onChange = (evt) => {
        onFieldChange(formFieldConfig.name, evt.target.value);
    };
    const fieldId = formFieldConfig.displayName.replace(" ", "-");
    const options = formFieldConfig.options.map(option =>
        <option key={option} value={option}>{option}</option>);
    options.splice(0, 0, <option key="" value="">Select ...</option>);
    return (
        <div className="input-field col s12">
            <div className="label">{formFieldConfig.displayName}</div>
            <select
                id={fieldId}
                onChange={onChange}
                value={value}
            >
                {options}
            </select>
        </div>
    );
}

SelectField.propTypes = {
    formFieldConfig: propTypes.formFieldConfig.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
