import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import Weather from "./Weather";
import Modal from "./Modal";
import ChakraA from "./ChakraA";
import Loader from "./Loader";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Search() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({ ready: false });
  const apiKeyWeather = process.env.REACT_APP_WEATHER_API_KEY;
  const apiWeatherEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorAlert, setErrorAlert] = useState({ display: false });
  const initialFetch = useRef(false);
  const defaultCity = "Rio de Janeiro";

  const fetchWeatherByCoordinates = useCallback(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setIsLoading(true);
      try {
        const apiUrl = `${apiWeatherEndPoint}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}`;
        const response = await axios.get(apiUrl);
        handleResponse(response);
      } catch (error) {
        setError({
          title: "Error fetching weather data",
          message: "Could not fetch weather data. Please try again later."
        });
      } finally {
        setIsLoading(false);
        initialFetch.current = true;
      }
    },
    [apiKeyWeather]
  );

  const fetchWeatherByCity = useRef(
    debounce(async (city) => {
      if (!city) return;

      setIsLoading(true);
      try {
        const apiUrl = `${apiWeatherEndPoint}?q=${city}&units=metric&appid=${apiKeyWeather}`;
        const response = await axios.get(apiUrl);
        handleResponse(response);
      } catch (error) {
        setError({
          title: `${city} not found`,
          message: "Search another city or try again later."
        });
      } finally {
        setIsLoading(false);
        initialFetch.current = true;
      }
    }, 500)
  ).current;

  const handleLocationError = useCallback(
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setErrorAlert({
            display: true,
            title: "Permission denied",
            description: "User denied the request for Geolocation."
          });
          break;
        case error.POSITION_UNAVAILABLE:
          setErrorAlert({
            display: true,
            title: "Position unavailable",
            description: "Location information is unavailable."
          });
          break;
        case error.TIMEOUT:
          setErrorAlert({
            display: true,
            title: "Timeout",
            description: "The request to get user location timed out."
          });
          break;
        case error.UNKNOWN_ERROR:
          setErrorAlert({
            display: true,
            title: "Unknown error",
            description: "An unknown error occurred."
          });
          break;
        case "NOT_SUPPORTED":
          setErrorAlert({
            display: true,
            title: "Not Supported",
            description: "Geolocation is not supported by this browser."
          });
          break;
        default:
          setErrorAlert({
            display: true,
            title: "Error getting location",
            description: "Couldn't get location."
          });
      }

      if (!initialFetch.current) {
        fetchWeatherByCity(defaultCity);
        setCity(defaultCity);
      } else {
        initialFetch.current = true;
      }
    },
    [setErrorAlert, setCity, fetchWeatherByCity, defaultCity]
  );

  useEffect(() => {
    if (!initialFetch.current) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            fetchWeatherByCoordinates(position);
          },
          (error) => {
            handleLocationError(error);
            initialFetch.current = true;
          }
        );
      } else {
        handleLocationError({ code: "NOT_SUPPORTED" });
        initialFetch.current = true;
      }
    }
  }, [fetchWeatherByCoordinates, handleLocationError]);

  useEffect(() => {
    if (errorAlert.display) {
      const timer = setTimeout(() => {
        setErrorAlert({ display: false });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [errorAlert]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && (error || errorAlert.display)) {
        if (error) {
          setError(null);
        }
        if (errorAlert.display) {
          setErrorAlert({ display: false });
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [error, errorAlert]);
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      coordinates: response.data.coord,
      date: response.data.dt,
      icon: response.data.weather[0].icon,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      minTemperature: response.data.main.temp_min,
      maxTemperature: response.data.main.temp_max,
      feelsLike: response.data.main.feels_like,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity
    });
    setCity("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city === "") {
      setError({
        title: "Empty search",
        message: "Oops! It looks like you haven't typed a city."
      });
    } else {
      fetchWeatherByCity(city);
    }
  };

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function getLocation(event) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          fetchWeatherByCoordinates(position);
        },
        (error) => {
          handleLocationError(error);
        }
      );
    } else {
      handleLocationError({ code: "NOT_SUPPORTED" });
    }
  }

  const errorHandler = () => {
    setError(null);
  };
  const alertHandler = () => {
    setErrorAlert({ display: false });
  };

  return (
    <main className="Search">
      {isLoading && (
        <div className={`loader-home ${isLoading ? "visible" : ""}`}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <form className="search-form p-3 mb-3" onSubmit={handleSubmit}>
            <div className="grid grid-3-col">
              <input
                className="form-control"
                id="input"
                type="search"
                value={city}
                placeholder="Search for a city"
                onChange={handleCityChange}
                autoComplete="off"
              />
              <button className="search-button" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <button
                className="search-button"
                type="button"
                onClick={getLocation}
              >
                <FontAwesomeIcon icon={faLocationDot} />
              </button>
            </div>
          </form>
          <Weather data={weatherData} />
          {error && (
            <Modal
              title={error.title}
              message={error.message}
              onClose={errorHandler}
            />
          )}
          {errorAlert.display && (
            <ChakraA
              onClick={alertHandler}
              title={errorAlert.title}
              description={errorAlert.description}
            />
          )}
        </>
      )}
    </main>
  );
}
