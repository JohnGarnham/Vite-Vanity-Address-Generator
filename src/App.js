import './App.css';
import React from 'react' 
import {searchAddresses, isHexString, MatchObj} from './findVanityAddress'

const DEFAULT_ITERATIONS = 1000;

export default class VanityAddressForm extends React.Component {

  constructor(props) {
    super(props);

    // Define state
    this.state = {
        // Search parameters
        search: {      
          prefix: '',
          use_prefix: true,
          suffix: '',
          use_suffix: false,
          iterations: DEFAULT_ITERATIONS
        },
        result: {
          output: ''
        }
      };
  }

  // Text in prefix textfield modified
  handlePrefixChanged(event) {
    var search = this.state.search;
    search.prefix  = event.target.value;
    console.log(JSON.stringify(search));
    this.setState({ search: search });
  }

  // Text in suffix textfield modified
  handleSuffixChanged(event) {
    var search = this.state.search;
    search.suffix  = event.target.value;
    console.log(JSON.stringify(search));
    this.setState({ search: search });
  }

  // Text in iterations textfield modified
  handleIterationsChanged(event) {
    var search = this.state.search;
    search.iterations  = event.target.value;
    console.log(JSON.stringify(search));
    this.setState({ search: search });
  }

  // Handle check box change
  handlePrefixCheckboxChanged(event) {
    var search = this.state.search;
    // Toggle use_prefix value
    search.use_prefix = ! search.use_prefix; 
    console.log(JSON.stringify(search));
    this.setState({ search: search });
  }

  handleSuffixCheckboxChanged(event) {
    var search = this.state.search;
    // Toggle use_suffix value
    search.use_suffix = ! search.use_suffix; 
    console.log(JSON.stringify(search));
    this.setState({ search: search });
  }

  // Reset all values
  reset(event) {
    // Set all search terms to their defaults
    var search = this.state.search;
    search.prefix = "";
    search.suffix = "";
    search.use_prefix = false;
    search.use_suffix = false;
    search.iterations = DEFAULT_ITERATIONS;
    this.setState({ search: search });
    // Clear matching count label
    let matchLabel = document.getElementById("matches-found-label");
    if(matchLabel != null) {
      matchLabel.innerHTML = "";
    }
    // Clear output
    var result = this.state.result;
    result.output= "";
    this.setState({ result: result });
  }

  // Generate addresses
  generateAddresses(event) {

    event.preventDefault();

    // Grab search state. Log for debug
    var search = this.state.search;
    console.log(JSON.stringify(search));

    // Grab search parameters
    let prefix = this.state.search.prefix;
    let use_prefix = this.state.search.use_prefix;
    let suffix = this.state.search.suffix;
    let use_suffix = this.state.search.use_suffix;
    let count = this.state.search.iterations;

    // Make sure suffix is valid hex string
    if(! isHexString(search.prefix)) {
      alert("Prefix must be a hex string. Valid characters are 0-9 and A-F.");
      return;
    }
    // Make sure suffix is valid hex string
    if(! isHexString(search.suffix)) {
      alert("Suffix must be a hex string. Valid characters are 0-9 and A-F.");
      return;
    }

    // Call search addresses function
    let matches = searchAddresses(use_prefix,prefix,use_suffix,suffix,count);
    let output = "";

    // Set matches found label
    let labelStr = "";
    if(matches.length == 0) {
      labelStr = output = "No addresses found";
    } else {
      labelStr = matches.length + " matching addresses found";
    }
    console.log(labelStr);
    let matchLabel = document.getElementById("matches-found-label");
    if(matchLabel != null) {
      matchLabel.innerHTML = labelStr;
    }
      
    // Set output textfield
    let seed = "";
    let i = 0;
    for(i = 0; i < matches.length; i++) {
      let match = matches[i];
      output += "Address: " + match.address.address + "\n" +
          "Seed: " + match.seed + "\n" +
          "Private Key: " + match.address.privateKey + "\n" +
          "Public Key: " + match.address.publicKey + "\n" +
          "Original Address: " + match.address.originalAddress + "\n\n";
    }

    // Update output state
    var result = this.state.result;
    result.output = output;
    this.setState({ result: result });
  }

  render() {
  return (
      <div className="root">
        <div className="header">
          <h2>Vite Vanity Address Creator</h2>
        </div>
        <div className="input-section">
          <div className="input-text-row"> 
            <input type="checkbox" className="input-checkbox" id="usePrefix" value={this.state.search.use_prefix} 
              checked={this.state.search.use_prefix} onChange={this.handlePrefixCheckboxChanged.bind(this)}/>
            <label className="input-label">Prefix:</label>
            <input type="text" className="text-input" id="prefix" name="prefix" 
              value={this.state.search.prefix} onChange={this.handlePrefixChanged.bind(this)} />
          </div>
          <div className="input-text-row">
            <input type="checkbox" className="input-checkbox" id="useSuffix" value={this.state.search.use_suffix} 
              checked={this.state.search.use_suffix} onChange={this.handleSuffixCheckboxChanged.bind(this)}/>
            <label className="input-label">Suffix:</label>
            <input type="text" className="text-input" id="suffix" name="suffix" 
                value={this.state.search.suffix} onChange={this.handleSuffixChanged.bind(this)} />
          </div>
          <div className="input-text-row">
            <label className="input-label">Iterations:</label>
            <input type="text" className="text-input-iterations" id="iterations" name="iterations" 
              value={this.state.search.iterations} onChange={this.handleIterationsChanged.bind(this)} />
            <label className="matches-label" name="matches-found-label" id="matches-found-label"></label>
          </div>
        </div>
        <div className="input-button-row">
          <button type="button" className="input-button" name="Generate" onClick={this.generateAddresses.bind(this)}>
            Generate
          </button>
          <button type="button" className="input-button" name="Reset" onClick={this.reset.bind(this)}>
            Reset
          </button>
        </div>
        <div className="output-row">
          <textarea className="textarea-output" id="output" name="output" 
            value={this.state.result.output} readOnly />
        </div>
      </div>
    );
  }

}


