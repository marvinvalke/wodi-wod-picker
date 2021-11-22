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
router.get(
  "/wod",
  /* isLoggedIn, */ (req, res, next) => {
    Wod.find()
      .then((wods) => {
        res.render("wod/wod-list.hbs", { wods });
      })
      .catch((err) => {
        next(err);
      });
  }
);

// USER CAN CREATE A WOD
router.get(
  "/wod/create",
  /* isLoggedIn, */ (req, res, next) => {
    Exercise.find()
      .then((allExercises) => {
        res.render("wod/wod-create.hbs", { allExercises });
      })
      .catch((err) => {
        next(err);
      });
  }
);

// CREATING A WOD IF SUCCESS GO BACK TO WOD LIST PAGE OTHERWISE REDIRECT TO CREATE A WOD PAGE
router.post(
  "/wod/create",
  /* isLoggedIn, */ (req, res, next) => {
    const { name, environement, exercises, rounds, duration, intensity } =
      req.body;
    console.log(req.body);
    Wod.create({ name, environement, exercises, rounds, duration, intensity })
      .then(() => {
        res.redirect("/wod");
      })
      .catch((err) => {
        res.render("wod/wod-create.hbs");
      });
  }
);

// USER CAN CHECK ON A SPECIFIC WOD
router.get(
  "/wod/:id",
  /* isLoggedIn, */ (req, res, next) => {
    const { id } = req.params;
    Wod.findById(id)
      .populate("exercises")
      .then((theWod) => {
        // GET TO THE DETAILLED WOD
        res.render("wod/wod-details.hbs", { theWod });
      })
      .catch((err) => {
        next(err);
      });
  }
);

// USER CAN START WORKING OUT => TIMER
router.get("/wod/:id/timer", (req, res, next) => {
  res.render("wod/timer.hbs");
});

// USER CAN EDIT THI SPECIFIC WOD
router.get(
  "/wod/:id/edit",
  /* isLoggedIn, */ (req, res, next) => {
    const { id } = req.params;
    Wod.findById(id)
      .populate("exercises")
      .then((theWod) => {
        console.log('EXERCISE IN THE WOD =', theWod.exercises)
        // GO TO THE WOD EDIT FORM
        res.render("wod/wod-edit.hbs", { theWod });
      })
      .catch((err) => {
        next(err);
      });
  }
);

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
router.post("wod/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Wod.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/wod");
    })
    .catch((err) => {
      next(err);
    });
});

// EXPORT THE ROUTES
module.exports = router;
