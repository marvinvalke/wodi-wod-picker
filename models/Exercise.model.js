const { Schema, model } = require("mongoose");

const ExerciseSchema = new Schema({
  name: { type: String, text: true },
  bodyPart: { type: String, text: true },
  target: { type: String, text: true },
  equipment: { type: String, text: true },
  gifUrl: String,
  id: String,
});

const Exercise = model("exercise", ExerciseSchema);
module.exports = Exercise;
