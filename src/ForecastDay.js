import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./ForecastDay.css";
import FormattedDay from "./FormattedDay";

export default function ForecastDay(props) {
  console.log(props.forecast[0].temp.max);
  return (
    <div className="ForecastDay">
      <div className="row">
        <div className="col">
          <div className="forecast-day">
            <FormattedDay day={props.forecast[1].dt} />
          </div>
          <WeatherIcon icon={props.forecast[1].weather[0].icon} size={36} />
          <div className="forecast-temperatures">
            <span className="forecast-temp-max">
              {Math.ceil(props.forecast[1].temp.max)}
            </span>{" "}
            <span className="forecast-temp-min">
              {Math.floor(props.forecast[1].temp.min)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
