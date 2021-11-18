// IMPORT EXPRESS
const router = require("express").Router();

// IMPORT USERMODEL
const UserModel = require("../models/User.model");

// IMPORT BCRYPT
const bcrypt = require("bcryptjs");

//--------------------------------------------------------------------------
//                         ROUTES
//--------------------------------------------------------------------------

//-----------------REGISTER-----------------
// GET REQUEST FOR REGISTER
router.get("/register", (req, res, next) => {
  //SHOW THE FORM FOR REGISTERING
  res.render("../views/auth/register.hbs");
});

// POST REQUEST FOR REGISTER
router.post("/register", (req, res, next) => {
  const { username, email, password, personalTrainer } = req.body;
  // ENCRYPT PASSWORDS
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  // CREATE THE USER IN MONGODB
  UserModel.create({ username, email, password: hash, personalTrainer })
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
//GET REQUEST TO LOG IN
router.get("/login", (req, res, next) => {
  //SHOW THE FORM TO LOG IN
  res.render("../views/auth/login.hbs");
});

//POST REQUEST TO LOG IN
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  //VALIDATION
  UserModel.find({ username })
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

// EXPORT THE ROUTES
module.exports = router;