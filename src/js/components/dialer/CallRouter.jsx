import PropTypes from "prop-types";
import React from "react";
import { Route, withRouter } from "react-router-dom";

import CallDashboard from "./CallDashboard";
import propTypes from "../propTypes";
import PersonPicker from "./PersonPicker";
import PersonFormConfig from "../form/PersonFormConfig";

function CallRouter({
    history, onSaveRow, spreadsheetData, user,
}) {
    const pick = () => history.push("/call/pick");
    const stop = () => history.push("/call");
    return (
        <div>
            <Route
                exact
                path="/call"
                render={() => (
                    <CallDashboard pick={pick} spreadsheetData={spreadsheetData} user={user} />
                )}
            />
            <Route
                exact
                path="/call/pick"
                render={() => (
                    <PersonPicker
                        onSaveRow={onSaveRow}
                        spreadsheetData={spreadsheetData}
                        stop={stop}
                        user={user}
                    />
                )}
            />
        </div>
    );
}

CallRouter.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    user: propTypes.user.isRequired,
};

export default withRouter(CallRouter);
