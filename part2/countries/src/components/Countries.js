import { useEffect, useState } from 'react'
import axios from 'axios'

export const Filter = ({ filter, handleFilterChange }) =>
  <div>
    find countries <input
      value={filter}
      onChange={handleFilterChange}
    />
  </div>

const Weather = ({ capital, weather }) => {
    if (!weather.hasOwnProperty('weather')) {
      return (
        <></>
      )
    }
    else {
      return (
        <>
          <h1>Weather in {capital}</h1>
          <>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</>
          <br />
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={capital} />
          <br />
          <>wind {weather.wind.speed} m/s</>
        </>
      )
    }
  }
  
  const Country = ({ country }) => {
  
    const [weather, setWeather] = useState({})
  
    const api_key = process.env.REACT_APP_API_KEY
  
    useEffect(() => {
      
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
        .then(response => {
          console.log('promise fulfilled')
          setWeather(response.data)
        })
    }, [])
  
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <p><strong>languages:</strong></p>
        <ul>
          {
            Object.entries(country.languages).map(([k, v], i) =>
              <li key={i}>{v}</li>
            )
          }
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
        <Weather capital={country.capital[0]} weather={weather} />
      </>
    )
  }
  
  export const Countries = ({ countries, showAll, setShowAll }) => {
    if (countries.length === 0) {
      return (
        <>
          Search for a country
        </>
      )
    }
    else if (countries.length > 10) {
      return (
        <>
          Too many matches, specify another filter
        </>
      )
    }
    else if (countries.length <= 10 && countries.length > 1 && showAll.state) {
      return (
        <>
          {countries.map((country, i) =>
            <div key={i}>
              {country.name.common} <button onClick={() => {
                setShowAll(
                  {
                    state: false,
                    index: i
                  }
                );
              }}>show</button>
              <br />
            </div>
          )}
        </>
      )
    }
    else if (countries.length <= 10 && countries.length > 1 && !showAll.state) {
      return (
        <>
          <button onClick={() => {
            setShowAll(
              {
                state: true,
                index: -1
              }
            );
          }}>show all</button>
          <Country country={countries[showAll.index]}  />
        </>
      )
    }
    else {
      return (
        <>
          <Country country={countries[0]}  />
        </>
      )
    }
  }
 
