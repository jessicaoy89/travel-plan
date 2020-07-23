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
            places: this.generatePlace(this.props.day)
        };
    }

    generatePlace(day) {
        let obj = {}
        let plan = this.props.plan;
        let wpt = [];
        const [ori, ...rest] = plan[day];
        obj.origin = ori;
        obj.destination = rest.pop();
        for (let place of rest) {
            wpt.push({
                location: place,
                stopover: true,
            });
        }
        obj.waypoints = wpt;
        obj.travelMode = 'DRIVING';
        return obj;
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


    render() {
        // this.updateDay();
        return (
            <div>
                
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={12}
                        center={center}
                        options={options}>
                        <DirectionsService
                            options={
                                this.generatePlace(this.props.day)
                        }
                            callback={this.directionsCallback}
                        >
                            {/* {console.log(`hello, ${this.state.places.wpt}`)} */}
                        </DirectionsService>
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