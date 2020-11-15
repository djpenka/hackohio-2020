import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import InfoWindowEx from "./InfoWindowEx";

var lats = [], lngs = [];

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
        lats.push(props.markerPosition===null ? 0 : props.markerPosition.lat());
        lngs.push(props.markerPosition===null ? 0 : props.markerPosition.lng());
        var latStr = "";
        var lngStr = "";
        for (var i = 0; i < lats.length; i++) {
            latStr = latStr + lats[i].toString() + "     ";
            lngStr = lngStr + lngs[i].toString() + "     ";
        }
        return(
            <div>
                <GoogleMap
                    defaultZoom={6}
                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                    onClick={props.onMapClick}
                >
                    {props.isMarkerShown && <Marker position={props.markerPosition} />}
                </GoogleMap>
                <p>
                    Lattitude: {latStr} <br/>
                    Longitude: {lngStr}
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
