import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
    </div>
  )
}

const CountryList = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShowCountry(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country.capital && country.capital[0]) {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY
      if (apiKey) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`)
          .then(response => {
            setWeather(response.data)
          })
          .catch(error => {
            console.log('Error fetching weather:', error)
          })
      }
    }
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital ? country.capital[0] : 'N/A'}</div>
      <div>area {country.area}</div>
      
      <h3>languages:</h3>
      <ul>
        {country.languages && Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      
      <img 
        src={country.flags.png} 
        alt={`flag of ${country.name.common}`}
        style={{ width: '150px', border: '1px solid black' }}
      />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <div>temperature {weather.main.temp} Celsius</div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (search) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredCountries(filtered)
    } else {
      setFilteredCountries([])
    }
  }, [search, countries])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleShowCountry = (country) => {
    setFilteredCountries([country])
    setSearch(country.name.common)
  }

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      {search && (
        <CountryList 
          countries={filteredCountries} 
          handleShowCountry={handleShowCountry}
        />
      )}
    </div>
  )
}

export default App
