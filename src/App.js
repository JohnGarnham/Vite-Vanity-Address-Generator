import './App.css';
import { Dropdown, DropdownButton, InputGroup, FormControl, Button } from 'react-bootstrap'
import Card from "react-bootstrap/Card";

function App() {

  return (
    <div className="vanity-body">
        <div className="header">
            <h2>Vite Vanity Address Creator</h2>
        </div>

      <div className="input-buttons">
   
          <button type="button" className="button-column" name="Generate"></button>
          <button type="button" className="button-column" name="Reset"></button>
   
      </div>
    </div>
  );
}

export default App;
