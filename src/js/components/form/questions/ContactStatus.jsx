import React from "react";
import PropTypes from "prop-types";

export default function ContactStatus({ onFieldChange, value }) {
    const onChange = (evt) => {
        onFieldChange("contactStatus", evt.target.value);
    };
    return (
        <div className="input-field col s12">
            <div className="label">Contact Status</div>
            <select
                id="contact-status-field"
                onChange={onChange}
                value={value}
            >
                <option value="">Select ...</option>
                <option value="Contacted">Contacted</option>
                <option value="No Answer">No Answer</option>
                <option value="Left Voicemail">Left Voicemail</option>
                <option value="Bad Number">Bad Number</option>
                <option value="Do Not Call">Do Not Call</option>
            </select>
        </div>
    );
}

ContactStatus.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
