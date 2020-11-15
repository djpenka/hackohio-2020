import React, { Component } from 'react';
import { render } from 'react-dom';
import MapContainer from './MapContainer'; 
import './style.css';

var lati, long;

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <MapContainer />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
