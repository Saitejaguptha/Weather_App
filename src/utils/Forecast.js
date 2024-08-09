const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=XNWG3bIJVgSGCQpabed5jG2XdImUqItE`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to process the request!!", undefined);
    } else if (body.message) {
      callback(`Unable to fetch the data:${body.type}`, undefined);
    } else {
      callback(undefined, {
        forecastdata: `The chance of rain is:${body.timelines.minutely[0].values.rainIntensity}. Current temparature is ${body.timelines.minutely[0].values.temperature}`,
      });
    }
  });
};

module.exports = forecast;
