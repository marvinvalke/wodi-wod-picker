const { Schema, model } = require("mongoose");

const ExerciseSchema = new Schema({
  name: { type: String, text: true },
  bodyPart: String,
  target: String,
  equipment: String,
  gifUrl: String,
  id: String,
});

const Exercise = model("exercise", ExerciseSchema);
module.exports = Exercise;
