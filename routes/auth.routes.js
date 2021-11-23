// IMPORT EXPRESS
const router = require("express").Router();

// IMPORT USERMODEL
const UserModel = require("../models/User.model");

// IMPORT BCRYPT
const bcrypt = require("bcryptjs");

//---------------------------------------ROUTES------------------------------------

//-----------------REGISTER-----------------
// GET for register
router.get("/register", (req, res, next) => {
  //SHOW THE FORM FOR REGISTERING
  res.render("auth/register.hbs");
});
// POST for register
router.post("/register", (req, res, next) => {
  const {name, email, password} = req.body;
  //empty field verification is done directly in the forms
  //password encryption
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  //create the user in our db
  UserModel.create({name, email, password: hash})
    .then(() => {
      res.redirect("/");
      console.log('*****USER CREATED*****')
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//-------------------LOGIN-------------------
// GET for login
router.get("/login", (req, res, next) =>{
  res.render("auth/login.hbs")
});
// POST for login
router.post("/login", (req, res, next) =>{
//create/require the variables we'll need
  const {name, email, password} = req.body
//find the user by the email
UserModel.find({email})
  .then((userResponse) => {
    //if the email is found, check for password
    if (userResponse.length){
      console.log(userResponse);
      //decryption
      let userObj = userResponse[2];
      //do passwords match?
      let isMatching = bcrypt.compareSync(password, userObj.password);
      if (isMatching) {
        req.session.myProperty = userObj;
        res.redirect("/welcome");
      } else {
        res.render("auth/login.hbs", {
          error: "Your password is incorrect"
        })
        return;
      }
    } else {
      res.render("auth/login.hbs", {
        error: "Email does not exist"
      })
      return;
    }
  })
  .catch((err) =>{
    next(err)
  })
});

// EXPORT THE ROUTES
module.exports = router;
