// IMPORT EXPRESS
const router = require("express").Router();

// IMPORT USERMODEL
const User = require("../models/User.model");

// IMPORT BCRYPT
const bcrypt = require("bcryptjs");

//---------------------------------------ROUTES------------------------------------

//Test route for user PROFILE

router.get ("/profile", (req, res, next) =>{
  //Show the user profile page
  res.render("../views/auth/profile.hbs")
});

router.get("/welcome", (req, res, next) =>{
  //Show the homepage for the signed in user
  res.render("../views/auth/account.hbs")
})

//-----------------REGISTER-----------------
// GET REQUEST FOR REGISTER
router.get("/register", (req, res, next) => {
  //SHOW THE FORM FOR REGISTERING
  res.render("../views/auth/register.hbs");
});

// POST REQUEST FOR REGISTER
router.post("/register", (req, res, next) => {
  const { username, email, password, personalTrainer } = req.body;

  // CHECK FOR PASSWORD CONFORMITY
  let passRegEx = /'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'/;
  if (!passRegEx.test(password)) {
    res.render("auth/register.hbs", {
      error:
        "Please enter a minimum of eight characters, at least one letter and one number for your password",
    });
  }
  // ENCRYPT PASSWORDS
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  // CREATE THE USER IN MONGODB
  User.create({ username, email, password: hash, personalTrainer })
    .then(() => {
      // ONCE USER CREATED REDIRECT TO HOMEPAGE
      res.redirect("/");
    })
    .catch((err) => {
      // IF CREATION FAIL GO TO NEXT ERR HANDLING
      next(err);
    });
});

//-----------------LOG IN-----------------
// GET REQUEST TO LOG IN
router.get("/login", (req, res, next) => {
  // SHOW THE FORM TO LOG IN
  res.render("../views/auth/login.hbs");
});

// POST REQUEST TO LOG IN
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  //VALIDATION
  User.find({ username })
    .then((usernameResponse) => {
      //IF USERNAME EXIST THEN CHECK IF THE PASSWORD IS MATCHING
      if (usernameResponse.length) {
        let userObj = usernameResponse[0];
        let match = bcrypt.compareSync(password, userObj.password);
        if (match) {
          req.session.myProperty = userObj; // NEED EXPRESS-SESSION & MONGO-CONNECT
          res.redirect("/account"); // DOUBLE CHECK THAT ROUTE
        } else {
          res.render("../views/auth/login.hbs", {
            error: "Ooopsy Doopsy Password seems incorrect",
          });
          return;
        }
      } else {
        res.render("../views/auth/login.hbs");
        return;
      }
    })
    .catch((err) => {
      next(err);
    });
});

//-------------------------------PROTECTED ROUTES------------------------------------

// CHECK IF LOGGED IN :
const isLoggedIn = (req, res, next) => {
  if (req.session.myProperty) {
    // IF LOG IN SUCCED -> GO TO THE GET /ACCOUNT
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/account", isLoggedIn, (req, res, next) => {
  let theUsername = req.session.myProperty;
  res.render("../views/auth/account.hbs", { username: theUsername.username });
});








// EXPORT THE ROUTES
module.exports = router;
