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
    if (personRow === null) {
        return (
            <PersonFormConfig
                onSaveRow={onSaveRow}
                releasePerson={stop}
                spreadsheetData={spreadsheetData}
                stop={stop}
                personRow={null}
            />
        );
    }
    return (
        <PersonLock
            onSaveRow={onSaveRow}
            spreadsheetData={spreadsheetData}
            stop={stop}
            personRow={personRow}
            user={user}
        >
            <PersonFormConfig
                onSaveRow={onSaveRow}
                spreadsheetData={spreadsheetData}
                stop={stop}
                personRow={personRow}
            />
        </PersonLock>
    );
}

CanvasForm.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    personRow: PropTypes.number.isRequired,
    user: propTypes.user.isRequired,
};

export default withRouter(CanvasForm);
