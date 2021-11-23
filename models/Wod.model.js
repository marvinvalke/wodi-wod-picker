require("./Exercise.model");
const { Schema, model } = require("mongoose");

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
    default: 0
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
});

const Wod = model("wod", WodSchema);

module.exports = Wod;
