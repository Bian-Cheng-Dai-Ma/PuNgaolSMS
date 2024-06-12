require('dotenv').config();
let weather = {
    // apiKey: "63b96358f3c2c5f0c6aec408caa99842",
    apiKey: process.env.WEATHER_API_KEY,
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, feels_like, temp_min, temp_max, pressure, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Today in Mondulkiri";
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".feels-like").innerText =
        "Feels Like: " + feels_like;
      document.querySelector(".temp-min").innerText =
      "Minimum Temperature: " + temp_min + "°C";
      document.querySelector(".temp-max").innerText =
      "Maximum Temperature: " + temp_max + "°C";
      document.querySelector(".pressure").innerText =
      "Pressure: " + pressure;
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Ratanakiri");