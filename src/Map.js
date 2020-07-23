import React, {Component} from 'react';
// import mapStyles from "./styles/mapStyles";
import {
    GoogleMap,
    LoadScript,
    DirectionsService,
    DirectionsRenderer,
    InfoWindow,
    Marker,
} from "@react-google-maps/api";
import InterestCard from './InterestCard';
import Button from './PlanButton';

const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
}
const center = {
    lat: 43.653225,
    lng: -79.383186,
}
const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}



class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            travelMode: 'DRIVING',
            day: this.props.day,
            planDay: this.props.plan, 
        };
    }

    directionsCallback = response => {
        console.log(response)

        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({
                        response
                    })
                )
            } else {
                console.log('response: ', response)
            }
        }
    }

    getPlan() {

    }

    render() {
        // this.updateDay();
        return (
            <div>
                {/* <h1>Travel Planner</h1> */}
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={12}
                        center={center}
                        options={options}>
                        <DirectionsService
                            options={{
                                destination: this.state.planDay[this.props.day][0],
                                origin: this.state.planDay[this.props.day][1],
                                // waypoints: this.state.waypoints,
                                travelMode: this.state.travelMode,
                            }}
                            callback={this.directionsCallback}
                        />
                        <DirectionsRenderer
                            options={{directions: this.state.response}}
                        />
                        <Marker>
                            <InfoWindow>
                                <InterestCard />
                            </InfoWindow>
                        </Marker>
                    </GoogleMap>
                    <Button />
                        {/* <div>{console.log(this.children)}</div> */}
                </LoadScript>
            </div>
        )
    };
}

export default Map;