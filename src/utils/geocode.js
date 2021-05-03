const axios = require("axios");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidG9wZmxhbnphIiwiYSI6ImNrbnl0bXpuYzFqbnQydXJtYmltOGZnbHcifQ.FzHKGI-IgGc4N84F2rvjyw&limit=1`;

  axios({ url, method: "get" })
    .then(({ data }) => {
      if (data.features.length === 0) {
        callback(
          "Unable to find the location.Please check if you entered the right location in URL!",
          undefined
        );
      } else {
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name,
        });
      }
    })
    .catch(function (error) {
      callback("Unable to connect to the Geocoding service.", undefined);
    });
};
module.exports = geocode;
