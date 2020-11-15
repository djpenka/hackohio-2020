import React from 'react';
import Geocode from "react-geocode";

export default class AutoCompleteText extends React.Component {
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
        return(
            <div className="search">
                <input style={{height:50, width:1000}} value={text} onChange={this.onTextChanged} type="text" />
            
                {this.renderSuggestions()}
                <button style={{height:55, width:100}} onClick={this.convertAddressToCoords}>Search</button>
                
            </div>
        )
    }
}