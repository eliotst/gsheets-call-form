import PropTypes from "prop-types";
import React from "react";

import CallDashboard from "./CallDashboard";
import propTypes from "../propTypes";
import VolunteerPicker from "./VolunteerPicker";

export default class CallStarter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
        };
    }

    render() {
        const start = () => this.setState({ started: true });
        const { onSaveRow, spreadsheetData, user } = this.props;
        const { started } = this.state;
        if (!started) {
            return (
                <div className="call-starter">
                    <CallDashboard spreadsheetData={spreadsheetData} user={user} />
                    <button className="btn" onClick={start}>Start Next Call</button>
                </div>
            );
        }
        const stop = () => this.setState({ started: false });
        return (
            <VolunteerPicker
                onSaveRow={onSaveRow}
                spreadsheetData={spreadsheetData}
                stop={stop}
                user={user}
            />
        );
    }
}

CallStarter.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
    user: propTypes.user.isRequired,
};
