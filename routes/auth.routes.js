// IMPORT EXPRESS
const router = require("express").Router();

// IMPORT USERMODEL
const UserModel = require("../models/User.model");

// IMPORT BCRYPT
const bcrypt = require("bcryptjs");

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

router.get("/welcome", isLoggedIn, (req, res, next) => {
  let theUsername = req.session.myProperty;
  res.render("auth/welcome.hbs", {
    username: theUsername.username
  });
});
router.get("/logout",  (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/profile", isLoggedIn,  (req, res) => {
  res.render("auth/profile.hbs")
});

//------------ EDIT USER PROFILE --------------
router.get("/profile/:id/edit", (req, res, next) =>{
  const {id} = req.params
  UserModel.findById(id)
  .then((user)=>{
    res.render("/auth/profile-update.hbs", user)
  })
  .catch((err) =>{
    next(err)
  })
})

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {
    id
  } = req.params
  DroneModel.findById(id)
    .then((drone) => {
      console.log(drone)
      res.render("drones/update-form", drone)
    })
    .catch((err) => {
      console.log("Something went wrong: " + err)
    })
}); //#4

// router.post('/drones/:id/edit', (req, res, next) => {
//   // Iteration #4: Update the drone
//   const {
//     name,
//     propellers,
//     maxSpeed
//   } = req.body
//   const {
//     id
//   } = req.params
//   DroneModel.findByIdAndUpdate(id, {
//       name: name,
//       propellers: propellers,
//       maxSpeed: maxSpeed
//     })
//     .then(() => {
//       res.redirect("/drones")
//     })
//     .catch((err) => {
//       console.log("Something went wrong: " + err)
//     })
// }); //#4

// router.post('/drones/:id/delete', (req, res, next) => {
//   // Iteration #5: Delete the drone
//   const {
//     id
//   } = req.params
//   DroneModel.findByIdAndDelete(id)
//     .then(() => {
//       console.log("Drone deleted!")
//       res.redirect("/drones")
//     })
//     .catch((err) => {
//       console.log("Something went wrong: " + err)
//     })
// });



// EXPORT THE ROUTES
module.exports = router;
