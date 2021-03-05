import React, { Component } from 'react'
import './App.css'

function City (props) {
  return (
    <div className='card mx-auto'>
      <div className='card-header'>
        <h5 className='card-title' key={props.recordNumber}>
          {props.locationText}
        </h5>
      </div>
      <div className='card-body'>
        <ul className='card-text'>
          <li>State: {props.state}</li>
          <li>
            Location: ({props.lat}, {props.long})
          </li>
          <li>Population (estimated): {props.population}</li>
          <li>Total Wages: {props.wages}</li>
        </ul>
      </div>
    </div>
  )
}

function ZipSearchField ({ onZipChange }) {
  return (
    <form className='form-group form-inline d-flex justify-content-center zip-search'>
      <label>Zip Code:</label>
      <input className='form-control' type='text' onChange={onZipChange} />
    </form>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      zipCode: '',
      cities: []
    }
  }

  zipChanged (e) {
    let zipCode = e.target.value;

    const regex = new RegExp('^[0-9]*$')

    if (zipCode.length === 5 && regex.test(zipCode)) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
        .then(response => response.json())
        .then(data => this.setState({ cities: data }))
        .catch(error => console.log(error))
    } else {
      this.setState({ cities: [] })
    }

    this.setState({ zipCode })
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Zip Code Search</h2>
        </div>
        <div className='App-body'>
          <ZipSearchField onZipChange={e => this.zipChanged(e)} />
          <div>
            {this.state.cities.length > 0 ?
              this.state.cities.map(city => (
                <City
                  key={city.RecordNumber}
                  locationText={city.LocationText}
                  state={city.State}
                  lat={city.Lat}
                  long={city.Long}
                  population={city.EstimatedPopulation}
                  wages={city.TotalWages}
                />
              ))
              : <p className="no-results">No results</p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
