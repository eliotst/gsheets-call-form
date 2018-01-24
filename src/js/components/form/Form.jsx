import PropTypes from "prop-types";
import React from "react";

import FormHeader from "./FormHeader";
import FormFieldGroup from "./FormFieldGroup";
import propTypes from "../propTypes";

export default function Form({
    errors,
    formConfig,
    onFieldChange,
    onSave,
    releaseVolunteer,
    volunteerData,
}) {
    const errorElements = errors.map(message => <div className="message">{message}</div>);
    return (
        <div>
            <FormHeader formConfig={formConfig} volunteerData={volunteerData} />
            <FormFieldGroup
                formConfig={formConfig}
                onFieldChange={onFieldChange}
                volunteerData={volunteerData}
            />
            <div className="errors">{errorElements}</div>
            <div className="form-buttons">
                <button className="btn" onClick={releaseVolunteer}>Cancel</button>
                <button className="btn" onClick={onSave}>Save</button>
            </div>
        </div>
    );
}

Form.propTypes = {
    formConfig: propTypes.formConfig.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    releaseVolunteer: PropTypes.func.isRequired,
    volunteerData: propTypes.volunteerData.isRequired, // eslint-disable-line react/no-typos
};
