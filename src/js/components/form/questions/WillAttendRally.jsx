import React from "react";
import PropTypes from "prop-types";

export default function WillAttendRally({ onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange("willAttendRally", event.target.value);
    };
    return (
        <div className="input-field col s12">
            <div className="label">
                THE ASK: Can they commit to attending the canvass launch on 1/27 (10am - 2pm: morning rally + morning canvass shift)?
            </div>
            <select
                id="will-attend-rally-field"
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

WillAttendRally.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
