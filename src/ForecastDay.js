import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./styles/Weather.css";
import FormattedDay from "./FormattedDay";
import { celsiusToFahrenheit } from "./temperatureConversion";

export default function ForecastDay(props) {
  const { unit, data } = props;
  const maxTemp =
    unit === "fahrenheit" ? celsiusToFahrenheit(data.temp.max) : data.temp.max;
  const minTemp =
    unit === "fahrenheit" ? celsiusToFahrenheit(data.temp.min) : data.temp.min;

  return (
    <div className="ForecastDay">
      <div className="forecast-day">
        <FormattedDay day={props.data.dt} />
      </div>
      <WeatherIcon icon={props.data.weather[0].icon} size={36} />
      <div className="forecast-temperatures">
        <span className="forecast-temp-max">{Math.ceil(maxTemp)}°</span>{" "}
        <span className="forecast-temp-min">{Math.floor(minTemp)}°</span>
      </div>
    </div>
  );
}
