import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import InfoWindowEx from "./InfoWindowEx";
import Geocode from "react-geocode";

var lats = [], lngs = [];
Geocode.setApiKey("AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY");
Geocode.setLanguage("en");
Geocode.setRegion("es");

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
        Geocode.enableDebug()
        Geocode.fromLatLng(lat, lng).then(
            response => {
                const address = response.results[0].formatted_address
                document.getElementById('location-output-text').innerHTML =
                    "Lattitude: " + lat + "<br/>" +
                    "Longitude: " + lng + "<br/>" +
                    "Address: " + address

            //   const address = response.results[0].formatted_address;
            //   addy = address;
                console.log(address)
            //   lat = 0;
            },
            error => {
              console.error(error);
            }
        );
        var center;
        navigator.geolocation.getCurrentPosition(function(position) {
            center = { lat: position.coords.latitude, lng: position.coords.longitude};
        });

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
                <p id="location-output-text">
                    {/* Lattitude: {lat} <br/>
                    Longitude: {lng} <br/>
                    Addy: {addy} */}
                </p>

                <p>
                    Overall Grade: <br/>
                </p>
                <p>
                    Grade Breakdown <br/>
                    Crime Risk: <br/>
                    Weather Risk: <br/>
                    Air Quality: <br/>
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
