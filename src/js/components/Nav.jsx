import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import propTypes from "./propTypes";
import UserNav from "./UserNav";

function Nav({ history, onUserChange, user }) {
    const home = () => history.push("/");
    const dialer = () => history.push("/call");
    const canvas = () => history.push("/map");
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand">
                <a href="#/" onClick={home}>
                    <img src="lsu-advocacy-logo-horizontal-rgb-edit.jpg" height="75" />
                </a>
            </span>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="#/map" className="nav-link" onClick={canvas}>
                            Canvas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#/call" className="nav-link" onClick={dialer}>
                            Dial
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-right">
                    {user !== null ?
                        <UserNav onUserChange={onUserChange} user={user} /> :
                        null
                    }
                </ul>
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

export default withRouter(Nav);
