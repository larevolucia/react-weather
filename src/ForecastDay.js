import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./styles/Weather.css";
import FormattedDay from "./FormattedDay";

export default function ForecastDay(props) {
  return (
    <div className="ForecastDay">
      <div className="forecast-day">
        <FormattedDay day={props.data.dt} />
      </div>
      <WeatherIcon icon={props.data.weather[0].icon} size={36} />
      <div className="forecast-temperatures">
        <span className="forecast-temp-max">
          {Math.ceil(props.data.temp.max)}
        </span>{" "}
        <span className="forecast-temp-min">
          {Math.floor(props.data.temp.min)}
        </span>
      </div>
    </div>
  );
}
