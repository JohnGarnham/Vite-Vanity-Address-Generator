import './App.css';
import { Dropdown, DropdownButton, InputGroup, FormControl, Button } from 'react-bootstrap'
import Card from "react-bootstrap/Card";

function App() {

  return (
    <div className="vanity-body">
      <div className="header">
        <h2>Vite Vanity Address Creator</h2>
      </div>
      <div className="input-text-row">
        Prefix: <input type="text" className="text-input" id="prefix" name="prefix" />
      </div>
      <div className="input-text-row">
        Suffix: <input type="text" className="text-input" id="suffix" name="suffix" />
      </div>
      <div className="input-text-row">
        Iterations: <input type="text" className="text-input-iterations" id="iterations" name="iterations" />
      </div>
      <div className="input-button-row">
        <button type="button" className="input-button" name="Generate">
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

export default App;
