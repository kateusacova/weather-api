class WeatherApi {
  constructor() {
    this.got = require('got');
    this.apiKey = require("./apiKey");
  }

  fetchWeatherData(city, callback) {
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${this.apiKey}`;
    let weatherData = null;

    this.got(apiUrl).then((response) => {
      weatherData = JSON.parse(response.body);
      callback(weatherData);
    });
  }
}

class Weather {
  constructor(api) {
    this.api = api;
    this.data
  }
  
  fetch(city) {
    this.api.fetchWeatherData(city, (response) => {
      this.data = response;
    });
  }

  getWeatherData() {
    return this.data;
  }
}

module.exports = { WeatherApi, Weather }