const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/Forecast.js");

const app = express();

// Define paths of Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// To print directory and filename
// console.log(__dirname);
// console.log(__filename);

// Setup Hanldebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setting Up static directories to the server
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Saiteja",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Saiteja",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Saiteja",
    helptext: "Here Im to Help you out!!!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, { forecastdata } = {}) => {
        if (error) return res.send({ error });

        res.send({ location, forecastdata, address: req.query.address });
      });
    }
  );
});

app.get("/about/*", (req, res) => {
  res.render("Error404", {
    title: "Page Not found",
    name: "Saiteja",
    errorMessage: "Page Not found",
  });
});

app.get("/help/*", (req, res) => {
  res.render("Error404", {
    title: "Page Not found",
    name: "Saiteja",
    errorMessage: "Page Not found",
  });
});

app.get("*", (req, res) => {
  res.render("Error404", {
    title: "Page Not found",
    name: "Saiteja",
    errorMessage: "Page Not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
