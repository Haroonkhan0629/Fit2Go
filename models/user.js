const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    exercises: [{type: mongoose.Schema.Types.ObjectId, ref: "Exercise"}],
    stretches: [{type: mongoose.Schema.Types.ObjectId, ref: "Stretch"}]
})

const User = mongoose.model("User", userSchema)

module.exports = User