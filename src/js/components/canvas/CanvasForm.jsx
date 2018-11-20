import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import PersonFormConfig from "../form/PersonFormConfig";
import propTypes from "../propTypes";

function CanvasForm({
    history, onSaveRow, spreadsheetData, volunteerRow,
}) {
    const stop = () => history.push("/map");
    const releaseVolunteer = () => stop();
    const save = rowData => onSaveRow(volunteerRow, rowData);
    return (
        <PersonFormConfig
            onSaveRow={save}
            releaseVolunteer={releaseVolunteer}
            spreadsheetData={spreadsheetData}
            stop={stop}
            volunteerRow={volunteerRow}
        />
    );
}

CanvasForm.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    volunteerRow: PropTypes.number.isRequired,
};

export default withRouter(CanvasForm);
