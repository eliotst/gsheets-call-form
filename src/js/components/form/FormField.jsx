import Materialize from "materialize-css";
import React from "react";
import PropTypes from "prop-types";

export default function FormField({
    displayName,
    name,
    onFieldChange,
    value,
}) {
    const fieldId = `form-field-${name}`;
    const onChange = (event) => {
        onFieldChange(name, event.target.value);
        Materialize.updateTextFields();
    };
    return (
        <div className="input-field col s12">
            <input
                className="validate"
                id={fieldId}
                onChange={onChange}
                type="text"
                value={value}
            />
            <label htmlFor={fieldId}>{displayName}</label>
        </div>
    );
}

FormField.propTypes = {
    displayName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
