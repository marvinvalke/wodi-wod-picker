// IMPORT EXPRESS
const router = require("express").Router();

// IMPORT USERMODEL
const UserModel = require("../models/User.model");

// IMPORT BCRYPT
const bcrypt = require("bcryptjs");

//IMPORT CLOUDINARY
const uploader = require('../middlewares/cloudinary.config.js');

//---------------------------------------ROUTES------------------------------------

//-----------------REGISTER--------------------
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
      res.redirect("/welcome");
      console.log('*****USER CREATED*****')
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//-------------------LOGIN---------------------
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
      let userObj = userResponse[0];
      //do passwords match?
      let isMatching = bcrypt.compareSync(password, userObj.password);
      if (isMatching) {
        req.session.myProperty = userObj;
        res.redirect("/welcome");
      } else {
        res.render('auth/login.hbs', {error: "Login failed: the password you entered is incorrect."})
        return;
      }
    } else {
      res.render("auth/login.hbs", {error: "Login failed: email does not exist."})
      return;
    }
  })
  .catch((err) =>{
    next(err)
  })
});
// //-------------------------------PROTECTED ROUTES------------------------------------
//----------- CHECK IF LOGGED IN --------------
const isLoggedIn = (req, res, next) => {
  if (req.session.myProperty) {
    // IF LOG IN SUCCESSFUL -> GO TO THE GET /WELCOME
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/welcome", isLoggedIn,  (req, res) => {
  const id = req.session.myProperty._id
  UserModel.findById(id)
  .then((profile)=>{
    res.render("auth/welcome.hbs", {profile})
  })
  .catch((err) =>{
    next(err)
  })
});

router.get("/logout",  (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/profile", isLoggedIn,  (req, res) => {
  const id = req.session.myProperty._id
  UserModel.findById(id)
  .then((profile)=>{
    res.render("auth/profile.hbs", {profile})
  })
  .catch((err) =>{
    next(err)
  })
});

//------------ EDIT USER PROFILE --------------
//GET the profile info according to unique ID
router.get("/profile/edit",isLoggedIn, (req, res, next) =>{
  const id = req.session.myProperty._id
  
  UserModel.findById(id)
  .then((profile)=>{
    console.log("profile user id", profile);
    res.render("auth/profile-update.hbs", {profile})
  })
  .catch((err) =>{
    next(err)
  })
})
//POST updated information
router.post('/profile/edit', (req, res, next) => {
  const {name,email, password} = req.body
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  const id = req.session.myProperty._id
  UserModel.findByIdAndUpdate(id, {name:name, email:email, password: hash})
    .then(() => {
      res.redirect("/profile")
      //res.send("Profile updated successfully!")
    })
    .catch((err) => {
      next(err)
    })
});

//------------- DELETE USER PROFILE --------------

router.post('/profile/delete', (req, res, next) => {
  const id = req.session.myProperty._id
  UserModel.findByIdAndDelete(id)
    .then(() => {
      console.log("User deleted!")
      res.redirect("/")
    })
    .catch((err) => {
      next(err)
    })
});

// -------------- CLOUDINARY ----------------
router.post('/upload', isLoggedIn, uploader.single("image"), (req, res, next) => {
  console.log('file is: ', req.file)
  UserModel.findByIdAndUpdate(req.session.myProperty._id, {
    profilePic: req.file.path,
  })
  .then(()=>{
    res.redirect("/profile")
  })
  .catch(()=>{
    next(err)
  })
});

//---------- GOOGLE AUTHENTICATION --------------
// routes/auth-routes.js
const passport = require("passport")

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login" // here you would redirect to the login page using traditional login approach
  })
);



// EXPORT THE ROUTES
module.exports = router;
