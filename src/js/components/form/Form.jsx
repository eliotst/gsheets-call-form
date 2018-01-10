import PropTypes from "prop-types";
import React from "react";

import FormHeader from "./FormHeader";
import FormQuestionGroup from "./FormQuestionGroup";
import propTypes from "../propTypes";

export default function Form({
    onFieldChange,
    onSave,
    releaseVolunteer,
    volunteerData,
}) {
    return (
        <div>
            <FormHeader volunteerData={volunteerData} />
            <FormQuestionGroup onFieldChange={onFieldChange} volunteerData={volunteerData} />
            <div className="form-buttons">
                <button className="btn" onClick={releaseVolunteer}>Cancel</button>
                <button className="btn" onClick={onSave}>Save</button>
            </div>
        </div>
    );
}

Form.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    releaseVolunteer: PropTypes.func.isRequired,
    volunteerData: propTypes.volunteerData.isRequired, // eslint-disable-line react/no-typos
};
