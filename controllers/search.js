const express = require("express")
const router = express.Router()
const Stretch = require("../models/stretch.js")
const Exercise = require("../models/exercise.js")

const userSearch = 

router.get("", function (req, res) {
    Exercise.find({$text: {$search: "chest"}}, function (exerciseError, exerciseData) {
        if (exerciseError) {
            console.log(exerciseError)
        } else {
            console.log(exerciseData)
        }
        res.render("search.ejs", {
            exercises: exerciseData
        })
    })
    Stretch.find({$text: {$search: "chest"}}, function (stretchError, stretchData) {
        if (stretchError) {
            console.log(stretchError)
        } else {
            console.log(stretchData)
        }
    })
})

module.exports = router