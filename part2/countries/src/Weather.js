import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});

  //Fetch weather information from API
  useEffect(() => {
    console.log("effect");
    const parameter = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
    };
    const url = "http://api.weatherstack.com/current";

    axios
      .get(`${url}?access_key=${parameter.access_key}&query=${parameter.query}`)
      .then((response) => {
        console.log("promise fulfilled");
        setWeather(response.data.current);
      });
  }, [country]);
  console.log(weather);
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} width="100" alt="icon" />
      <p>
        wind: {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};
export default Weather;
