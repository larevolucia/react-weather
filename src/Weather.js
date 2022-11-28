import React from "react";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const icon = `http://openweathermap.org/img/wn/${props.data.icon}@2x.png`;

  if (props.data.ready) {
    return (
      <div className="Weather border rounded-2 p-2">
        <div className="row justify-content-evenly">
          <h2 className="text-center">{props.data.city}</h2>
          <div className="text-center">
            <FormattedDate date={props.data.date} />
          </div>
          <div className="col-2 text-end">
            <img
              src={icon}
              alt={props.data.description}
              className="img-fluid"
              width="80"
            />
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
    );
  }
}
