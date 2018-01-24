import React from "react";

export default function LoginForm() {
    const logIn = () => gapi.auth2.getAuthInstance().signIn();
    return (
        <div className="col s12 login-form">
            <div className="instructions">
                You must login to access the form. Please click the button below to login to Google.
            </div>
            <button className="btn" onClick={logIn}>Log In</button>
        </div>
    );
}
