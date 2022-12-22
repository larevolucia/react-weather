import React from "react";
import "./WeatherInfo.css";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo row">
      <div className="col-6">
        <span className="temp-current">{Math.round(props.celsius)}</span>
        <span className="unit">°C</span>
      </div>
      <div className="col-6">
        <ul className="mt-2">
          <li className="text-capitalize">{props.description}</li>
          <li>Wind: {Math.round(props.wind)} km/h</li>
          <li>Humidity: {props.humidity}%</li>
        </ul>
      </div>
    </div>
  );
}
