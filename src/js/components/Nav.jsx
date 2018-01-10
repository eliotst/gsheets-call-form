import PropTypes from "prop-types";
import React from "react";

import propTypes from "./propTypes";
import UserNav from "./UserNav";

export default function Nav({ onUserChange, user }) {
    return (
        <nav>
            <div className="nav-wrapper">
                <span className="brand-logo">LSU Call</span>
                {user !== null ?
                    <UserNav onUserChange={onUserChange} user={user} /> :
                    null
                }
            </div>
        </nav>
    );
}

Nav.propTypes = {
    onUserChange: PropTypes.func.isRequired,
    user: propTypes.user,
};

Nav.defaultProps = {
    user: null,
};

