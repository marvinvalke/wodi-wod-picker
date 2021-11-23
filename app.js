// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerHelper("getmyvalue", function (outer, inner) {
  return outer[inner];
});

// 
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "Wod[i] Wodpicker";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${projectName}`;

//COOKIES
const session = require("express-session");
const MongoStore = require("connect-mongo");

//keepping the logged-in state
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 24 * 60 //cookie clearance interval
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wod-picker",
    ttl: 24 * 60 * 60 //session clearance interval
  })
}));

//-------------------- 👇 Start handling routes here ---------------------------
const index = require("./routes/index");
app.use("/", index);

// IMPORT AUTHENTICATION ROUTES
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

// IMPORT WOD ROUTES
const wodRoutes = require("./routes/wod.routes");
app.use("/", wodRoutes);

// IMPORT EXERCISE ROUTES
const exerciseRoutes = require("./routes/exercise.routes");
app.use("/", exerciseRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
