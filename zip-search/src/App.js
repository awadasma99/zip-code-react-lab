import React, { Component } from 'react'
import './App.css'

function City(props) {
  return (
    <div>
      <h3 key={props.recordNumber}>{props.locationText}</h3>
      <ul>
        <li>State: {props.state}</li>
        <li>Location: ({props.lat}, {props.long})</li>
        <li>Population (estimated): {props.population}</li>
        <li>Total Wages: {props.wages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField({ onZipChange }) {
  return (
    <form className="form-group form-inline">
      <label>Zip Code:</label>
      <input className="form-control" type="text" onChange={onZipChange} />
    </form>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  async zipChanged(e) {
    await this.setState({
      zipCode: e.target.value
    })

    fetch('http://ctp-zip-api.herokuapp.com/zip/' + this.state.zipCode)
    .then(response => response.json())
    .then(data => this.setState({ cities: data }))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="App-body">
          <ZipSearchField onZipChange={(e) => this.zipChanged(e)} />
          <div>
            {this.state.cities &&
            this.state.cities.map(
              city => 
              <City
                key={city.RecordNumber}
                locationText={city.LocationText} 
                state={city.State}
                lat={city.Lat}
                long={city.Long}
                population={city.EstimatedPopulation}
                wages={city.TotalWages}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;