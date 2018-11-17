import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";

export default function CallDashboard({ pick, spreadsheetData, user }) {
    const called = spreadsheetData.values.filter(row => row["Call Lock #"] || row["Contact Status [No Answer, Contacted, Bad Number, Do Not Call, Left a Voicemail] !"]);
    const calledByUser = called.filter(row => row["Caller *"] === user.id);
    const numberOfPeople = spreadsheetData.values.length;
    return (
        <div className="call-starter">
            <div className="row call-dashboard">
                <div className="col s6">
                    <span>Total People:</span>
                    <span>{numberOfPeople}</span>
                </div>
                <div className="col s6">
                    <span>Called:</span>
                    <span>{called.length}</span>
                </div>
                <div className="col s6">
                    <span>Called By You:</span>
                    <span>{calledByUser.length}</span>
                </div>
                <div className="col s6">
                    <span>Left to Call:</span>
                    <span>{numberOfPeople - called.length}</span>
                </div>
            </div>
            <button className="btn" onClick={pick}>Start Next Call</button>
        </div>
    );
}

CallDashboard.propTypes = {
    pick: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    user: propTypes.user.isRequired,
};
