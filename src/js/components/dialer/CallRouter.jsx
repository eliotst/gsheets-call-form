import PropTypes from "prop-types";
import React from "react";
import { Route, withRouter } from "react-router-dom";

import CallDashboard from "./CallDashboard";
import propTypes from "../propTypes";
import PersonLock from "./PersonLock";
import PersonPicker from "./PersonPicker";

function CallRouter({
    history, onSaveRow, spreadsheetData, user,
}) {
    const pick = () => history.push("/call/pick");
    const selectPerson = rowNumber => history.push(`/call/form/${rowNumber}`);
    const stop = () => history.push("/call");
    return (
        <div>
            <Route
                exact
                path="/call"
                render={() => (
                    <CallDashboard
                        pick={pick}
                        spreadsheetData={spreadsheetData}
                        user={user}
                    />
                )}
            />
            <Route
                exact
                path="/call/pick"
                render={() => (
                    <PersonPicker
                        onSaveRow={onSaveRow}
                        selectPerson={selectPerson}
                        spreadsheetData={spreadsheetData}
                        stop={stop}
                        user={user}
                    />
                )}
            />
            <Route
                exact
                path="/call/form/:personId"
                render={routeProps => (
                    <PersonLock
                        onSaveRow={onSaveRow}
                        spreadsheetData={spreadsheetData}
                        stop={stop}
                        personRow={parseInt(routeProps.match.params.personId, 10)}
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
