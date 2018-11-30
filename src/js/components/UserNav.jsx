import PropTypes from "prop-types";
import React from "react";

import propTypes from "./propTypes";

export default function UserNav({ onUserChange, user }) {
    const logOut = () => {
        gapi.auth2.getAuthInstance().signOut();
        onUserChange(null);
    };
    return (
        <li className="nav-item dropdown user-nav">
            <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Hello, {user.name}!
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" onClick={logOut}>Log Out</a>
            </div>
        </li>
    );
}

UserNav.propTypes = {
    onUserChange: PropTypes.func.isRequired,
    user: propTypes.user,
};

UserNav.defaultProps = {
    user: null,
};
