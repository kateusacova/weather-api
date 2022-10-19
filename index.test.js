const { Weather } = require(".");

describe('Weather', () => {
  it('returns mocked api object', () => {
    const mockedApi = {
      fetchWeatherData: (city, callback) => {
        callback({
          city: 'Bristol',
          weather: 'Fake weather'
        });
      }
    }

    const weather = new Weather(mockedApi);
    weather.fetch('Bristol');
    expect(weather.getWeatherData()).toEqual({
      city: 'Bristol',
      weather: 'Fake weather'
    });
  });
});