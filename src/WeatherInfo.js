import React, { useState } from "react";
import "./WeatherInfo.css";

export default function WeatherInfo(props) {
  const [unit, setUnit] = useState("metric");
  function changeToImperial(event) {
    event.preventDefault();
    setUnit("imperial");
  }

  function changeToMetric(event) {
    event.preventDefault();
    setUnit("metric");
  }
  if (unit === "metric") {
    return (
      <div className="WeatherInfo row">
        <div className="col-6">
          <span className="temp-current">{Math.round(props.celsius)}</span>
          <span className="unit">
            °C |{" "}
            <a href="/" onClick={changeToImperial}>
              °F
            </a>
          </span>
        </div>
        <div className="col-6 text-start">
          <ul className="mt-2">
            <li className="text-capitalize">{props.description}</li>
            <li>Wind: {Math.round(props.wind)} km/h</li>
            <li>Humidity: {props.humidity}%</li>
          </ul>
        </div>
      </div>
    );
  } else {
    let fahrenheitTemp = Math.round((props.celsius * 9) / 5 + 32);
    let windImperial = Math.round(props.wind / 1.609);
    return (
      <div className="WeatherInfo row">
        <div className="col-6">
          <span className="temp-current">{fahrenheitTemp}</span>
          <span className="unit">
            <a href="/" alt="Fahrenheit" onClick={changeToMetric}>
              °C
            </a>{" "}
            | °F
          </span>
        </div>

        <div className="col-6">
          <ul className="mt-2">
            <li className="text-capitalize">{props.description}</li>
            <li>Wind: {windImperial} mph</li>
            <li>Humidity: {props.humidity}%</li>
          </ul>
        </div>
      </div>
    );
  }
}
