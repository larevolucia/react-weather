import React from "react";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import WeatherInfo from "./WeatherInfo";
import ForecastInfo from "./ForecastInfo";
import WeatherIcon from "./WeatherIcon";

export default function Weather(props) {
  if (props.data.ready) {
    return (
      <div className="Weather">
        <div className="border rounded-2 p-2">
          <div className="row justify-content-evenly pb-4">
            <h2 className="text-center">{props.data.city}</h2>
            <div className="text-center">
              <FormattedDate date={props.data.date} />
            </div>
            <div className="col-4 text-end">
              <WeatherIcon icon={props.data.icon} size={52} />
            </div>
            <div className="col-8 text-start">
              <WeatherInfo
                celsius={props.data.temperature}
                description={props.data.description}
                wind={props.data.wind}
                humidity={props.data.humidity}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-evenly mt-2">
          <ForecastInfo forecast={props.data.coordinates} />
        </div>
      </div>
    );
  }
}
