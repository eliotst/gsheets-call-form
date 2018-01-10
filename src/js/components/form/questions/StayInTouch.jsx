import React from "react";
import PropTypes from "prop-types";

export default function StayInTouch({ onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange("stayInTouch", event.target.value);
    };
    return (
        <div className="input-field col s12">
            <div className="label">
                If they can't sign up to canvass, do they want to stay in touch about future opportunities?
            </div>
            <select
                id="can-stay-in-touch-field"
                onChange={onChange}
                value={value}
            >
                <option value="">Select ...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </div>
    );
}

StayInTouch.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
