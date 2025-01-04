const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();

// Define paths for express configuration
const publicdirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicdirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Frank GUEKENG",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Frank GUEKENG",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page...",
    name: "Frank GUEKENG",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a address",
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: "An error occurred while geocoding",
        message: err,
      });
    }
    forecast(latitude, longitude, (error, forecastData = {}) => {
      if (error) {
        return res.send({
          error: "An error occurred while forecasting",
          message: error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address.toString(),
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Article Page Not Found",
    name: "Frank GUEKENG",
    errorMessage: "My Article Error Page Not Found!!!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    name: "Frank GUEKENG",
    errorMessage: "My Error Page Not Found!!!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
