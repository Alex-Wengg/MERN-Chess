// Use express's router to route API endpoints
const express = require('express');
const router = express.Router();

// Use the class made in ./piece.js to call that will get  data from api
const Piece = require("./weather");

// GET Request - statically get the data from the api
router.get("/piece",  async (req, res) => {
    let piece = new Piece();
    
    // an example GET request
    let weatherData = await weather.getWeatherData(98052, "us");

    // Content sent to a prettified json
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(weatherData, null, 4));
});

// POST Request - dynamically get data based on request body
router.post("/piece",  async (req, res) => {
    const {zipCode, tempMetric} = req.body;
    let weather = new Weather();
    
    // The params for zipCode and tempMetric are dynamic
    let weatherData = await weather.getWeatherData(zipCode, tempMetric);

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(weatherData, null, 4));
});

module.exports = router;