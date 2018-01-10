import Materialize from "materialize-css";
import PropTypes from "prop-types";
import React from "react";

export default function ExperienceWithLSU({ onFieldChange, value }) {
    const onChange = (event) => {
        onFieldChange("experienceWithLsu", event.target.value);
        Materialize.updateTextFields();
    };
    return (
        <div className="input-field col s12">
            <div className="label">
                THEIR INTERESTS + SKILLS: Tell me a little bit more about yourself. What’s your background?  What kinds of things are you interested in working on?
            </div>
            <textarea
                className="materialize-textarea"
                id="experience-with-lsu-field"
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

ExperienceWithLSU.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
