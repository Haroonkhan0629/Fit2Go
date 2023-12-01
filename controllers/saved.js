const express = require("express")
const saved = express.Router()
const Stretch = require("../models/stretch.js")
const Exercise = require("../models/exercise.js")

saved.get("", async function (req, res) {
    try { 
    const exercises = await Exercise.find({saved: 1}).exec()
    const stretches = await Stretch.find({saved: 1}).exec()
    res.render("saved.ejs", {
        exercises: exercises,
        stretches: stretches
    })
    } catch (error) {
       res.render("saved.ejs", {
        exercises: [],
        stretches: [],
        error: "An error occured while saving."
       })
    }
})

saved.get("/exercise/:id", function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, {$inc: {saved: 1}}, function (error, data) {
        res.redirect("/saved/exercise/" + req.params.id)
    })
})

saved.get("/stretch/:id", function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, {$inc: {saved: 1}}, function (error, data) {
        res.redirect("/saved/stretch/" + req.params.id)
    })
})


saved.get("/unsave/exercise/:id", function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, {$inc: {saved: -1}}, function (error, data) {
        res.redirect("/saved/unsave/exercise" + req.params.id)
    })
})

saved.get("/unsave/stretch/:id", function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, {$inc: {saved: -1}}, function (error, data) {
        res.redirect("/saved/unsave/stretch" + req.params.id)
    })
})

module.exports = saved



