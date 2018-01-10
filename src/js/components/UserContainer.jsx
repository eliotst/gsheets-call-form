import PropTypes from "prop-types";
import React from "react";

import propTypes from "./propTypes";
import CallStarter from "./CallStarter";

export default class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    componentDidMount() {
        this.getPerson();
    }

    getPerson() {
        // Make an API call to the People API, and print the user's given name.
        gapi.client.people.people.get({
            resourceName: "people/me",
            personFields: "names",
        }).then((response) => {
            const { result } = response;
            const { onUserChange } = this.props;
            onUserChange({
                name: result.names[0].givenName,
            });
            this.setState({ error: null });
        }, (reason) => {
            this.setState({ error: reason.result.error.message });
        });
    }

    render() {
        const { error } = this.state;
        const { user } = this.props;
        if (error !== null) {
            return <div>{error}</div>;
        }
        if (user === null) {
            return <div>Loading ...</div>;
        }
        return (
            <div>
                <CallStarter user={user} />
            </div>
        );
    }
}

UserContainer.propTypes = {
    onUserChange: PropTypes.func.isRequired,
    user: propTypes.user,
};

UserContainer.defaultProps = {
    user: null,
};

