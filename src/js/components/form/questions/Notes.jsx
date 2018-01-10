import Materialize from "materialize-css";
import PropTypes from "prop-types";
import React from "react";

export default function Notes({ onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange("notes", event.target.value);
        Materialize.updateTextFields();
    };
    return (
        <div className="input-field col s12">
            <div className="label">Notes</div>
            <textarea
                className="materialize-textarea"
                id="notes-field"
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

Notes.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
