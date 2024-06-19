import React, { useState } from "react";
import axios from "axios";
import "./styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import Weather from "./Weather";

export default function Search() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({ ready: false });

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      coordinates: response.data.coord,
      date: response.data.dt,
      icon: response.data.weather[0].icon,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      minTemperature: response.data.main.temp_min,
      maxTemperature: response.data.main.temp_max,
      feelsLike: response.data.main.feels_like,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity
    });
  }

  const handleSubmit = async (event) => {
    console.log(city);
    event.preventDefault();
    try {
      const apiKeyWeather = "6bf5993fd6f246de7b98dc6c43d6cd79";
      const apiWeatherEndPoint =
        "https://api.openweathermap.org/data/2.5/weather";
      const apiUrl = `${apiWeatherEndPoint}?q=${city}&units=metric&appid=${apiKeyWeather}`;
      const response = await axios.get(apiUrl);
      handleResponse(response);
    } catch (error) {}
  };
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <main className="Search">
      <form
        className="search-form shadow-sm p-3 mb-3 bg-body rounded"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-3-col">
          <input
            className="form-control"
            id="input"
            type="search"
            value={city}
            placeholder="Search for a city"
            onChange={handleCityChange}
            autoComplete="off"
          />
          <button className="search-button" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button className="search-button" type="button">
            <FontAwesomeIcon icon={faLocationDot} />
          </button>
        </div>
      </form>
      <Weather data={weatherData} />
    </main>
  );
}
