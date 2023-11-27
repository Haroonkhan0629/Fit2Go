const express = require("express")
const router = express.Router()
const Stretch = require("../models/stretch.js")
const Exercise = require("../models/exercise.js")


router.get("", function (req, res) {
    const userSearch = req.query.search
    Exercise.find({$text: {$search: userSearch}}, function (exerciseError, exerciseData) {
        res.render("search.ejs", {
            exercises: exerciseData
        })
    })
    Stretch.find({$text: {$search: userSearch}}, function (stretchError, stretchData) {
        if (stretchError) {
            console.log(stretchError)
        } else {
            console.log(stretchData)
        }
    })
})

module.exports = router