import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";

import CanvasForm from "../canvas/CanvasForm";
import CanvasMap from "../canvas/CanvasMap";
import propTypes from "../propTypes";

export default function CanvasRouter({
    onSaveRow, spreadsheetData,
}) {
    return (
        <div>
            <Route
                path="/map/:volunteerId" // TODO: properly nest
                render={routeProps => (
                    <CanvasForm
                        onSaveRow={onSaveRow}
                        spreadsheetData={spreadsheetData}
                        volunteerRow={parseInt(routeProps.match.params.volunteerId, 10)}
                    />
                )}
            />
            <Route
                exact
                path="/map"
                render={() => (
                    <CanvasMap
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
};
