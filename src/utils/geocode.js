const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=f33964b1e77141f88dcad32e8a52ea76`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the geocoding service!", undefined);
    } else if (response.body.status.code !== 200) {
      callback(
        `Unable to fetch data. Status code: ${response.body.status.code}`,
        undefined
      );
    } else if (!response.body.results || response.body.results.length === 0) {
      callback("No results found for the given address.", undefined);
    } else {
      const result = response.body.results[0];
      callback(undefined, {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
        location: result.formatted,
      });
    }
  });
};

module.exports = geocode;
