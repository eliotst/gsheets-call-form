import PropTypes from "prop-types";
import React from "react";

export default function InterestAndSkills({ onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange("interestAndSkills", event.target.value);
    };
    return (
        <div className="input-field col s12">
            <div className="label">
                THEIR EXPERIENCE WITH LSU: What has your experience of Lancaster Stands Up been like so far? What drew you to the group? What could be better?
            </div>
            <textarea
                className="materialize-textarea"
                id="interest-and-skills-field"
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

InterestAndSkills.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
