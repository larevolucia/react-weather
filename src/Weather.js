import React from "react";
import "./styles/Weather.css";
import FormattedDate from "./FormattedDate";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather({ data }) {
  console.log(data);
  console.log(data.feelsLike);
  if (data.ready) {
    return (
      <div className="Weather">
        <div className="weather-container">
          <h2>{data.city}</h2>
          <FormattedDate date={data.date} />
          <div className="weather-data">
            <WeatherInfo
              feelsLike={data.feelsLike}
              icon={data.icon}
              celsius={data.temperature}
              description={data.description}
              wind={data.wind}
              humidity={data.humidity}
            />
          </div>
        </div>
        <div className="forecast-container">
          <WeatherForecast coordinates={data.coordinates} />
        </div>
      </div>
    );
  }
}
