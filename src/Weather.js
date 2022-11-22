import React from "react";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

export default function Weather(props) {
  const icon = `http://openweathermap.org/img/wn/${props.data.icon}@2x.png`;
  if (props.data.ready) {
    return (
      <div className="Weather border rounded-2 p-2">
        <div className="row justify-content-evenly">
          <div className="col-6">
            <h2>{props.data.city}</h2>
            <h3>
              <FormattedDate date={props.data.date} />
            </h3>
            <div className="d-flex justify-content-start">
              <img
                src={icon}
                alt={props.data.description}
                className="img-fluid"
                width="80"
              />
              <span className="temp-current">
                {Math.round(props.data.temperature)}
                °C
              </span>
            </div>
          </div>
          <div className="col-6">
            <ul className="mt-5">
              <li>{props.data.description}</li>
              <li>
                {Math.floor(props.data.minTemperature)}° /{" "}
                {Math.ceil(props.data.maxTemperature)}°
              </li>
              <li>Feels like {Math.round(props.data.feelsLike)}°</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
