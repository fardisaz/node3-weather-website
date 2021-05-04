const axios = require("axios");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e9bc2b2703afb29270fa26c37d8dd280&query=${long},${lat}&units=f`;

  axios({
    method: "get",
    url,
  })
    .then(({ data }) => {
      // handle success
      if (data.error) {
        callback("Unable to find location!", undefined);
      } else {
        callback(
          undefined,
          `${data.current.weather_descriptions[0]} throughout the day.It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees.The humidity is ${data.current.humidity}% .`
        );
      }
    })
    .catch(function (error) {
      callback("Unable to connect to weather service!", undefined);
    });
};
module.exports = forecast;
