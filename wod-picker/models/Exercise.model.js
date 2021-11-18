const { Schema, model } = require("mongoose");

const ExerciseSchema = new Schema ({
    name: String,
    difficultyRate: Number,
    numberOfRep: Number,
    targetedMuscle: {
        type: String,
        enum:['Full-body','Arms' , 'Abs' , 'Back' , 'Legs'],
        default: 'Full-body'
    },
    img: String,
    link: String,
}),

const Exercise = model("Exercise" , ExerciseSchema);
module.exports = Exercise;