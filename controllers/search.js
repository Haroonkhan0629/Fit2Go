const express = require("express")
const router = express.Router()
const Stretch = require("../models/stretch.js")
const Exercise = require("../models/exercise.js")


router.get("", async function (req, res) {
    try {
        const userSearch = req.query.search

        const exerciseData = await Exercise.find({ $text: { $search: userSearch } }).exec()
        const stretchData = await Stretch.find({ $text: { $search: userSearch } }).exec()
            res.render("search.ejs", {
                exercises: exerciseData,
                stretches: stretchData
            })
    } catch (error) {
        res.render("search.ejs", {
            exercises: [],
            stretches: [],
            error: 'An error occurred while searching.'
        });
    }
});

module.exports = router