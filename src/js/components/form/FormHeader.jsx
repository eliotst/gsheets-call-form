import React from "react";
import PropTypes from "prop-types";

import DisplayField from "./DisplayField";
import propTypes from "../propTypes";

export default function FormHeader({ volunteerData }) {
    return (
        <div className="card form-header">
            <div className="row">
                <DisplayField
                    displayName="Name"
                    value={volunteerData.name}
                />
                <DisplayField
                    displayName="Phone Number"
                    value={volunteerData.phoneNumber}
                />
            </div>
            <div className="row">
                <DisplayField
                    displayName="City"
                    value={volunteerData.city}
                />
                <DisplayField
                    displayName="Is Member?"
                    value={volunteerData.isMember}
                />
            </div>
            <div className="row">
                <DisplayField
                    displayName="Last Time Canvassed"
                    value={volunteerData.lastTimeCanvassed}
                />
            </div>
        </div>
    );
}

FormHeader.propTypes = {
    volunteerData: propTypes.volunteerData.isRequired, // eslint-disable-line react/no-typos
};
