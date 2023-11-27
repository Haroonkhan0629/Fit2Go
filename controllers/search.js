const express = require("express")
const router = express.Router()
const Stretch = require("../models/stretch.js")
const Exercise = require("../models/exercise.js")

Exercise.ensureIndexes({name: "text", muscle: "text"})

router.get("", function (req, res) {
    Exercise.find({$text: {$search: "back"}}, function (error, data) {
        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }
        res.render("search.ejs")
    })
})

module.exports = router