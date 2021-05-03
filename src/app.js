const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Fardis Amouzadeh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Fardis Amouzadeh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Fardis Amouzadeh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  } else {
    geocode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        }
        forecast(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error,
            });
          }
          res.send({
            address: req.query.address,
            forecast: forecastData,
            location: location,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must privide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Fardis Amouzadeh",
  });
});
//* means match anything that has not been matched so far
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Fardis Amouzadeh",
  });
});

//listen:this starts the server

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

// nodemon src/app.js -e js,hbs if you want the changes that has happened in other files to be included
