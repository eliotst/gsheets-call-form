import PropTypes from "prop-types";
import React from "react";

import FormHeader from "./FormHeader";
import FormQuestionGroup from "./FormQuestionGroup";
import propTypes from "../propTypes";

export default function Form({
    errors,
    onFieldChange,
    onSave,
    releaseVolunteer,
    volunteerData,
}) {
    const errorElements = errors.map(message => <div className="message">{message}</div>);
    return (
        <div>
            <FormHeader volunteerData={volunteerData} />
            <FormQuestionGroup onFieldChange={onFieldChange} volunteerData={volunteerData} />
            <div className="errors">{errorElements}</div>
            <div className="form-buttons">
                <button className="btn" onClick={releaseVolunteer}>Cancel</button>
                <button className="btn" onClick={onSave}>Save</button>
            </div>
        </div>
    );
}

Form.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    releaseVolunteer: PropTypes.func.isRequired,
    volunteerData: propTypes.volunteerData.isRequired, // eslint-disable-line react/no-typos
};
