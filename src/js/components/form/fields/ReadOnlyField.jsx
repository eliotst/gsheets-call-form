import React from "react";
import PropTypes from "prop-types";

export default function ReadOnlyField({
    displayName,
    value,
}) {
    return (
        <div className="read-only-field">
            <label>{displayName}</label>
        </div>
    );
}

ReadOnlyField.propTypes = {
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

