import React, { useState } from 'react'
const api = {
  key: "d9370cf81c44dc3900380fcc44da127d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // evt === event
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  // Builds current date
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 65) ? 'App warm' : 'App') : 'App'}>
      <main>
        {/* Search queries Openweathermap's API for current city weather */}
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search..."
            /* The query changes to the value that is written in the search box */
            onChange={e => setQuery(e.target.value)}
            value={query}
            /* Allows the search function to occur again after a search has been completed. */
            onKeyPress={search}>
          </input>
        </div>
        {/* If there is a city, display weather. If not, display message to prompt user to search a city. */}
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°F
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : ( // If no city: 
            <div>
              <p className="no-city-message">Please enter a city above for current weather.</p>
            </div>)}
      </main>
    </div>
  )
}

export default App