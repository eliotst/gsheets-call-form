import React from "react";

import propTypes from "./propTypes";
import SpreadsheetContainer from "./form/SpreadsheetContainer";

export default class CallStarter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
        };
    }

    render() {
        const start = () => this.setState({ started: true });
        const { parameters, user } = this.props;
        const { started } = this.state;
        if (!started) {
            return (
                <div className="call-starter">
                    <button className="btn" onClick={start}>Start Next Call</button>
                </div>
            );
        }
        const stop = () => this.setState({ started: false });
        return <SpreadsheetContainer parameters={parameters} user={user} stop={stop} />;
    }
}

CallStarter.propTypes = {
    parameters: propTypes.appParameters.isRequired,
    user: propTypes.user,
};
