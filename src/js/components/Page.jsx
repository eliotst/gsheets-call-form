import PropTypes from "prop-types";
import React from "react";

import LoginContainer from "./user/LoginContainer";
import Nav from "./Nav";
import propTypes from "./propTypes";

export default function Page({
    isLoggedIn,
    onLoginStateChange,
    onUserChange,
    parameters,
    user,
}) {
    return (
        <div className="page container-fluid h-100 d-flex flex-column">
            <Nav
                onUserChange={onUserChange}
                user={user}
            />
            <div className="content">
                <LoginContainer
                    isLoggedIn={isLoggedIn}
                    onLoginStateChange={onLoginStateChange}
                    onUserChange={onUserChange}
                    parameters={parameters}
                    user={user}
                />
            </div>
        </div>
    );
}

Page.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLoginStateChange: PropTypes.func.isRequired,
    onUserChange: PropTypes.func.isRequired,
    parameters: propTypes.appParameters.isRequired,
    user: propTypes.user,
};

Page.defaultProps = {
    user: undefined,
};
