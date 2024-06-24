import React, { useState, useEffect } from "react";
import "../styles/Weather.css";
import FormattedDate from "./FormattedDate";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather({ data }) {
  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem("weatherUnit");
    return savedUnit ? savedUnit : "celsius";
  });

  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  function handleUnitChange(newUnit) {
    setUnit(newUnit);
  }

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
              unit={unit}
              onUnitChange={handleUnitChange}
            />
          </div>
        </div>
        <div className="forecast-container">
          <WeatherForecast coordinates={data.coordinates} unit={unit} />
        </div>
      </div>
    );
  }
}
