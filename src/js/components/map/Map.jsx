import React from "react";
import propTypes from "../propTypes";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.map = null;
    }

    componentDidMount() {
        const { values } = this.props.spreadsheetData;
        this.map = new google.maps.Map(this.mapRef, {
            center: {
                lat: parseFloat(values[0]["Lat #"]),
                lng: parseFloat(values[0]["Long #"]),
            },
            zoom: 17,
        });
        values.forEach((row) => {
            const infoWindow = new google.maps.InfoWindow({
                content: `${row["Address *"]}`,
            });
            const marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(row["Lat #"]),
                    lng: parseFloat(row["Long #"]),
                },
                map: this.map,
                title: row["Full Name *"],
            });
            marker.addListener("click", () => infoWindow.open(this.map, marker));
        });
    }

    render() {
        const ref = (elem) => { this.mapRef = elem; };
        return (
            <div className="map" ref={ref} />
        );
    }
}

Map.propTypes = {
    spreadsheetData: propTypes.spreadsheetData.isRequired,
    user: propTypes.user.isRequired,
};
