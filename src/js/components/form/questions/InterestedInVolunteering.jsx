import PropTypes from "prop-types";
import React from "react";

export default function InterestedInVolunteering({ onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange("isInterestedInVolunteering", event.target.value);
    };
    return (
        <div className="input-field col s12">
            <div className="label">Interested in Volunteering?</div>
            <select
                id="interested-in-volunteering-field"
                onChange={onChange}
                value={value}
            >
                <option value="">Select ...</option>
                <option value="Yes">Yes</option>
                <option value="Maybe">Maybe</option>
                <option value="No">No</option>
            </select>
        </div>
    );
}

InterestedInVolunteering.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
