import './App.css';
import { Dropdown, DropdownButton, InputGroup, FormControl, Button} from 'react-bootstrap'

function App() {

  this.workers = []
  this.addressesCount = 0
  this.countDiff = 0
  this.nextReport = 0
  this.stopped = false
  this.maxThreads = 0 //m ax allowed threads: logical cores minus 1
  this.threads = 0
  this.cpuPower = [0.25, 0.5, 0.75, 1]

  // Address init dropdown titles
  this.inits = [
    '1 or 3',
    '1',
    '3',
  ]

  this.state = {
    initChar: '', // 1 or 3
    prefix: '',
    suffix: '',
    validPrefix: false,
    validSuffix: false,
    prepend: true,
    generating: false,
    outputArray: [],
    output: '',
    prefixMultiplier: 1, // 2 if the initChar is 1 or 3
    addressesFound: 0,
    activeInit: this.inits[0],
    activeInitId: '0', // 0=Begin address with 1 or 3, 1=begin with 1, 2=begin with 3
    workersRunning: 0,
    generateText: 'Generate',
    maxWallets: 100,
    validMaxWallets: true,
    selectedOption: '3',
    stats: {
      aps: 0, //speed addresses per second
      estimatedDuration: 0, //estimated time to find address
      addressesCount: 0,  //total checked addresses
    }
  }

  return (
    <div className="App">
 <div>
        <p>Generates wallets that matches the address PREFIX/SUFFIX specified</p>
        <ul>
          <li>See this <a href="https://medium.com/nanocurrency/how-to-create-a-custom-nano-account-at-maximum-speed-cd9be0045ead">guide</a> for how to obtain higher speed</li>
        </ul>

        <InputGroup size="sm" className="mb-2">
          <InputGroup.Prepend className="narrow-prepend">
            <DropdownButton
              variant="light"
              className="dropdown-prepend dropdown-prepend-narrow"
              title={this.state.activeInit}
              key={this.state.activeInitId}
              id={`dropdown-basic-${this.state.activeInitId}`}>
              {this.inits.map(function(init, index){
                return <Dropdown.Item eventKey={index} key={index} onSelect={this.selectInit}>{init}</Dropdown.Item>;
              }.bind(this))}
            </DropdownButton>
          </InputGroup.Prepend>
          <FormControl id="prefix" aria-describedby="prefix" value={this.state.prefix} title="Any chars a-z and 0-9 except 0(zero), 2, L or V. Leave empty to ignore." placeholder="Match address start" maxLength="30" onChange={this.handlePrefixChange} autoComplete="off"/>
          <InputGroup.Append>
            <Button variant="outline-secondary" className="fas fa-times-circle" value='prefix' onClick={this.clearText}></Button>
          </InputGroup.Append>

          <InputGroup.Prepend className="multi-group narrow-prepend">
            <InputGroup.Text id="sufffix">
              Suffix
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="sufffix" aria-describedby="sufffix" value={this.state.suffix} title="Any chars a-z and 0-9 except 0(zero), 2, L or V. Leave empty to ignore." placeholder="Match address end" maxLength="30" onChange={this.handleSuffixChange} autoComplete="off"/>
          <InputGroup.Append>
            <Button variant="outline-secondary" className="fas fa-times-circle" value='suffix' onClick={this.clearText}></Button>
          </InputGroup.Append>
        </InputGroup>

        <table className="vanity-stats">
          <tbody>
            <tr>
              <td className="vanity-number">nano_{this.state.activeInitId === '0' ? '(':''}{this.state.activeInit}{this.state.activeInitId === '0' ? ')':''}{this.state.prefix + '......' + this.state.suffix}</td>
            </tr>
          </tbody>
        </table>

        <InputGroup size="sm" className="mb-3 count-input">
          <InputGroup.Prepend className="narrow-prepend">
            <InputGroup.Text id="maxwallets">
              Wallets
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="maxwallets" aria-describedby="maxwallets" value={this.state.maxWallets} title="Number of keypairs to generate." maxLength="5" onChange={this.handleMaxWalletsChange} autoComplete="off"/>
          <InputGroup.Append>
            <Button variant="outline-secondary" className="max-btn" onClick={this.setMax}>Max</Button>
          </InputGroup.Append>
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
          <div className="gpu-load-title">CPU Load:</div>
          <div className="form-check form-check-inline index-checkbox">
            <input className="form-check-input" type="radio" id="send-check" value="0" disabled={this.state.generating} checked={this.state.selectedOption === "0"} onChange={this.handleOptionChange}/>
            <label className="form-check-label" htmlFor="send-check">25%</label>
          </div>
          <div className="form-check form-check-inline index-checkbox">
            <input className="form-check-input" type="radio" id="receive-check" value="1" disabled={this.state.generating} checked={this.state.selectedOption === "1"} onChange={this.handleOptionChange}/>
            <label className="form-check-label" htmlFor="receive-check">50%</label>
          </div>
          <div className="form-check form-check-inline index-checkbox">
            <input className="form-check-input" type="radio" id="open-check" value="2" disabled={this.state.generating} checked={this.state.selectedOption === "2"} onChange={this.handleOptionChange}/>
            <label className="form-check-label" htmlFor="open-check">75%</label>
          </div>
          <div className="form-check form-check-inline index-checkbox">
            <input className="form-check-input" type="radio" id="change-check" value="3" disabled={this.state.generating} checked={this.state.selectedOption === "3"} onChange={this.handleOptionChange}/>
            <label className="form-check-label" htmlFor="change-check">100%</label>
          </div>
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
          <Button className="btn-medium" variant="primary" onClick={this.generate} disabled={(!this.state.validPrefix && !this.state.validSuffix) || (!this.state.generating && this.state.workersRunning > 0) || this.state.addressesFound >= this.state.maxWallets}>{this.state.generateText}</Button>
          <Button className="btn-medium" variant="primary" onClick={this.reset} disabled={this.state.generating}>Reset</Button>
        </InputGroup>

        <table className="vanity-stats">
          <tbody>
            <tr>
              <td>Speed [checks/s]</td>
              <td className="vanity-number">{String(this.state.stats.aps)}</td>
            </tr>
            <tr>
              <td>Addresses Checked</td>
              <td className="vanity-number">{String(this.state.stats.addressesCount)}</td>
            </tr>
            <tr>
              <td>Estimated time per address</td>
              <td className="vanity-number">{this.state.stats.estimatedDuration}</td>
            </tr>
            <tr>
              <td>Addresses Found</td>
              <td className="vanity-number">{String(this.state.addressesFound)}</td>
            </tr>
          </tbody>
        </table>

        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend className="narrow-prepend">
            <InputGroup.Text id="output">
              JSON
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="output-area" aria-describedby="output" as="textarea" rows="6" placeholder="" value={this.state.output} readOnly/>
        </InputGroup>
      </div>
    </div>
  );
}

export default App;
