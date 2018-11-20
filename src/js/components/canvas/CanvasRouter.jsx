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
                path="/map/:personId" // TODO: properly nest
                render={routeProps => (
                    <CanvasForm
                        onSaveRow={onSaveRow}
                        spreadsheetData={spreadsheetData}
                        personRow={parseInt(routeProps.match.params.personId, 10)}
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
