// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

//const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wod-picker";
const MONGO_URI =  "mongodb+srv://wodpicker:hugomarvin@cluster0.ysxz6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
console.log(MONGO_URI,"mongo url");
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
