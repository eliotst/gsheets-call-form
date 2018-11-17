import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";
import VolunteerContainer from "./VolunteerContainer";

const headerRegex = /^(.*?)\s?(\[.*\])?\s?(!?)\s?(\*?)\s?(#?)$/;

const parseConfig = (headerRow) => {
    return headerRow.map((cell) => {
        const headerMatch = cell.match(headerRegex);
        if (headerMatch === null) {
            return null;
        }
        const result = {
            name: cell,
            displayName: headerMatch[1],
        };
        if (headerMatch[2] !== undefined) {
            const options = headerMatch[2].slice(1, -1).split(",").map(value => value.trim());
            result.type = "select";
            result.options = options;
        } else if (headerMatch[4] !== "") {
            result.type = "readonly";
        } else if (headerMatch[5] !== "") {
            result.type = "hidden";
        } else {
            result.type = "text";
        }

        if (headerMatch[3] !== "") {
            result.required = true;
        }

        return result;
    }).filter(config => config !== null).filter(config => config.type !== "hidden");
};

export default class ConfigContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formConfig: null,
        };
    }

    componentWillMount() {
        const { spreadsheetData } = this.props;
        const headerRow = spreadsheetData.keys;
        const formConfig = parseConfig(headerRow);
        this.setState({
            formConfig,
        });
    }

    render() {
        const {
            onSaveRow, releaseVolunteer, spreadsheetData, stop, volunteerRow,
        } = this.props;
        const { formConfig } = this.state;
        if (formConfig === null) {
            return <div>Loading ...</div>;
        }
        return (
            <VolunteerContainer
                formConfig={formConfig}
                onSaveRow={onSaveRow}
                releaseVolunteer={releaseVolunteer}
                spreadsheetData={spreadsheetData}
                stop={stop}
                volunteerRow={volunteerRow}
            />
        );
    }
}

ConfigContainer.propTypes = {
    onSaveRow: PropTypes.func.isRequired,
    releaseVolunteer: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
    volunteerRow: PropTypes.number.isRequired,
};