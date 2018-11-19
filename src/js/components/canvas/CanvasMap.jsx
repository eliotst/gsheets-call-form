import React from "react";
import { withRouter } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import propTypes from "../propTypes";

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
        const { google, spreadsheetData } = this.props;
        const { activeMarker, activePersonIndex, currentLocation } = this.state;
        const { values } = spreadsheetData;
        const center = {
            lat: values[0]["Lat #"],
            lng: values[0]["Long #"],
        };
        const markers = values.map((person, index) => (
            <Marker
                key={person["Full Name *"]}
                name={person["Full Name *"]}
                onClick={(props, marker) => this.clickMarker(marker, index)}
                position={{
                    lat: person["Lat #"],
                    lng: person["Long #"],
                }}
            />));
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
        return (
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
        );
    }
}

CanvasMap.propTypes = {
    spreadsheetData: propTypes.spreadsheetData.isRequired,
};

export default withRouter(GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY })(CanvasMap));
