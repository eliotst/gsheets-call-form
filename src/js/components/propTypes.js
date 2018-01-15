import PropTypes from "prop-types";

const appParameters = PropTypes.shape({
    spreadsheetId: PropTypes.string.isRequired,
});

const spreadsheetData = PropTypes.shape({
    spreadsheetId: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
});

const user = PropTypes.shape({
    name: PropTypes.string.isRequired,
});

const volunteerData = PropTypes.shape({
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    city: PropTypes.string,
    isMember: PropTypes.string,
    lastTimeCanvassed: PropTypes.string,
    notes: PropTypes.string,
    contactDate: PropTypes.string,
    caller: PropTypes.string,
    contactStatus: PropTypes.string,
    isInterestedInVolunteering: PropTypes.string,
    experienceWithLsu: PropTypes.string,
    interestAndSkills: PropTypes.string,
    willAttendRally: PropTypes.string,
    willDoAfternoonShift: PropTypes.string,
});

export default {
    appParameters,
    spreadsheetData,
    user,
    volunteerData,
};
