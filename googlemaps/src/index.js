// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import MapContainer from './MapContainer'; 
// import './style.css';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: 'React'
//     };
//   }

//   render() {
//     return (
//       <div>
//         <MapContainer  />
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById('root'));

import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map";

import "./styles.css";

const data = [
  {
    name: "Sydney",
    title: "Sydney",
    lat: -33.847927,
    lng: 150.6517938,
    id: 1
  },
  {
    name: "Melbourne",
    title: "Melbourne",
    lat: -37.9722342,
    lng: 144.7729561,
    id: 2
  },
  {
    name: "Perth",
    title: "Perth",
    lat: -31.9546904,
    lng: 115.8350292,
    id: 3
  }
];

function App() {
  return <Map places={data} center={{ lat: -24.9923319, lng: 135.2252427 }} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
