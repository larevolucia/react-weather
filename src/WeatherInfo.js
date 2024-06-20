// Modify WeatherInfo.js
import React from "react";
import "./styles/Weather.css";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo({
  celsius,
  icon,
  description,
  wind,
  humidity,
  feelsLike
}) {
  return (
    <div className="WeatherInfo row mt-3">
      <div id="current-temperature" className="col-6">
        <div className="weather-info-container">
          <WeatherIcon icon={icon} size={42} />
          <span className="temp-current">{Math.round(celsius)}°</span>
          <span className="unit">C</span>
        </div>
      </div>
      <div id="details" className="col-6">
        <table className="details-table table">
          <tbody>
            <tr>
              <th scope="row">Feels Like</th>
              <td>{Math.round(feelsLike)}°</td>
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
