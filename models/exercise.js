const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    muscle: {type: String, required: true},
    difficulty: {type: Number, max: 10, min: 1, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    saved: {type: Number, max: 1, min: 0, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

exerciseSchema.index({name: "text", muscle: "text"})
const Exercise = mongoose.model("Exercise", exerciseSchema)

module.exports = Exercise