import React, { Component } from 'react'
import './App.css'

function ZipCodeList (props) {
  return (
    <div className='card mx-auto'>
      <div className='card-header'>
        <h5 className='card-title'>
          Results: 
        </h5>
      </div>
      <div className='card-body'>
        <ul className='card-text'>
          {props.zipcodes.map(zipcode => <li>{zipcode}</li>)}
        </ul>
      </div>
    </div>
  )
}

function CitySearchField ({ onCityChange }) {
  return (
    <form className='form-group form-inline d-flex justify-content-center zip-search'>
      <label>City Name:</label>
      <input className='form-control' type='text' onChange={onCityChange} />
    </form>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cityName: '',
      zipcodes: []
    }
  }

  cityChanged (e) {
    let cityName = e.target.value;

    const regex = new RegExp(/^[a-zA-Z\s]+$/ig)

    if (regex.test(cityName)) {
      let formattedCityName = encodeURI(cityName.toUpperCase())
      fetch(`http://ctp-zip-api.herokuapp.com/city/${formattedCityName}`)
        .then(response => response.json())
        .then(data => this.setState({ zipcodes: data }))
        .catch(error => this.setState({ zipcodes: [] }))
    } else {
      this.setState({ zipcodes: [] })
    }

    this.setState({ cityName })
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>City Search</h2>
        </div>
        <div className='App-body'>
          <CitySearchField onCityChange={e => this.cityChanged(e)} />
          <div>
            {this.state.zipcodes.length > 0 
              ? <ZipCodeList zipcodes={this.state.zipcodes} />
              : <p className="no-results">No results</p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
