import './App.css';

import React from 'react' 
import {isHexString} from './helper'

/* eslint import/no-webpack-loader-syntax: off */
import Worker from "worker-loader!./worker.js";
var webWorker = new Worker();

const DEFAULT_ITERATIONS = 5000;

export default class VanityAddressForm extends React.Component {

  constructor(props) {
    super(props);

    // Define state
    this.state = {
        running: false,
        // Search parameters
        search: {      
          prefix: '',
          use_prefix: true,
          suffix: '',
          use_suffix: false,
          iterations: DEFAULT_ITERATIONS
        },
        // Output result
        result: {
          output: '',
          matches: 0,
          iterations: 0
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
    // Clear output
    var result = this.state.result;
    result.output= "";
    result.matches = 0;
    result.iterations = 0;
    this.setState({ result: result });
  }

  // Stop button pressed
  stop(event) {
    // Update running to false
    var state = this.state;
    state.running = false;
    this.setState({ state : state});
    // Terminate worker
    webWorker.terminate();
    // Reinstantiate
    webWorker = new Worker();
  }

  // Generate addresses
  generateAddresses(event) {

    event.preventDefault();

    // Clear output
    var state = this.state;

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

    // Pass in search parameters to webworker
    webWorker.postMessage( { use_prefix: use_prefix, prefix: prefix, use_suffix: use_suffix, suffix:suffix, count:count });

    webWorker.onerror = (e) => {
      console.log(e);
    };

    webWorker.addEventListener('message', (e) => {

      // Update output state
      var state = this.state;
      var result = this.state.result;
      var output = result.output;
      var numberMatches = result.matches;

      // Parse match structure from message
      var message = JSON.parse(e.data);
      if(message.action == "MATCH") {
        var match = message.data;
        output += "Match #" + (numberMatches + 1) + "\n" +
            "Address: " + match.address.address + "\n" +
            "Seed: " + match.seed + "\n" +
            "Private Key: " + match.address.privateKey + "\n" +
            "Public Key: " + match.address.publicKey + "\n" +
            "Original Address: " + match.address.originalAddress + "\n\n";
        result.matches = numberMatches + 1;
        result.output = output;
        console.log('Worker added match: ', match);
      } else if(message.action == "COUNT") {
        var count = message.data;
        result.iterations = count;
      } else if(message.action == "END") {
        // Work has ended. Update final count.
        var count = message.data;
        result.iterations = count;
        // Set running to false
        state.running = false;
      } else if(message.action == "START") {
        // Clear previous search's state
        result.iterations = 0;
        result.output = ""
        result.matches = 0;
        // Set running to true
        state.running = true;
      } else {
        console.log("Worker received unknown action: ", message);
      }
      // Update state
      state.result = result;
      this.setState({ state : state });
    }, false);

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
            <label className="matches-label" name="matches-found-label" id="matches-found-label">
              {this.state.result.matches} matches out of {this.state.result.iterations}</label>
          </div>
        </div>
        <div className="input-button-row">
          <button type="button" className="input-button" name="Generate" 
            onClick={this.generateAddresses.bind(this)} disabled={this.state.running}>
            Generate
          </button>
          <button type="button" className="input-button" name="Reset" 
          onClick={this.reset.bind(this)} disabled={this.state.running}>
            Reset
          </button>
          <button type="button" className="input-button" name="Stop" 
            onClick={this.stop.bind(this)} disabled={! this.state.running}>
            Stop
          </button>
        </div>
        <div className="output-row">
          <textarea className="textarea-output" id="output" name="output" 
            value={this.state.result.output} readOnly />
        </div>
        <footer>
          Email: <a className="footer-link" href="mailto:john.e.garnham@gmail.com">john.e.garnham@gmail.com</a> 
          Twitter: <a className="footer-link"  href="https://twitter.com/ViNoDevErik">ViNoDevErik</a>
          Source: <a className="footer-link"  href="https://github.com/JohnGarnham/Vite-Vanity-Address-Generator">
            https://github.com/JohnGarnham/Vite-Vanity-Address-Generator
            </a>
        </footer>
      </div>
    );
  }

}


