import React from "react";
import ReactDOM from "react-dom";

import AppContainer from "./components/AppContainer";

ReactDOM.render(
    <AppContainer />,
    document.getElementById("app"),
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then((registration) => {
            console.log("SW registered: ", registration);
        }).catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
        });
    });
}
