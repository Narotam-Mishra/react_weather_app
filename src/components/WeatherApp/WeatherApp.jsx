import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";

const WeatherApp = () => {
  // API key
  const apiKey = "7889ce8b629a982266ead29a27478936";

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    let cityName = element[0].value;
    if (cityName === "") {
      alert('Please enter valid city name');
      return 0;
    }

    // OpenWeather API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${apiKey}`;

    //call to API using fetch()
    let response = await fetch(apiUrl);

    // if city name is invalid then show error
    if(response.status === 404){
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather-details").style.display = "none";
      document.querySelector(".container").style.height = "200px";
      setTimeout(() => {
        window.location.reload();
      },2000)
      
    }
    // if city name is valid then show weather details
    else{
      let data = await response.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
  
      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp) + " °c";
      location[0].innerHTML = data.name;
  
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="search-icon" />
        </div>
        <div className="error">
          <p>Invalid City Name</p>
        </div>
      </div>
      <div className="weather-details">
        <div className="weather-image">
          <img src={wicon} alt="cloud_icon" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} className="icon" alt="" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} className="icon" alt="" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
