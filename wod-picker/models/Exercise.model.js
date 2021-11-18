const { Schema, model } = require("mongoose");

const ExerciseSchema = new Schema ({
    name: String,
    difficultyRate: Number,
    numberOfRep: Number,
    targetedMuscle: Array,
    img: String,
    link: String,
}),

const ExerciseModel = model("Exercise" , ExerciseSchema);
module.exports = ExerciseModel;