const axios = require("axios");

// Configuring the path to read the environment variable file, .env, to get the weather api key
require('dotenv').config({path: "./../../../.env"});
const WEATHER = require("../models/Weather");

const baseUrl = "./piece.json";

class Weather {

    /**
     * Gets the weather data based on the zipcode and which temp system to converge to (imperial/metric system)
     * @param {string} name piece name and which side of the piece
     * @param {number} x col position
     * @param {number} y row position
     * @param {string} colour colour
     * @param {[string]]} option available moves to choose
     * @return {JSON} The data response from the chess api call.
     */

    saveWeatherDataToMongo = async (name, data) => {
        const filter = {
            Name: name
        }
        const replace = {
            ...filter,
            ...data,
            data: Date.now()
        }
        await this.findOneReplace(filter, replace);
    }

    /**
     * Saves Weather data to MongoDb
     *
     * @param {number} zipCode The zipcode used as unique identifier to find the document from mongo
     * @return {JSON} The data response from the mongodb.
     */
    getWeatherDataFromMongo = async (zipCode) => {
        return WEATHER.findOne({zip: zipCode});
    }

    /**
     * If a document already exists with the filter, then replace, if not, add.
     *
     * @param {{zip: number}} filter The filter is the zipcode used as unique identifier to find the document from mongo
     * @return {JSON} The data response from the mongodb.
     */
    async findOneReplace(filter, replace) {
        await WEATHER.findOneAndReplace(filter, replace, {new: true, upsert: true});
    }
}

module.exports = Weather;