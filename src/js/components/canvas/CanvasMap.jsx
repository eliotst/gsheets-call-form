import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import propTypes from "../propTypes";

function determineIcon(google, person) {
    const statusColorMap = {
        Contacted: "blue",
        "Bad Number": "purple",
        "No Answer": "orange",
    };
    const color = statusColorMap[person["Contact Status [No Answer, Contacted, Bad Number, Do Not Call, Left a Voicemail] !"]] || "grey";
    const iconUrl = `http://maps.google.com/mapfiles/ms/icons/${color}.png`;
    return {
        anchor: new google.maps.Point(32, 32),
        scaledSize: new google.maps.Size(48, 48),
        url: iconUrl,
    };
}

class CanvasMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarker: null,
            activePersonIndex: null,
            currentLocation: null,
        };
        this.clickMarker = this.clickMarker.bind(this);
        this.navigate = this.navigate.bind(this);
        this.resetMarker = this.resetMarker.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.locationInterval = null;
    }

    componentDidMount() {
        if (navigator && navigator.geolocation) {
            this.getCurrentLocation();
            setInterval(this.getCurrentLocation, 5000);
        }
        this.geoCodeEveryone();
    }

    componentWillUnmount() {
        if (this.locationInterval !== null) {
            clearInterval(this.locationInterval);
            this.locationInterval = null;
        }
    }

    getCurrentLocation() {
        const locationPromise = new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject));

        locationPromise.then(position => this.setState({
            currentLocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
        })).catch(() => {
            clearInterval(this.locationInterval);
            this.locationInterval = null;
        });
    }

    geoCodeEveryone() {
        const { spreadsheetData } = this.props;
        const { values } = spreadsheetData;
        values.forEach((person, rowNumber) => {
            if (person["Lat #"] === "" || person["Long #"] === "") {
                this.geoCode(person, rowNumber);
            }
        });
    }

    geoCode(person, rowNumber) {
        const { onSaveRow } = this.props;
        const addressString = `${person["Address *"]}, ${person["ZIP *"]}`;
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_GEOCODING_API_KEY}&address=${addressString}`)
            .then((response) => {
                const firstResult = response.data.results[0];
                const latLong = firstResult.geometry.location;
                const newPerson = person;
                newPerson["Lat #"] = latLong.lat;
                newPerson["Long #"] = latLong.lng;
                onSaveRow(rowNumber, person);
            });
    }

    clickMarker(marker, index) {
        this.setState({
            activeMarker: marker,
            activePersonIndex: index,
        });
    }

    navigate() {
        const { history } = this.props;
        const { activePersonIndex } = this.state;
        history.push(`/map/${activePersonIndex}`);
    }

    resetMarker() {
        this.setState({
            activeMarker: null,
            activePersonIndex: null,
        });
    }

    render() {
        const { addPerson, google, spreadsheetData } = this.props;
        const { activeMarker, activePersonIndex, currentLocation } = this.state;
        const { values } = spreadsheetData;
        const center = {
            lat: values[0]["Lat #"],
            lng: values[0]["Long #"],
        };
        const markers = values.map((person, index) => (
            <Marker
                key={person["Full Name *"]}
                icon={determineIcon(google, person)}
                name={person["Full Name *"]}
                onClick={(props, marker) => this.clickMarker(marker, index)}
                position={{
                    lat: person["Lat #"],
                    lng: person["Long #"],
                }}
            />));
        if (center.lat === "" && currentLocation === null) {
            return <div>Loading...</div>;
        }
        if (currentLocation !== null) {
            markers.push(<Marker
                icon={{
                    anchor: new google.maps.Point(32, 32),
                    scaledSize: new google.maps.Size(32, 32),
                    url: "/blue-dot.png",
                }}
                key="currentLocation"
                position={currentLocation}
            />);
        }
        const clickButton = (evt) => {
            evt.preventDefault();
            addPerson();
        };
        return (
            <div className="canvas-map">
                <Map
                    google={google}
                    initialCenter={currentLocation || center}
                    onClick={this.resetMarker}
                    zoom={17}
                >
                    {markers}
                    <InfoWindow
                        marker={activeMarker}
                        onClose={this.resetMarker}
                        visible={activeMarker !== null}
                    >
                        {activePersonIndex !== null ?
                            <a href={`#/map/${activePersonIndex}`}>
                                <h4>
                                    {values[activePersonIndex]["Full Name *"]}
                                </h4>
                            </a> : <span />}
                    </InfoWindow>
                </Map>
                <button className="btn btn-primary add-person" onClick={clickButton}>Add Person</button>
            </div>
        );
    }
}

CanvasMap.propTypes = {
    addPerson: PropTypes.func.isRequired,
    onSaveRow: PropTypes.func.isRequired,
    spreadsheetData: propTypes.spreadsheetData.isRequired,
};

export default withRouter(GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY })(CanvasMap));
