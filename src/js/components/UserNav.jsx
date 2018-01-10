import PropTypes from "prop-types";
import React from "react";

import propTypes from "./propTypes";

export default function UserNav({ onUserChange, user }) {
    const logOut = () => {
        gapi.auth2.getAuthInstance().signOut();
        onUserChange(null);
    };
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
                Hello, {user.name}!
            </li>
            <li>
                <a onClick={logOut}>Log Out</a>
            </li>
        </ul>
    );
}

UserNav.propTypes = {
    onUserChange: PropTypes.func.isRequired,
    user: propTypes.user,
};

UserNav.defaultProps = {
    user: null,
};
