require("./Exercise.model");
require("./User.model");
const { Schema, model } = require("mongoose");

require("./User.model");

// The Wod Schema
const WodSchema = new Schema({
  name: String,
  environement: String,
  exercises: {
    type: [Schema.Types.ObjectId],
    ref: "exercise",
  },
  ex1reps: Number,
  ex2reps: Number,
  ex3reps: {
    type: Number,
    default: 0,
  },
  ex4reps: Number,
  ex5reps: Number,
  rounds: Number,
  duration: {
    type: Number,
    min: 0,
  },
  intensity: {
    type: String,
    enum: ["Easy", "Medium", "Hard", "Insane"],
  },
<<<<<<< HEAD
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
=======
  user:{
    type: Schema.Types.ObjectId,
    ref: "user"
  }
>>>>>>> 9b7fcb4bb3552cef20e1b13b4fc3bd3e0e807769
});

const Wod = model("wod", WodSchema);

module.exports = Wod;
