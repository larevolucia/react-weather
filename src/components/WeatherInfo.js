// Modify WeatherInfo.js
import React from "react";
import "../styles/Weather.css";
import WeatherIcon from "./WeatherIcon";
import { celsiusToFahrenheit } from "./temperatureConversion";

export default function WeatherInfo({
  celsius,
  icon,
  description,
  wind,
  humidity,
  feelsLike,
  unit,
  onUnitChange
}) {
  let temperature = celsius;
  let feelsLikeTemp = feelsLike;

  if (unit === "fahrenheit") {
    temperature = celsiusToFahrenheit(celsius);
    feelsLikeTemp = celsiusToFahrenheit(feelsLike);
  }
  function getFahrenheit(event) {
    event.preventDefault();
    onUnitChange("fahrenheit");
  }

  function getCelsius(event) {
    event.preventDefault();
    onUnitChange("celsius");
  }

  return (
    <div className="WeatherInfo row mt-3">
      <div id="current-temperature" className="col-6">
        <div className="weather-info-container">
          <WeatherIcon icon={icon} size={42} />
          <span className="temp-current">{Math.round(temperature)}°</span>
          <span className="unit">
            <button
              onClick={getCelsius}
              className={unit === "fahrenheit" ? "active" : ""}
              disabled={unit === "celsius"}
            >
              C
            </button>
          </span>
          |
          <span className="unit">
            <button
              onClick={getFahrenheit}
              className={unit === "celsius" ? "active" : ""}
              disabled={unit === "fahrenheit"}
            >
              F
            </button>
          </span>
        </div>
        <div>{description}</div>
      </div>
      <div id="details" className="col-6">
        <table className="details-table table">
          <tbody>
            <tr>
              <th scope="row">Feels Like</th>
              <td>{Math.round(feelsLikeTemp)}°</td>
            </tr>
            <tr>
              <th scope="row">Humidity</th>
              <td>{humidity}%</td>
            </tr>
            <tr>
              <th scope="row">Wind</th>
              <td>
                {Math.round(wind)} <span className="wind-unit">km/h</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
