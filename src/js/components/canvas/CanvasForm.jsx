import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import PersonFormConfig from "../form/PersonFormConfig";
import PersonLock from "../dialer/PersonLock";
import propTypes from "../propTypes";

function CanvasForm({
    history, onSaveRow, spreadsheetData, personRow, user,
}) {
    const stop = () => history.push("/map");
    const releasePerson = () => stop();
    return (
        <PersonLock
            onSaveRow={onSaveRow}
            releasePerson={releasePerson}
            spreadsheetData={spreadsheetData}
            stop={stop}
            personRow={personRow}
            user={user}
        />
    );
}

CanvasForm.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    personRow: PropTypes.number.isRequired,
    user: propTypes.user.isRequired,
};

export default withRouter(CanvasForm);
