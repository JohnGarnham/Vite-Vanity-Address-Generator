import './App.css';
import React from 'react' 
import {searchAddresses} from './findVanityAddress'


export default class VanityAddressForm extends React.Component {

  constructor(props) {
    super(props);

    // Define state
    this.state = {
        // Search parameters
        search: {      
          prefix: '',
          use_prefix: false,
          suffix: '',
          use_suffix: false,
          iterations: 10000
        },
        result: {
          address: ''
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

  // Generate addresses
  generateAddresses(event) {

    event.preventDefault();

    var search = this.state.search;
    search.iterations  = event.target.value;

    console.log(JSON.stringify(search));

    let prefix = this.state.search.prefix;
    let use_prefix = this.state.search.use_prefix;
    let suffix = this.state.search.suffix;
    let use_suffix = this.state.search.suffix;
    let count = this.state.search.iterations;

    console.log("Searching " + count + " addresses with prefix \"" + prefix + "\" and suffix \"" + suffix + "\"");
    
    // Call search addresses function
    let addr = searchAddresses(use_prefix,prefix,use_suffix,suffix,count);
    // If empty string returned, no matches found
    if(!addr || addr.length === 0) {
      console.log("No addresses found");
    } else {
      console.log("Address found ", addr);
    }
    // Set the result of the search
    var result = this.state.result;
    result.address  = addr;
    this.setState({ result: result });
  }

  render() {
    console.log("In render");
  return (
      <div className="vanity-body">
        <div className="header">
          <h2>Vite Vanity Address Creator</h2>
        </div>
        <div className="input-section">
          <div className="input-text-row"> 
            <input type="checkbox" className="input-checkbox" id="usePrefix" value={this.state.search.use_prefix} 
              onChange={this.handlePrefixCheckboxChanged.bind(this)}/>
            <label className="input-label">Prefix:</label>
            <input type="text" className="text-input" id="prefix" name="prefix" 
              value={this.state.search.prefix} onChange={this.handlePrefixChanged.bind(this)} />
          </div>
          <div className="input-text-row">
            <input type="checkbox" className="input-checkbox" id="useSuffix" value={this.state.search.use_suffix} 
              onChange={this.handleSuffixCheckboxChanged.bind(this)}/>
            <label className="input-label">Suffix:</label>
            <input type="text" className="text-input" id="suffix" name="suffix" 
                value={this.state.search.suffix} onChange={this.handleSuffixChanged.bind(this)} />
          </div>
          <div className="input-text-row">
          <label className="input-label">Iterations:</label>
            <input type="text" className="text-input-iterations" id="iterations" name="iterations" 
              value={this.state.search.iterations} onChange={this.handleIterationsChanged.bind(this)} />
          </div>
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
          <textarea className="textarea-output" id="output" name="output" value={JSON.stringify(this.state.result.address)} readOnly />
        </div>
      </div>
    );
  }

}


