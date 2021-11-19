require("./Exercise.model");
const { Schema, model } = require("mongoose");

// The Wod Schema
const WodSchema = new Schema({
  name: String,
  environement: String,
  exercises: {
    type: Schema.Types.ObjectId,
    ref: "exercise",
  },
  rounds: Number,
  duration: Number,
  intensity: Number,
});

const Wod = model("wod", WodSchema);

module.exports = Wod;
