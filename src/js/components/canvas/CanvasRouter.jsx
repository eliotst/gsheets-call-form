import PropTypes from "prop-types";
import React from "react";
import { Route, withRouter } from "react-router-dom";

import CanvasForm from "../canvas/CanvasForm";
import CanvasMap from "../canvas/CanvasMap";
import propTypes from "../propTypes";

function CanvasRouter({
    history, onSaveRow, spreadsheetData, user,
}) {
    const newPerson = () => history.push("/map/person/new");
    return (
        <div>
            <Route
                exact
                path="/map/person/new" // TODO: properly nest
                render={() => (
                    <CanvasForm
                        onSaveRow={onSaveRow}
                        spreadsheetData={spreadsheetData}
                        personRow={null}
                        user={user}
                    />
                )}
            />
            <Route
                exact
                path="/map/:personId" // TODO: properly nest
                render={routeProps => (
                    <CanvasForm
                        onSaveRow={onSaveRow}
                        spreadsheetData={spreadsheetData}
                        personRow={parseInt(routeProps.match.params.personId, 10)}
                        user={user}
                    />
                )}
            />
            <Route
                exact
                path="/map"
                render={() => (
                    <CanvasMap
                        addPerson={newPerson}
                        onSaveRow={onSaveRow}
                        spreadsheetData={spreadsheetData}
                    />
                )}
            />
        </div>
    );
}

CanvasRouter.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    user: propTypes.user.isRequired,
};

export default withRouter(CanvasRouter);
