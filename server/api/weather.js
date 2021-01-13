const axios = require("axios");
const WEATHER = require("../models/weather");

// Configuring the path to read the environment variable file, .env, to get the weather api key
require('dotenv').config({path: "./../../../.ENV"});

const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
const key = "31a5c91a4848f5d20954d044f5815886"

class Weather {

    /**
     * Gets the weather data based on the zipcode and which temp system to converge to (imperial/metric system)
     *
     * @param {number} zipCode The zipcode used to get the weather info from the weather api
     * @param {string} tempMetric This is either "imperial" (use Fahrenheit) or "metric" (use Celsius)
     * @return {JSON} The data response from the weather api call.
     */
     async getWeatherData(ripCode, tempMetric) {

        /**
         * Use get api for "By ZIP code" (https://openweathermap.org/current#zip)
         * - The "us" query stands for "United States
         * - "process.env.WEATHER_KEY" is the api key that we get from the .env file
         * - "units" query can be either imperial (Fahrenheit) or metric (Celsius)
         */
        let url = `${baseUrl}?zip=${zipCode},us&appid=${key}&units=${tempMetric}`;

        // Awaitable call to get the information from the weather api and then return the data.
        // TODO: Add error handling for this call
        return (await axios(url)).data;
    }
}

module.exports = Weather;