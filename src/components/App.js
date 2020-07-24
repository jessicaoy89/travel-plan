import React, {Component, useState} from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import {formatRelative} from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import InterestedCard2 from "./InterestedCard2";
import DiscoverList from "./DiscoverList";

const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 37.7749,
    lng: -122.4194,
};

// function changeName(locName) {
//     this.state = {
//         locName: '',
//         lat: '',
//         lng: '',
//     }
//     this.setState({
//         locName: locName
//     })
// }
// //let newName = changeName(locName);
// const locName = '';
// const newName = changeName(locName)
// {
//     return locName;
// }

//export default class App extends Component {
export default function App() {

    const {isLoaded, loadError} = useLoadScript({
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [names, setNames] = React.useState([]);
    const [list, setList] = React.useState([]);
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const handleRemoveLike = React.useCallback((placeName) => {
        setList((current) => current.filter(
            place => place.name !== placeName
        ),)
    }, []);

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";


    return (
        <div>
            <div className="column App">
                <Locate panTo={panTo}/>
                <Search panTo={panTo}/>

                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={center}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={`${marker.lat}-${marker.lng}`}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => {
                                console.log('marker --> ', marker);
                                setSelected(marker);
                            }}
                        />
                    ))}

                    {selected ? (
                        <InfoWindow
                            position={{lat: selected.lat, lng: selected.lng}}
                            onCloseClick={() => {
                                setList((current) => [
                                    ...current,
                                    {
                                        name: names,
                                        lat: selected.lat,
                                        lng: selected.lng,
                                    },
                                ]);
                                console.log('close --> ', list);
                                setSelected(null);
                            }}
                        >
                            <div>
                                <InterestedCard2 onChange={value => setNames(value)}/>
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </div>
            <div className="column DiscoverList">
                <DiscoverList removeLike={handleRemoveLike} places={list}/>
            </div>
        </div>
    );
}

function Locate({panTo}) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('position --> ', position);
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src="/compass.svg" alt="compass"/>
        </button>
    );
}

function Search({panTo}) {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 37.7749, lng: () => -122.4194},
            radius: 100 * 1000,
        },
    });


    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        console.log('e --> ', e.target.value);
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        console.log('address --> ', address);
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({address});
            const {lat, lng} = await getLatLng(results[0]);
            panTo({lat, lng});
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(({id, description}) => (
                            <ComboboxOption key={id} value={description}/>
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
