import './App.css';
import React from 'react' 
import {search} from './findVanityAddress'


export default class VanityAddressForm extends React.Component {

  constructor(props) {
    super(props);
    // Define state
    this.state = {
        search: {
          prefix: props.prefix,
          suffix: props.suffix,
          iterations: props.iterations,
          address: props.address
        }
    }
    // Set default state
    this.state = { search: { prefix: '', suffix: '', iterations: 0, address: ''} };
  }

  handlePrefixChanged(event) {
    var search = this.state.search;
    search.prefix  = event.target.value;
    this.setState({ search: search });
  }

  handleSuffixChanged(event) {
    var search = this.state.search;
    search.suffix  = event.target.value;
    this.setState({ search: search });
  }

  handleIterationsChanged(event) {
    var search = this.state.search;
    search.iterations  = event.target.value;
    this.setState({ search: search });
  }

  // Generate addresses
  generateAddresses() {
    
    console.log("Hello world!");

    let prefix = this.state.search.prefix;
    let suffix = this.state.search.suffix;
    let count = this.state.search.count;

    console.log("Searching " + count + " addresses with prefix \"" + prefix + "\" and suffix \"" + suffix + "\"");
    
    // Call search addresses function
    let addr = search(prefix,suffix,count);
    // If empty string returned, no matches found
    if(!addr || addr.length === 0) {
      console.log("No addresses found");
    } else {
      console.log("Address found ", addr);
    }

  }

  render() {
    console.log("In render");
  return (
      <div className="vanity-body">
        <div className="header">
          <h2>Vite Vanity Address Creator</h2>
        </div>
        <div className="input-text-row"> 
          Prefix: <input type="text" className="text-input" id="prefix" name="prefix" 
             value={this.state.search.prefix} onChange={this.handlePrefixChanged.bind(this)} />
        </div>
        <div className="input-text-row">
          Suffix: <input type="text" className="text-input" id="suffix" name="suffix" 
              value={this.state.search.suffix} onChange={this.handleSuffixChanged.bind(this)} />
        </div>
        <div className="input-text-row">
          Iterations: <input type="text" className="text-input-iterations" id="iterations" name="iterations" 
            value={this.state.search.iterations} onChange={this.handleIterationsChanged.bind(this)} />
        </div>
        <div className="input-button-row">
          <button type="button" className="input-button" name="Generate" onClick={this.generateAddresses.bind(this)}>
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


