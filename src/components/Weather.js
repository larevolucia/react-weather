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
  const [timezone, setTimezone] = useState(null);

  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  useEffect(() => {
    if (data.ready) {
      const fetchTimezone = async () => {
        const tzApiKey = "W3RKUIYB1P7Z";
        const response = await fetch(
          `https://api.timezonedb.com/v2.1/get-time-zone?key=${tzApiKey}&format=json&by=position&lat=${data.coordinates.lat}&lng=${data.coordinates.lon}`
        );
        const result = await response.json();
        setTimezone(result);
      };

      fetchTimezone();
    }
  }, [data]);

  function handleUnitChange(newUnit) {
    setUnit(newUnit);
  }

  if (data.ready && timezone) {
    return (
      <div className="Weather">
        <div className="weather-container">
          <h2>{data.city}</h2>
          <FormattedDate date={timezone.formatted} />
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
