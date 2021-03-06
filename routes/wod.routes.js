// IMPORT MODELS
const Wod = require("../models/Wod.model");
const Exercise = require("../models/Exercise.model");
// IMPORT EXPRESS
const router = require("express").Router();
// CHECK IF LOGGED IN :
const isLoggedIn = (req, res, next) => {
  if (req.session.myProperty) {
    // IF LOG IN SUCCED -> GO TO THE GET /ACCOUNT
    next();
  } else {
    res.redirect("/login");
  }
};

//-------------------------------PROTECTED ROUTES------------------------------------
// USER CAN SEE ALL HIS WODS
router.get("/wod", isLoggedIn, (req, res, next) => {
  Wod.find({ user: req.session.myProperty._id })
    .then((wods) => {
      console.log("### WODS FROM THE GET ", wods);
      res.render("wod/wod-list.hbs", { wods });
    })
    .catch((err) => {
      next(err);
    });
});
let allTheExercises = [];
// USER CAN CREATE A WOD
router.get("/wod/create", isLoggedIn, (req, res, next) => {
  Exercise.find()
    .then((allExercises) => {
      Exercise.find({}, function (err, exe) {
        allTheExercises.push(exe);
      });
      res.render("wod/wod-create.hbs", { allExercises });
    })
    .catch((err) => {
      next(err);
    });
});

// CREATING A WOD IF SUCCESS GO BACK TO WOD LIST PAGE OTHERWISE REDIRECT TO CREATE A WOD PAGE
router.post("/wod/create", isLoggedIn, (req, res, next) => {
  const {
    name,
    environement,
    exercises,
    ex1reps,
    ex2reps,
    ex3reps,
    ex4reps,
    ex5reps,
    rounds,
    duration,
    intensity,
  } = req.body;
  //console.log("LOOK AT MY REQ BODY", req.body);
  Wod.create({
    name,
    environement,
    exercises,
    ex1reps,
    ex2reps,
    ex3reps,
    ex4reps,
    ex5reps,
    rounds,
    duration,
    intensity,
    user: req.session.myProperty._id,
  })
    .then((wods) => {
      console.log("@@@@ WODS @@@@", wods);
      res.redirect("/wod");
    })
    .catch((err) => {
      res.render("wod/wod-create.hbs");
    });
});

// USER CAN CHECK ON A SPECIFIC WOD
router.get("/wod/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  Wod.findById(id)
    .populate("exercises")
    .then((theWod) => {
      // GET TO THE DETAILLED WOD
      console.log(theWod);
      let reps = [
        theWod.ex1reps,
        theWod.ex2reps,
        theWod.ex3reps,
        theWod.ex4reps,
        theWod.ex5reps,
      ];

      res.render("wod/wod-details.hbs", { theWod, reps });
    })
    .catch((err) => {
      next(err);
    });
});

// USER CAN EDIT THI SPECIFIC WOD
router.get("/wod/:id/edit", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  Wod.findById(id)
    .populate("exercises")
    .then((theWod) => {
      let outsideChecked = theWod.environement == "Outside";
      Exercise.find()
        .then((allExercises) => {
          //allTheExercises = allExercises;
          let names = theWod.exercises.map((e) => {
            return e.name;
          });
          //console.log("names is =" , names);
          let cloned = JSON.parse(JSON.stringify(allExercises));
          let newExercises = cloned.map((e) => {
            if (names.includes(e.name)) {
              e.selected = true;
            }
            return e;
          });
          /*  let filtered = newExercises.filter((e) => e.selected);
            console.log(filtered); */
          // GO TO THE WOD EDIT FORM
          res.render("wod/wod-edit.hbs", {
            theWod,
            outsideChecked,
            allExercises /* : newExercises */,
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/wod/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, environement, exercises, rounds, duration, intensity } =
    req.body;
  Wod.findByIdAndUpdate(id, {
    name,
    environement,
    exercises,
    rounds,
    duration,
    intensity,
  })
    .populate("exercises")
    .then(() => {
      res.redirect("/wod");
    })
    .catch((err) => {
      next(err);
    });
});

// USER CAN DELETE THIS SPECIFIC WOD
router.post("/wod/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Wod.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/wod");
    })
    .catch((err) => {
      next(err);
    });
});

// USER CAN START TO WORKOUT
router.get("/wod/:id/timer", (req, res, next) => {
  const { id } = req.params;
  Wod.findById(id)
    .populate("exercises")
    .then((theWod) => {
      let reps = [
        theWod.ex1reps,
        theWod.ex2reps,
        theWod.ex3reps,
        theWod.ex4reps,
        theWod.ex5reps,
      ];
      res.render("wod/timer.hbs", { theWod, reps });
    })
    .catch((err) => {
      next(err);
    });
});

// EXPORT THE ROUTES
module.exports = router;
