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
  rounds: Number,
  duration: {
    type: Number,
    min: 0,
  },
  intensity: {
    type: String,
    enum:["Easy" , "Medium" , "Hard" , "Insane"],
  },
});

const Wod = model("wod", WodSchema);

module.exports = Wod;
