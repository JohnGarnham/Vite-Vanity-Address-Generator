import './App.css';
import React, { useState} from 'react' 
import { Dropdown, DropdownButton, InputGroup, FormControl, Button } from 'react-bootstrap'
import Card from "react-bootstrap/Card";

import React from 'react';

export default class VanityAddressForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        address: props.address
    }


  }

  render() {
  return (
      <div className="vanity-body">
        <div className="header">
          <h2>Vite Vanity Address Creator</h2>
        </div>
        <div className="input-text-row"> 
          Prefix: <input type="text" className="text-input" id="prefix" name="prefix" 
            value={myValue}  onChange={(e) => setValue(e.target.value)}/>
        </div>
        <div className="input-text-row">
          Suffix: <input type="text" className="text-input" id="suffix" name="suffix" />
        </div>
        <div className="input-text-row">
          Iterations: <input type="text" className="text-input-iterations" id="iterations" name="iterations" />
        </div>
        <div className="input-button-row">
          <button type="button" className="input-button" name="Generate" onClick={generateAddresses}>
            Generate
          </button>
          <button type="button" className="input-button" name="Reset">
            Reset
          </button>
        </div>
        <div className="output-row">
          <textarea className="textarea-output" id="output" name="output" readOnly />
        </div>
      </div>
    );
  }

}

// Generate addresses
function generateAddresses() {
  
  let prefix = "";
  let suffix = "";
  let count = 100;
  
  this.setState(prevState => ({
    isToggleOn: !prevState.isToggleOn
  }));

  // Call search addresses function
  let address = search(prefix,suffix,count);
  // If empty string returned, no matches found
  if(!str || str.length === 0) {

  } else {

  }

}
