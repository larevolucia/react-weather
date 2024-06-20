import React, { useState, useEffect } from "react";
import ForecastDay from "./ForecastDay";
import "./styles/Weather.css";
import axios from "axios";

export default function WeatherForecast({ coordinates, unit }) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [coordinates, unit]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded)
    return (
      <div className="WeatherForecast p-3 scroll">
        {forecast.map(function (dailyForecast, index) {
          if (index >= 1 && index < 8) {
            return (
              <div className="day-card" key={index}>
                <ForecastDay data={dailyForecast} unit={unit} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  else {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let longitude = coordinates.lon;
    let latitude = coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}
