import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import InfoWindowEx from "./InfoWindowEx";
import Geocode from "react-geocode";
import './style.css'

import Logo from "./homemetric.png";
import Title from "./hometitle.png";

var pastLats = [], pastLngs = [], pastAddys = [];
Geocode.setApiKey("AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY");
Geocode.setLanguage("en");
Geocode.setRegion("es");

const data = [];

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => {
            return ({
            markerPosition: e.latLng,
            isMarkerShown:true,
            });
        }
      }),
    withScriptjs,
    withGoogleMap
)
    (props => {
        var lat = (props.markerPosition===null ? 0 : props.markerPosition.lat());
        var lng = (props.markerPosition===null ? 0 : props.markerPosition.lng());
        var addy = "Unknown";
        pastLats[3] = pastLats[2];
        pastLats[2] = pastLats[1];
        pastLats[1] = pastLats[0];
        pastLats[0] = lat;
        pastLngs[3] = pastLngs[2];
        pastLngs[2] = pastLngs[1];
        pastLngs[1] = pastLngs[0];
        pastLngs[0] = lng;

        

        var address = "Unavaiable";
        Geocode.fromLatLng(lat, lng).then(
            response => {
                address = response.results[0].formatted_address
                document.getElementById('location-output-text').innerHTML =
                    "<p> Location 1 <br/>" +
                    "Latitude: " + lat + "<br/>" +
                    "Longitude: " + lng + "<br/>" +
                    "Address: " + address + "</p>"
                pastAddys[3] = pastAddys[2];
                pastAddys[2] = pastAddys[1];
                pastAddys[1] = pastAddys[0];
                pastAddys[0] = address;
            },
            error => {
              console.error(error);
            }
        );
        fetch("https://hack-backend.ducoterra.net/crime/grade?state=ohio&county=delaware&zip=123456")
            .then(res => res.json())
            .then(
                (results) => {
                    document.getElementById("grade-output-list").innerHTML=
                    "<li>Crime Grade: " + results['crime_grade'] + "</li>"
                }   
            )

        data[2] = {
            name: "",
            title: "",
            lat: pastLats[3],
            lng: pastLngs[3],
            id: 2
        }
        data[1] = {
            name: "",
            title: "",
            lat: pastLats[2],
            lng: pastLngs[2],
            id: 1
        }
        data[0] = {
            name: "",
            title: "",
            lat: pastLats[1],
            lng: pastLngs[1],
            id: 0
        }

        return(
            <div className="container">
                <div className="logo"><img className = "Logo" src = {Logo}></img></div>
                <div className="header"><img ClassName = "Title" src = {Title}></img></div>
                <div className="search">search</div>
                <div className="map">
                    <GoogleMap className="map"
                        defaultZoom={6}
                        defaultCenter={{lat: 39.8978, lng: -84.3063}}
                        onClick={props.onMapClick}
                    >
                        {props.isMarkerShown && <Marker position={props.markerPosition} label="1" />}
                    </GoogleMap>
                </div>
                <Marker
                    key={data[0].id}
                    place_={data[0]}
                    position={{ lat: data[0].lat, lng: data[0].lng }}
                    label = "2"                
                />
                <Marker
                    key={data[1].id}
                    place_={data[1]}
                    position={{ lat: data[1].lat, lng: data[1].lng }}
                    label = "3"
                />
                <Marker
                    key={data[2].id}
                    place_={data[2]}
                    position={{ lat: data[2].lat, lng: data[2].lng }}
                    label = "4"
                />
                <div className="location1">
                    <p id="location-output-text">
                        Location 1 <br/>
                        Latitude: <br/>
                        Longitude: <br/>
                        Address: <br/>
                    </p>
                    <ul id="grade-output-list">
                    </ul>
                </div>

                {/* <p>
                    Overall Grade: <br/>
                </p> */}
                {/* <p>
                    Grade Breakdown <br/>
                    Crime Risk: <br/>
                    Weather Risk: <br/>
                    Air Quality: <br/>
                </p> */}

                <div className="location2">
                    <p>
                        Location 2 <br/>
                        Latitude: {pastLats[1]} <br/>
                        Longitude: {pastLngs[1]} <br/>
                        Address: {pastAddys[0]} <br/>
                    </p>
                </div>
                <div className="location3">
                    <p>
                    Location 3 <br/>
                        Latitude: {pastLats[2]} <br/>
                        Longitude: {pastLngs[2]} <br/>
                        Address: {pastAddys[1]} <br/>
                    </p>
                </div>
                <div className="location4">
                    <p>
                    Location 4 <br/>
                        Latitude: {pastLats[3]} <br/>
                        Longitude: {pastLngs[3]} <br/>
                        Address: {pastAddys[2]} <br/>
                    </p>
                </div>
                <div className="footer">footer</div>
            </div>
    );
    }
    )

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}
