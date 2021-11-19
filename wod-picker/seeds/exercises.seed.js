// connect to DB
require("../db");
// REQUIRE THE MODEL
const Exercise = require("../models/Exercise.model");
// REQUIRE AXIOS
const axios = require("axios").default;
// IMPORT MONGOOSE
const mongoose = require("mongoose");
// REQUIRE ENV
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

const options = {
  method: "GET",
  url: "https://exercisedb.p.rapidapi.com/exercises",
  headers: {
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
  },
};

axios
  .request(options)
  .then(function (response) {
    return Exercise.insertMany(response.data);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(function (error) {
    console.error(error);
    mongoose.connection.close();
  });
