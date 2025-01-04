const request = require("request");

const ACCESS_TOKEN =
  "pk.eyJ1IjoiZnJhbmtndWVrZW5nMTEiLCJhIjoiY201YjkyNThvNGt2dzJpc2Z0eHo3ZDdvYyJ9.uAm-DhpXPIooQZm3Rovp6Q";

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${ACCESS_TOKEN}`;
  console.log(url);

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather service: ", undefined);
    } else if (res.body.error_code) {
      callback("Unable to find location: ", undefined);
    } else {
      callback(
        undefined,
        res.body.features[0].properties.full_address +
          " is your address location"
      );
    }
  });
};

module.exports = forecast;
