import React from "react";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import WeatherInfo from "./WeatherInfo";
import WeatherIcon from "./WeatherIcon";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  if (props.data.ready) {
    return (
      <div className="Weather ">
        <div className="border rounded-2 p-2">
          <div className="row justify-content-evenly">
            <h2 className="text-center">{props.data.city}</h2>
            <div className="text-center">
              <FormattedDate date={props.data.date} />
            </div>
            <div className="col-2 text-end">
              <WeatherIcon icon={props.data.icon} size={42} />
            </div>
            <div className="col-10 text-start">
              <WeatherInfo
                celsius={props.data.temperature}
                description={props.data.description}
                wind={props.data.wind}
                humidity={props.data.humidity}
              />
            </div>
          </div>
        </div>
        <WeatherForecast coordinates={props.data.coordinates} />
      </div>
    );
  }
}
