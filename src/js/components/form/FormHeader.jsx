import PropTypes from "prop-types";
import React from "react";

import TextField from "./fields/TextField";
import propTypes from "../propTypes";

export default function FormHeader({
    formConfig, newPerson, onFieldChange, personData,
}) {
    const headerConfigs = formConfig.filter(config => config.type === "readonly");
    const headerFields = headerConfigs.map(config =>
        (
            <div key={config.name} className="col-lg-6 col-sm-12">
                <TextField
                    formFieldConfig={config}
                    onFieldChange={onFieldChange}
                    readonly={!newPerson}
                    value={personData[config.name]}
                />
            </div>));
    return (
        <div className="form-header row">
            {headerFields}
        </div>
    );
}

FormHeader.propTypes = {
    formConfig: propTypes.formConfig.isRequired,
    newPerson: PropTypes.bool,
    onFieldChange: PropTypes.func.isRequired,
    personData: propTypes.personData.isRequired, // eslint-disable-line react/no-typos
};

FormHeader.defaultProps = {
    newPerson: false,
};
