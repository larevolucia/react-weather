import React from "react";
import "./Weather.css";

export default function Weather(props) {
  const icon = `http://openweathermap.org/img/wn/${props.data.icon}@2x.png`;
  if (props.data.ready) {
    return (
      <div className="Weather">
        <h2>{props.data.city} </h2>
        <img src={icon} alt={props.data.description} />
        <ul>
          <li>
            <strong>Temperature:</strong> {Math.round(props.data.temperature)}°C
          </li>
          <li>
            <strong>Description:</strong> {props.data.description}
          </li>
          <li>
            <strong>Humidity:</strong> {props.data.humidity}%
          </li>
          <li>
            <strong>Wind Speed:</strong> {Math.round(props.data.wind)} km/h
          </li>
        </ul>
      </div>
    );
  }
}
