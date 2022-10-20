const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

class WeatherApi {
  constructor() {
    this.got = require('got');
    this.apiKey = require("./apiKey");
    this.weatherData;
  }

  fetchWeatherData(city, callback) {
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${this.apiKey}`;

    this.got(apiUrl).then((response) => {
      this.weatherData = JSON.parse(response.body);
      callback(this.weatherData);
    });
  }
}

class WeatherView {
  
  constructor() {
    this.got = require('got');
    this.apiKey = require("./apiKey");
    this.rl = readline.createInterface({ input, output });
  } 

  getCity = () => {
    this.rl.question('Please select city\n', (answer) => {
      this.displayWeather(answer);
      this.rl.close();
    });
  }

  displayWeather(city) {
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${this.apiKey}`;
    let weatherData = null;

    this.got(apiUrl).then((response) => {
      weatherData = JSON.parse(response.body);
      console.log(`City: ${weatherData.name}\n`,
        `Weather: ${weatherData.weather[0].main}\n`,
        `Temperature: ${weatherData.main.temp}\n`,
        `Feels like: ${weatherData.main.feels_like}\n`,
        `Humidity: ${weatherData.main.humidity}`);
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

// const view = new WeatherView;
// view.getCity();










