const mongoose = require("mongoose")

const stretchSchema = new mongoose.Schema({
    name: {type: String, required: true},
    muscle: {type: String, required: true},
    time: {type: Number, min: 1, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    saved: {type: Number,  max: 1, min: 0, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

stretchSchema.index({name: "text", muscle: "text"})
const Stretch = mongoose.model("Stretch", stretchSchema)

module.exports = Stretch