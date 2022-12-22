import React from "react";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";

export default function ForecastInfo(props) {
  const longitude = props.forecast.lon;
  const latitude = props.forecast.lat;
  const apiKeyWeather = "6bf5993fd6f246de7b98dc6c43d6cd79";
  const apiForecastEndPoint = "https://api.openweathermap.org/data/2.5/onecall";
  const apiUrl = `${apiForecastEndPoint}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}`;

  axios
    .get(apiUrl)
    .then(handleResponse)
    .catch((error) => {
      alert("Ops! We couldn't find that city.");
    });

  function handleResponse(response) {
    console.log(response);
  }

  return (
    <div className=" ForecastInfo col border rounded-2 m-2">
      <div className="day">Thu</div>
      <WeatherIcon icon="11d" size={24} />
      <div className="temp-forecast">
        <span className="forecast-max-temp">20°</span>
        <span className="forecast-min-temp">15°</span>
      </div>
    </div>
  );
}
