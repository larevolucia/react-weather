import React, { useState, useEffect } from "react";
import ForecastDay from "./ForecastDay";
import Loader from "./Loader";
import "./styles/Weather.css";
import axios from "axios";

export default function WeatherForecast({ coordinates, unit }) {
  const [isLoading, setIsLoading] = useState(true);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setIsLoading(true);
      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let longitude = coordinates.lon;
      let latitude = coordinates.lat;
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(apiUrl);
        setForecast(response.data.daily);
      } catch (error) {
        console.error("Error fetching the weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecast();
  }, [coordinates, unit]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="WeatherForecast p-3 scroll">
      {forecast &&
        forecast.map((dailyForecast, index) => {
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
}
