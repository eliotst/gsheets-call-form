import PropTypes from "prop-types";
import React from "react";

import propTypes from "../propTypes";

const pickRandom = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

export default class PersonPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    componentDidMount() {
        this.pickPerson();
    }

    pickPerson() {
        const possibleRows = [];
        const {
            selectPerson, spreadsheetData,
        } = this.props;
        spreadsheetData.values.forEach((row, index) => {
            const lockValue = row["Call Lock #"];
            const contactStatus = row["Contact Status [No Answer, Contacted, Bad Number, Do Not Call, Left a Voicemail] !"];
            const phoneNumber = row["Phone Number *"];
            if ((lockValue === undefined || lockValue === "") &&
                (contactStatus === undefined || contactStatus === "") &&
                phoneNumber !== undefined && phoneNumber.match(/\d/)) {
                possibleRows.push(index);
            }
        });
        if (possibleRows.length === 0) {
            return this.setState({
                error: "There is no one left to call.",
            });
        }
        const rowNumber = pickRandom(possibleRows);
        return selectPerson(rowNumber);
    }

    render() {
        const {
            stop,
        } = this.props;
        const { error } = this.state;
        if (error !== null) {
            return (
                <div>
                    <div>
                        {error}
                    </div>
                    <div>
                        <button className="btn" onClick={stop}>Cancel</button>
                    </div>
                </div>
            );
        }
        return <div>Loading ...</div>;
    }
}

PersonPicker.propTypes = {
    selectPerson: PropTypes.func.isRequired,
    spreadsheetData: propTypes.csvData.isRequired,
    stop: PropTypes.func.isRequired,
};
