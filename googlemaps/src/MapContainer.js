import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';


const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerPosition: e.latLng,
            isMarkerShown:true,
        })
      }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            onClick={props.onMapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}

        </GoogleMap>        
    )

export default class MapContainer extends React.Component {
    

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
