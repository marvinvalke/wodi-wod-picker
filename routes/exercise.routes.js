// IMPORT EXPRESS
const router = require("express").Router();

// IMPORT MODELS
/* const User = require("../models/User.model");
const Wod = require("../models/Wod.model"); */
const Exercise = require("../models/Exercise.model");
const errorHandling = require("../error-handling");

//----------------------- ROUTES --------------------------------

router.get("/exercise", (req, res, next) => {
  //console.log(req.query)
  //const { search } = req.query;
  //console.log("the research is for ", req.query);
  const { search } = req.query;
  //console.log("You searched for ", search);
  // IF STATEMENT HERE

  //console.log('The search is >' , matchingExercises)
  if (search) {
    //console.log("MATCHES =>", search),
      Exercise.find({ $text: { $search: search } })
        .then((searchedExercises) => {
          console.log('console logged this' , searchedExercises)
          res.render("exercise/exercises-list.hbs", { searchedExercises });
        })
        .catch((err) => {
          next(err);
        });
  } else {
    Exercise.find()
      .then((allExercises) => {
        res.render("exercise/exercises-list.hbs", { allExercises });
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.get("/exercise/:id", (req, res, next) => {
  const { id } = req.params;
  Exercise.findById(id)
    .then((theExercise) => {
      res.render("exercise/exercise-detail.hbs", { theExercise });
    })
    .catch((err) => {
      next(err);
    });
});

// EXPORT THE ROUTES
module.exports = router;
