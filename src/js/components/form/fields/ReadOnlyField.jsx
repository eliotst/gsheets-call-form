import React from "react";
import PropTypes from "prop-types";

export default function ReadOnlyField({
    displayName,
    value,
}) {
    return (
        <div className="col s12 m6 display-field">
            <label>{displayName}</label>
            <div className="value">{value}</div>
        </div>
    );
}

ReadOnlyField.propTypes = {
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

