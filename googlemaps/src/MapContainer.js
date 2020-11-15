import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import InfoWindowEx from "./InfoWindowEx";
import Geocode from "react-geocode";
import './style.css'

import Logo from "./homemetric.png";
import Title from "./hometitle.png";

var pastLats = [], pastLngs = [], pastAddys = [], pastCrime = [], pastDisaster = [], pastAQ = [];
Geocode.setApiKey("AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY");
Geocode.setLanguage("en");
Geocode.setRegion("es");

const data = [];
const total_grade = [];

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
                console.log(response.results[0].address_components.filter((elem) => elem.types[0]==="administrative_area_level_1")[0].short_name);
                address = response.results[0].formatted_address
                document.getElementById('location-output-text').innerHTML =
                    "<p> Location 1 <br/>" +
                    "Latitude: " + lat + "<br/>" +
                    "Longitude: " + lng + "<br/>" +
                    "Address: " + address + "</p>"
                    fetch("https://hack-backend.ducoterra.net/crime/grade?state=ohio&county=delaware&zip=" + response.results[0].address_components.filter((elem) => elem.types[0]==="postal_code")[0].short_name)
                        .then(res => res.json())
                        .then(
                            (results) => {
                                document.getElementById("crimegrade-output-list").innerHTML=
                                "<li>Crime Grade: " + results['crime_grade'] + "</li>"

                                total_grade[0] = total_grade[0] + .6*Number(results['crime_grade']);
                                pastCrime[2] = pastCrime[1];
                                pastCrime[1] = pastCrime[0];
                                pastCrime[0] = results['crime_grade'];
                                document.getElementById('crimegrade-output-list2').innerHTML = 
                                   "<li>Crime Grade: " + results['crime_grade'] + "</li>"
                            }
                        )
                    fetch("https://hack-backend.ducoterra.net/disaster/grade?state_code=" + response.results[0].address_components.filter((elem) => elem.types[0]==="administrative_area_level_1")[0].short_name)
                    .then(res => res.json())
                    .then(
                        (results) => {
                            document.getElementById("disastergrade-output-list").innerHTML=
                            "<li>Disaster Grade: " + results['disaster_grade'] + "</li>"

                            total_grade[0] = total_grade[0] + .3*Number(results['disaster_grade']);
                            pastDisaster[2] = pastDisaster[1];
                            pastDisaster[1] = pastDisaster[0];
                            pastDisaster[0] = results['disaster_grade'];
                        }   
                    )

                // document.getElementById('location-output-text2').setAttribute('hidden', 0)
                document.getElementById('location-output-text2').innerHTML =
                    "<p> Location 2 <br/>" +
                    "Latitude: " + pastLats[1] + "<br/>" +
                    "Longitude: " + pastLngs[1] + "<br/>" +
                    "Address: " + pastAddys[0] + "</p>"
                // document.getElementById('location-output-text3').setAttribute('hidden', 0)
                document.getElementById('location-output-text3').innerHTML =
                    "<p> Location 3 <br/>" +
                    "Latitude: " + pastLats[2] + "<br/>" +
                    "Longitude: " + pastLngs[2] + "<br/>" +
                    "Address: " + pastAddys[1] + "</p>"
                // document.getElementById('location-output-text4').setAttribute('hidden', 0)
                document.getElementById('location-output-text4').innerHTML =
                    "<p> Location 4 <br/>" +
                    "Latitude: " + pastLats[3] + "<br/>" +
                    "Longitude: " + pastLngs[3] + "<br/>" +
                    "Address: " + pastAddys[2] + "</p>"

                pastAddys[2] = pastAddys[1];
                pastAddys[1] = pastAddys[0];
                pastAddys[0] = address;
            },
            error => {
              console.error(error);
            }
        );
        
        fetch("https://hack-backend.ducoterra.net/airquality/grade?lat=" + lat + "&lon=" + lng)
            .then(res => res.json())
            .then(
                (results) => {
                    document.getElementById("airgrade-output-list").innerHTML=
                    "<li>Air Quality Grade: " + results['air_quality_grade'] + "</li>"
                    total_grade[0] = total_grade[0] + .1*Number(results['air_quality_grade']);
                    pastAQ[2] = pastAQ[1];
                    pastAQ[1] = pastAQ[0];
                    pastAQ[0] = results['air_quality_grade'];
                }   
            )
        
        // document.getElementById('airgrade-output-list2').innerHTML = 
        //     "<li>Air Grade: " + pastAQ[0] + "</li>"
        // document.getElementById('disastergrade-output-list2').innerHTML = 
        //     "<li>Disaseter Grade: " + pastDisaster[0] + "</li>"
        // total_grade[0] = total_grade[0]/4
        document.getElementById('overall_grade').innerHTML =
            "<li>Overall Grade:  " + total_grade[0] + "  </li>"

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
            <div>
                <GoogleMap className="map"
                    defaultZoom={6}
                    defaultCenter={{lat: 39.8978, lng: -84.3063}}
                    onClick={props.onMapClick}
                >
                    {props.isMarkerShown && <Marker position={props.markerPosition} label="1" />}
                </GoogleMap>
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
            </div>
    );
    }
    )

    

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.items=[
            'New York City',
            'Los Angeles',
            'Chicago',
            'Houston',
            'Phoenix',
            'Philadelphia',
            'San Antonio',
            'San Diego',
            'Dallas',
            'San Jose',
            'Austin',
            'Fort Worth',
            'Jacksonville',
            'Columbus',
            'Charlotte',
            'San Francisco',
            'Indianapolis',
            'Seattle',
            'Denver',
            'Washington',
            'Boston',
            'El Paso',
            'Nashville',
        ];
        this.state = {
            suggestions: [],
            text: '',
        };
    }

    onTextChanged= (e) => {
        const value = e.target.value;
        let suggestions= [];
        if (value.length>0) {
            const regex = new RegExp(`^${value}`,'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestions, text: value}));
    } 

    renderSuggestions () {
        const {suggestions}= this.state;
        if (suggestions.length===0) {
            return null;
        }
        return(
            <ul>
                {suggestions.map((item) => <li onClick={()=> this.suggestionSelected(item)} >{item} </li>)}
            </ul>
        );
    }

    convertAddressToCoords = () => {
        Geocode.setApiKey("AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY")
        Geocode.fromAddress(this.state.text).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
            },
            error => {
              console.error(error);
            }
          );
    }

    suggestionSelected (value) {
        this.setState(()=> ({
        text:value,
        suggestions: [],

        }))
    }

    render() {
        const {text}= this.state;
        return (
            <div className="container">
                <div className="logo"><img className = "Logo" src = {Logo}></img></div>
                <div className="header"><img ClassName = "Title" src = {Title}></img></div>
                <div className="search">
                    <input style={{height:50, width:300}} value={text} onChange={this.onTextChanged} type="text" />
                
                    {this.renderSuggestions()}
                    <button style={{height:55, width:100}} onClick={this.convertAddressToCoords}>Search</button>
                </div>
                <div className="map">
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
                <div className="locations">
                    <div className="location">
                        <p id="location-output-text">
                            Location 1 <br/>
                            Latitude: <br/>
                            Longitude: <br/>
                            Address: <br/>
                        </p>
                        <p id="crimegrade-output-list"></p>
                        <p id="airgrade-output-list"></p>
                        <p id="disastergrade-output-list"></p>
                        <p id="overall_grade"></p>
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

                     <div id="location-output-text2" className="location">
                        <p id="location-output-text2">
                            Location 2 <br/>
                            Latitude: <br/>
                            Longitude: <br/>
                            Address: <br/>
                        </p>
                        <p id="crimegrade-output-list2"> </p>
                        <p id="airgrade-output-list2"> </p>
                        <p id="disastergrade-output-list2"> </p>
                        {/* <p id="overall_grade2"></p> */}
                    </div>
                    <div id="location-output-text3" className="location">
                        <p id="location-output-text3">
                            Location 3 <br/>
                            Latitude: <br/>
                            Longitude: <br/>
                            Address: <br/>
                        </p>
                        <p id="crimegrade-output-list3"></p>
                        <p id="airgrade-output-list3"></p>
                        <p id="disastergrade-output-list3"></p>
                        {/* <p id="overall_grade"></p> */}
                    </div>
                    <div id="location-output-text4" className="location">
                        <p id="location-output-text4">
                            Location 4 <br/>
                            Latitude: <br/>
                            Longitude: <br/>
                            Address: <br/>
                        </p>
                        <p id="crimegrade-output-list4"></p>
                        <p id="airgrade-output-list4"></p>
                        <p id="disastergrade-output-list4"></p>
                        {/* <p id="overall_grade"></p> */}
                    </div>
                </div>
            </div>
        )
    }
}
