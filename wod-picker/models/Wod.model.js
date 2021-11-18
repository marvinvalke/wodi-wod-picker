const { Schema, model } = require("mongoose");

// The Wod Schema
const WodSchema = new Schema ({
    name: String,
    environement: String,
    exercises: {
        type: Object.Types.ObjectId,
        ref: 'Exercise'
    },
    rounds: Number,
    duration: Number,
    intensity: Number,
}),

const Wod = model("Wod", WodSchema);

module.exports = Wod;