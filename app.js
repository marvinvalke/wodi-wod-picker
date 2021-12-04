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

// REQUIRING EXPRESS
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "Wod[i] Wodpicker";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${projectName}`;


// Register the location for handlebars partials here:
hbs.registerPartials("./views/partials")

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

// //GOOGLE AUTH
// //---------------REQUIRE---------------
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const UserModel = require("./models/User.model.js");

//---------------SERIALISE--------------
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, cb) => cb(null, user._id));
 
// passport.deserializeUser((id, cb) => {
//   UserModel.findById(id)
//     .then(user => cb(null, user))
//     .catch(err => cb(err));
// });

//---------- SOMETHING IMPORTANT ------------
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_AUTH_ID,
//       clientSecret: process.env.GOOGLE_AUTH_PW,
//       callbackURL: "/auth/google/callback"
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // to see the structure of the data in received response:
//       console.log("Google account details:", profile);

//       UserModel.findOne({ googleID: profile.id })
//         .then(user => {
//           if (user) {
//             done(null, user);
//             return;
//           }

//           UserModel.create({ googleID: profile.id, name: profile.name.givenName, email: profile.emails[0].value})
//             .then(newUser => {
//               done(null, newUser);
//             })
//             .catch(err => done(err)); // closes User.create()
//         })
//         .catch(err => done(err)); // closes User.findOne()
//     }
//   )
// );

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
