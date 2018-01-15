import PropTypes from "prop-types";
import React from "react";

import ContactStatus from "./questions/ContactStatus";
import ExperienceWithLSU from "./questions/ExperienceWithLSU";
import InterestedInVolunteering from "./questions/InterestedInVolunteering";
import InterestAndSkills from "./questions/InterestAndSkills";
import Notes from "./questions/Notes";
import propTypes from "../propTypes";
import StayInTouch from "./questions/StayInTouch";
import WillAttendRally from "./questions/WillAttendRally";
import WillDoAfternoonShift from "./questions/WillDoAfternoonShift";

export default function FormQuestionGroup({ onFieldChange, volunteerData }) {
    let questions = [
        <ContactStatus
            key="contactStatus"
            onFieldChange={onFieldChange}
            value={volunteerData.contactStatus}
        />,
        <Notes
            key="notes"
            onFieldChange={onFieldChange}
            value={volunteerData.notes}
        />,
        <InterestedInVolunteering
            key="isInterestedInVolunteering"
            onFieldChange={onFieldChange}
            value={volunteerData.isInterestedInVolunteering}
        />,
        <ExperienceWithLSU
            key="experienceWithLsu"
            onFieldChange={onFieldChange}
            value={volunteerData.experienceWithLsu}
        />,
        <InterestAndSkills
            key="interestAndSkills"
            onFieldChange={onFieldChange}
            value={volunteerData.interestAndSkills}
        />,
        <WillAttendRally
            key="willAttendRally"
            onFieldChange={onFieldChange}
            value={volunteerData.willAttendRally}
        />,
        <WillDoAfternoonShift
            key="willDoAfternoonShift"
            onFieldChange={onFieldChange}
            value={volunteerData.willDoAfternoonShift}
        />,
        <StayInTouch
            key="stayInTouch"
            onFieldChange={onFieldChange}
            value={volunteerData.stayInTouch}
        />,
    ];
    if (volunteerData.contactStatus !== "Contacted") {
        questions = questions.slice(0, 2);
    }
    return (
        <div className="row form-question-group">
            {questions}
        </div>
    );
}

FormQuestionGroup.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    volunteerData: propTypes.volunteerData.isRequired, // eslint-disable-line react/no-typos
};
