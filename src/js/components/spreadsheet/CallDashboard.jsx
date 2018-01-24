import React from "react";
import propTypes from "../propTypes";

export default function CallDashboard({ spreadsheetData, user }) {
    const called = spreadsheetData.values.filter(row => row["Call Lock #"]);
    const calledByUser = called.filter(row => row["Caller *"] === user.id);
    const numberOfPeople = spreadsheetData.values.length;
    return (
        <div className="row call-dashboard">
            <div className="col s6">
                <label>Total People:</label>
                <span>{numberOfPeople}</span>
            </div>
            <div className="col s6">
                <label>Called:</label>
                <span>{called.length}</span>
            </div>
            <div className="col s6">
                <label>Called By You:</label>
                <span>{calledByUser.length}</span>
            </div>
            <div className="col s6">
                <label>Left to Call:</label>
                <span>{numberOfPeople - called.length}</span>
            </div>
        </div>
    );
}


CallDashboard.propTypes = {
    spreadsheetData: propTypes.csvData.isRequired,
};
