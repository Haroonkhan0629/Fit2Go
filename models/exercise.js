const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    muscle: {type: String, required: true},
    difficulty: {type: Number, max: 10, min: 1, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    saved: {type: Number, required: true}
})

exerciseSchema.index({name: "text", muscle: "text"})
const Exercise = mongoose.model("Exercise", exerciseSchema)

module.exports = Exercise