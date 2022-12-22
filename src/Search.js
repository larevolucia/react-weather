import React, { useState } from "react";
import axios from "axios";
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

  function handleSubmit(event) {
    event.preventDefault();
    const apiKeyWeather = "6bf5993fd6f246de7b98dc6c43d6cd79";
    const apiWeatherEndPoint =
      "https://api.openweathermap.org/data/2.5/weather";
    const apiUrl = `${apiWeatherEndPoint}?q=${city}&units=metric&appid=${apiKeyWeather}`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        alert("Ops! We couldn't find that city.");
      });
  }

  function defineCity(event) {
    setCity(event.target.value);
  }
  return (
    <div className="Search">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-1"
          type="search"
          placeholder="Enter a city"
          autoFocus={true}
          onChange={defineCity}
        />
        <input className="btn btn-dark m-1" type="submit" value="Search" />
      </form>
      <Weather data={weatherData} />
    </div>
  );
}
