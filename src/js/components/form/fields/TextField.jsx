import Materialize from "materialize-css";
import PropTypes from "prop-types";
import React from "react";

import propTypes from "../../propTypes";

export default function TextField({ formFieldConfig, onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange(formFieldConfig.name, event.target.value);
        Materialize.updateTextFields();
    };
    const fieldId = formFieldConfig.displayName.replace(" ", "-");
    return (
        <div className="input-field col s12">
            <div className="label">
                {formFieldConfig.displayName}
            </div>
            <textarea
                className="materialize-textarea"
                id={fieldId}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

TextField.propTypes = {
    formFieldConfig: propTypes.formFieldConfig.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
