import React from "react";

import ReadOnlyField from "./fields/ReadOnlyField";
import propTypes from "../propTypes";

const pairUp = array => array.reduce((result, value, index) => {
    if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
    }
    return result;
}, []);

export default function FormHeader({ formConfig, personData }) {
    const headerConfigs = formConfig.filter(config => config.type === "readonly");
    const headerFields = headerConfigs.map(config =>
        (<ReadOnlyField
            displayName={config.displayName}
            key={config.name}
            value={personData[config.name]}
        />));
    const headerFieldPairs = pairUp(headerFields);
    const rows = headerFieldPairs.map((pair, index) =>
        <div className="row" key={formConfig[index * 2].name}>{pair[0]}{pair[1]}</div>);
    return (
        <div className="card form-header">
            {rows}
        </div>
    );
}

FormHeader.propTypes = {
    formConfig: propTypes.formConfig.isRequired,
    personData: propTypes.personData.isRequired, // eslint-disable-line react/no-typos
};
