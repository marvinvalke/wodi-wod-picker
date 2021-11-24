// SEEDING IS TO ENSURE OUR DB HAS SOME INITIAL DATA

// MAKE THE DB CONNECTION FIRST
require("../db");

const mongoose  = require("mongoose");
// REQUIRE THE MODEL
let User = require("../models/User.model");

// INSERT DATA

User
  .insertMany([
    { name: "Marvin", email: "marvin@ironhack.com" , password: "Mil@J@mes2122" },
    { name: "Hugo", email: "hugo@ironhack.com" , password: "Hug0" },
  ])

  .then(() => {
    console.log("data inserted");
    mongoose.connection.close(); // CLOSE THE DB CONNECTION
  })
  .catch((err) => {
    console.log("error", err);
    mongoose.connection.close(); // CLOSE THE DB CONNECTION
  });
