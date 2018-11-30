import Materialize from "materialize-css";
import PropTypes from "prop-types";
import React from "react";

import propTypes from "../../propTypes";

export default function TextField({
    formFieldConfig, onFieldChange, readonly, value,
}) {
    const onChange = (event) => {
        onFieldChange(formFieldConfig.name, event.target.value);
        Materialize.updateTextFields();
    };
    const fieldId = formFieldConfig.displayName.replace(" ", "-");
    let control;
    if (readonly) {
        control = <div className="value">{value}</div>;
    } else if (formFieldConfig.type === "readonly") {
        control = (
            <input
                className="form-control"
                id={fieldId}
                onChange={onChange}
                value={value}
            />);
    } else {
        control = (
            <textarea
                className="form-control"
                id={fieldId}
                onChange={onChange}
                value={value}
            />);
    }
    return (
        <div className="form-group">
            <label htmlFor={fieldId}>
                {formFieldConfig.displayName}
            </label>
            {control}
        </div>
    );
}

TextField.propTypes = {
    formFieldConfig: propTypes.formFieldConfig.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool,
    value: PropTypes.string.isRequired,
};

TextField.defaultProps = {
    readonly: false,
};
