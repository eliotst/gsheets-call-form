import React from "react";
import PropTypes from "prop-types";

export default function WillDoAfternoonShift({ onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange("willDoAfternoonShift", event.target.value);
    };
    return (
        <div className="input-field col s12">
            <div className="label">
                If NO above: can they commit to an afternoon shift on 1/27 (1pm - 4pm)?
            </div>
            <select
                id="will-do-afternoon-shift-field"
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

WillDoAfternoonShift.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
