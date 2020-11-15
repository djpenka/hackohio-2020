import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import InfoWindowEx from "./InfoWindowEx";
import Geocode from "react-geocode";
import './style.css'

import Logo from "./homemetric.png";
import Title from "./hometitle.png";

var pastLats = [], pastLngs = [], pastAddys = [], pastCrime = [], pastDisaster = [], pastAQ = [], pastOverall = [];
Geocode.setApiKey("AIzaSyDIUiblz5j4PiE7NJ66y_0EKDq2dDWCnKY");
Geocode.setLanguage("en");
Geocode.setRegion("es");

const data = [];
const grades = [];

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
                    "Address: " + address + "</p>"
                    // "Latitude: " + lat + "<br/>" +
                    // "Longitude: " + lng + "<br/>" +
                    fetch("https://hack-backend.ducoterra.net/crime/grade?state=ohio&county=delaware&zip=" + response.results[0].address_components.filter((elem) => elem.types[0]==="postal_code")[0].short_name)
                        .then(res => res.json())
                        .then(
                            (results) => {
                                document.getElementById("crimegrade-output-list").innerHTML=
                                "<p>Crime Grade: " + results['crime_grade'] + "</p>"

                                grades[0] = results['crime_grade'];
                                pastCrime[3] = pastCrime[2];
                                pastCrime[2] = pastCrime[1];
                                pastCrime[1] = pastCrime[0];
                                pastCrime[0] = results['crime_grade'];
                                document.getElementById("crimegrade-output-list2").innerHTML= 
                                   "<p>Crime Grade: " + pastCrime[1] + "</p>"
                                document.getElementById("crimegrade-output-list3").innerHTML= 
                                   "<p>Crime Grade: " + pastCrime[2] + "</p>"
                                document.getElementById("crimegrade-output-list4").innerHTML= 
                                   "<p>Crime Grade: " + pastCrime[3] + "</p>"
                            }
                        )
                    fetch("https://hack-backend.ducoterra.net/disaster/grade?state_code=" + response.results[0].address_components.filter((elem) => elem.types[0]==="administrative_area_level_1")[0].short_name)
                    .then(res => res.json())
                    .then(
                        (results) => {
                            document.getElementById("disastergrade-output-list").innerHTML=
                            "<p>Disaster Grade: " + results['disaster_grade'] + "</p>"

                            grades[1] = results['disaster_grade'];
                            pastDisaster[3] = pastDisaster[2];
                            pastDisaster[2] = pastDisaster[1];
                            pastDisaster[1] = pastDisaster[0];
                            pastDisaster[0] = results['disaster_grade'];
                            document.getElementById("disastergrade-output-list2").innerHTML= 
                                "<p>Disaster Grade: " + pastDisaster[1] + "</p>"
                            document.getElementById("disastergrade-output-list3").innerHTML= 
                                "<p>Disaster Grade: " + pastDisaster[2] + "</p>"
                            document.getElementById("disastergrade-output-list4").innerHTML= 
                                "<p>Disaster Grade: " + pastDisaster[3] + "</p>"
                        }   
                    )
                    

                // document.getElementById('location-output-text2').setAttribute('hidden', 0)
                document.getElementById('location-output-text2').innerHTML =
                    "Location 2 <br/>" +
                    "Address: " + pastAddys[0]
                    // "Latitude: " + pastLats[1] + "<br/>" +
                    // "Longitude: " + pastLngs[1] + "<br/>" +
                // document.getElementById('location-output-text3').setAttribute('hidden', 0)
                document.getElementById('location-output-text3').innerHTML =
                    "Location 3 <br/>" +
                    "Address: " + pastAddys[1]
                    // "Latitude: " + pastLats[2] + "<br/>" +
                    // "Longitude: " + pastLngs[2] + "<br/>" +
                // document.getElementById('location-output-text4').setAttribute('hidden', 0)
                document.getElementById('location-output-text4').innerHTML =
                    "Location 4 <br/>" +
                    "Address: " + pastAddys[2]
                    // "Latitude: " + pastLats[3] + "<br/>" +
                    // "Longitude: " + pastLngs[3] + "<br/>" +

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
                    "<p>Air Quality Grade: " + results['air_quality_grade'] + "</p>"
                    grades[2] = results['air_quality_grade'];
                    pastAQ[3] = pastAQ[2];
                    pastAQ[2] = pastAQ[1];
                    pastAQ[1] = pastAQ[0];
                    pastAQ[0] = results['air_quality_grade'];
                    document.getElementById("airgrade-output-list2").innerHTML= 
                        "<p>Air Quality Grade: " + pastAQ[1] + "</p>"
                    document.getElementById("airgrade-output-list3").innerHTML= 
                        "<p>Air Quality Grade: " + pastAQ[2] + "</p>"
                    document.getElementById("airgrade-output-list4").innerHTML= 
                        "<p>Air Quality Grade: " + pastAQ[3] + "</p>"
                }   
            )
        
        setTimeout(() => fetch("https://hack-backend.ducoterra.net/agg/grade?crime=" + grades[0] + "&disaster=" + grades[1]+ "&air_quality=" + grades[2] )
            .then(res => res.json())
            .then(
                (results) => {
                    console.log("got results")
                    document.getElementById('overall_grade').innerHTML =
                        "<p>Overall Grade:  " + results['agg_grade'] + "  </p>"
                    pastOverall[3] = pastOverall[2];
                    pastOverall[2] = pastOverall[1];
                    pastOverall[1] = pastOverall[0];
                    pastOverall[0] = results['agg_grade'];
                    document.getElementById("overall_grade2").innerHTML= 
                        "<p>Overall Grade: " + pastOverall[1] + "</p>"
                    document.getElementById("overall_grade3").innerHTML= 
                        "<p>Overall Grade: " + pastOverall[2] + "</p>"
                    document.getElementById("overall_grade4").innerHTML= 
                        "<p>Overall Grade: " + pastOverall[3] + "</p>"
                }
            ), 500);

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
                        containerElement={<div style={{ height: `60vh` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
                <div className="locations">
                    <div className="location">
                        <p id="location-output-text">
                            Location 1 <br/>
                            Address: <br/>
                            Crime Grade: <br/>
                            Air Quality Grade: <br/>
                            Disaseter Grade: <br/>
                            Overall Grade: <br/>
                        </p>
                        <p id="crimegrade-output-list"></p>
                        <p id="airgrade-output-list"></p>
                        <p id="disastergrade-output-list"></p>
                        <p id="overall_grade" className="overall"></p>
                    </div>
                     <div className="location">
                        <p id="location-output-text2">
                            Location 2 <br/>
                            Address: <br/>
                            Crime Grade: <br/>
                            Air Quality Grade: <br/>
                            Disaseter Grade: <br/>
                            Overall Grade: <br/>
                        </p>
                        <p id="crimegrade-output-list2"></p>
                        <p id="airgrade-output-list2"></p>
                        <p id="disastergrade-output-list2"></p>
                        <p id="overall_grade2" className="overall"></p>
                    </div>
                    <div className="location">
                        <p id="location-output-text3">
                            Location 3 <br/>
                            Address: <br/>
                            Crime Grade: <br/>
                            Air Quality Grade: <br/>
                            Disaseter Grade: <br/>
                            Overall Grade: <br/>
                        </p>
                        <p id="crimegrade-output-list3"></p>
                        <p id="airgrade-output-list3"></p>
                        <p id="disastergrade-output-list3"></p>
                        <p id="overall_grade3" className="overall"></p>
                    </div>
                    <div className="location">
                        <p id="location-output-text4">
                            Location 4 <br/>
                            Address: <br/>
                            Crime Grade: <br/>
                            Air Quality Grade: <br/>
                            Disaseter Grade: <br/>
                            Overall Grade: <br/>
                        </p>
                        <p id="crimegrade-output-list4"></p>
                        <p id="airgrade-output-list4"></p>
                        <p id="disastergrade-output-list4"></p>
                        <p id="overall_grade4" className="overall"></p>
                    </div>
                </div>
            </div>
        )
    }
}
