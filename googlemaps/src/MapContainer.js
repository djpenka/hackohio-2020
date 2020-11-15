import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import InfoWindowEx from "./InfoWindowEx";
import Geocode from "react-geocode";

var pastLats = [], pastLngs = [], pastAddys = [];
Geocode.setApiKey("AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY");
Geocode.setLanguage("en");
Geocode.setRegion("es");

const data = [];

  var places = {data};

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => {
            return ({
            markerPosition: e.latLng,
            isMarkerShown:true,
            //document.getElementID("geolocation").innerHTML = lat
            });
        }
      }),
    withScriptjs,
    withGoogleMap
)
    (props => {
        var lat = (props.markerPosition===null ? 0 : props.markerPosition.lat());
        var lng = (props.markerPosition===null ? 0 : props.markerPosition.lng());
        // var latStr = "";
        // var lngStr = "";
        // for (var i = 0; i < lats.length; i++) {
        //     latStr = latStr + lats[i].toString() + "     ";
        //     lngStr = lngStr + lngs[i].toString() + "     ";
        // }
        var addy = "Unknown";
        // pastLats.push(lat);
        // pastLngs.push(lng);
        // for (var i = 0; i < pastLats.length+1; i++) {
        //     pastLats[i+1] = pastLats[i];
        //     pastLats[i] = lat;
        //     pastLngs[i+1] = pastLngs[i];
        //     pastLngs[i] = lng;
        // }
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
                    "Lattitude: " + lat + "<br/>" +
                    "Longitude: " + lng + "<br/>" +
                    "Address: " + address
                pastAddys[3] = pastAddys[2];
                pastAddys[2] = pastAddys[1];
                pastAddys[1] = pastAddys[0];
                pastAddys[0] = address;

            //   const address = response.results[0].formatted_address;
            //   addy = address;
                console.log(address)
            //   lat = 0;
            },
            error => {
              console.error(error);
            }
        );
        
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
        // var center;
        // navigator.geolocation.getCurrentPosition(function(position) {
        //     center = { lat: position.coords.latitude, lng: position.coords.longitude};
        // });

        // lat = 0;
        // addy = "ahhh";
        return(
            <div>
                <GoogleMap
                    defaultZoom={6}
                    defaultCenter={{lat: 39.8978, lng: -84.3063}}
                    onClick={props.onMapClick}
                >
                    {props.isMarkerShown && <Marker position={props.markerPosition} />}
                </GoogleMap>
                <Marker
                    // onClick={this.onMarkerClick}
                    key={data[0].id}
                    place_={data[0]}
                    position={{ lat: data[0].lat, lng: data[0].lng }}
                />
                <Marker
                    // onClick={this.onMarkerClick}
                    key={data[0].id}
                    place_={data[0]}
                    position={{ lat: data[0].lat, lng: data[0].lng }}
                />
                <Marker
                    // onClick={this.onMarkerClick}
                    key={data[1].id}
                    place_={data[1]}
                    position={{ lat: data[1].lat, lng: data[1].lng }}
                />
                <Marker
                    // onClick={this.onMarkerClick}
                    key={data[2].id}
                    place_={data[2]}
                    position={{ lat: data[2].lat, lng: data[2].lng }}
                />
                <p id="location-output-text">
                    {/* Lattitude: {lat} <br/>
                    Longitude: {lng} <br/>
                    Addy: {addy} */}
                </p>

                {/* <p>
                    Overall Grade: <br/>
                </p> */}
                {/* <p>
                    Grade Breakdown <br/>
                    Crime Risk: <br/>
                    Weather Risk: <br/>
                    Air Quality: <br/>
                </p> */}

                <p>
                    Lattitude: {pastLats[1]} <br/>
                    Longitude: {pastLngs[1]} <br/>
                    Address: {pastAddys[0]} <br/>
                </p>
                <p>
                    Lattitude: {pastLats[2]} <br/>
                    Longitude: {pastLngs[2]} <br/>
                    Address: {pastAddys[1]} <br/>
                </p>
                <p>
                    Lattitude: {pastLats[3]} <br/>
                    Longitude: {pastLngs[3]} <br/>
                    Address: {pastAddys[2]} <br/>
                </p>
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
                {/* <Marker
                    onClick={this.onMarkerClick}
                    key={place.id}
                    place_={place}
                    position={{ lat: place.lat, lng: place.lng }}
                /> */}
                {/* <InfoWindowEx
                    marker={activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                    <h3>{this.state.selectedPlace.name}</h3>
                        <h3>{this.state.selectedPlace.lat + ", " + this.state.selectedPlace.lng}</h3>
                    </div>
                </InfoWindowEx> */}
            </div>
        )
    }
}
