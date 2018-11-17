import React from "react";
import propTypes from "../propTypes";

export default function CallDashboard({ spreadsheetData, user }) {
    const called = spreadsheetData.values.filter(row => row["Call Lock #"]);
    const calledByUser = called.filter(row => row["Caller *"] === user.id);
    const numberOfPeople = spreadsheetData.values.length;
    return (
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
    );
}

CallDashboard.propTypes = {
    spreadsheetData: propTypes.csvData.isRequired,
    user: propTypes.user.isRequired,
};
