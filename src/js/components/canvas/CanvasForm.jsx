import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import PersonFormConfig from "../form/PersonFormConfig";
import propTypes from "../propTypes";

function CanvasForm({
    history, onSaveRow, spreadsheetData, personRow,
}) {
    const stop = () => history.push("/map");
    const releasePerson = () => stop();
    const save = rowData => onSaveRow(personRow, rowData);
    return (
        <PersonFormConfig
            onSaveRow={save}
            releasePerson={releasePerson}
            spreadsheetData={spreadsheetData}
            stop={stop}
            personRow={personRow}
        />
    );
}

CanvasForm.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    personRow: PropTypes.number.isRequired,
};

export default withRouter(CanvasForm);
