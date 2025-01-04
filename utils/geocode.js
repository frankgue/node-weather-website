const request = require("request");

const geocode = (coffee, callback) => {
  const url = `https://api.mapbox.com/search/searchbox/v1/category/${coffee}?access_token=pk.eyJ1IjoiZnJhbmtndWVrZW5nMTEiLCJhIjoiY201YjkyNThvNGt2dzJpc2Z0eHo3ZDdvYyJ9.uAm-DhpXPIooQZm3Rovp6Q&language=en&limit=5&proximity=-122.41%2C39&bbox=-124.35526789303981%2C38.41262975705166%2C-120.52250410696067%2C39.54169087094499`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: res.body.features[0].properties.coordinates.latitude,
        longitude: res.body.features[0].properties.coordinates.longitude,
        location: res.body.features[0].properties.name,
      });
    }
  });
};

module.exports = geocode;

// console.log(`
// pk.eyJ1IjoiZnJhbmtndWVrZW5nMTEiLCJhIjoiY201YjkyNThvNGt2dzJpc2Z0eHo3ZDdvYyJ9.uAm-DhpXPIooQZm3Rovp6Q
// https://api.mapbox.com/search/searchbox/v1/category/coffee?access_token=pk.eyJ1IjoiZnJhbmtndWVrZW5nMTEiLCJhIjoiY201YjkyNThvNGt2dzJpc2Z0eHo3ZDdvYyJ9.uAm-DhpXPIooQZm3Rovp6Q&language=en&limit=5&proximity=-122.41%2C39&bbox=-124.35526789303981%2C38.41262975705166%2C-120.52250410696067%2C39.54169087094499`);
