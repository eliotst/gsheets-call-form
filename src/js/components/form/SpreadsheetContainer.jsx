import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import VolunteerPicker from "./VolunteerPicker";

const RANGE = "A1:AA600";

export default class SpreadsheetContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            spreadsheetData: null,
        };
        this.getSpreadsheetData = this.getSpreadsheetData.bind(this);
    }

    componentDidMount() {
        this.getSpreadsheetData();
    }

    getSpreadsheetData() {
        const { parameters } = this.props;
        const { spreadsheetId } = parameters;
        // Make an API call to the People API, and print the user's given name.
        const params = {
            spreadsheetId,
            range: RANGE,
        };
        gapi.client.sheets.spreadsheets.values.get(params).then((response) => {
            const { result } = response;
            const { values } = result;
            this.setState({
                error: null,
                spreadsheetData: {
                    spreadsheetId,
                    values,
                },
            });
        }).catch((reason) => {
            this.setState({
                error: reason.result.error.message,
            });
        });
    }

    render() {
        const { error, spreadsheetData } = this.state;
        const { stop, user } = this.props;
        if (error !== null) {
            return <div>{error}</div>;
        }
        if (spreadsheetData === null) {
            return <div>Loading ...</div>;
        }
        return (
            <VolunteerPicker
                spreadsheetData={spreadsheetData}
                onResetSpreadsheet={this.getSpreadsheetData}
                stop={stop}
                user={user}
            />
        );
    }
}

SpreadsheetContainer.propTypes = {
    parameters: propTypes.appParameters.isRequired,
    stop: PropTypes.func.isRequired,
    user: propTypes.user,
};
