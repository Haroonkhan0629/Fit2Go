const express = require("express")
const saved = express.Router()
const Stretch = require("../models/stretch.js")
const Exercise = require("../models/exercise.js")
const User = require("../models/user.js")

function isAuthenticated(req, res, next) {
    if (req.session.currentUser) {
        return next()
    }
}

saved.get("", async function (req, res) {
    try { 
    const exercises = await Exercise.find({saved: 1}).exec()
    const stretches = await Stretch.find({saved: 1}).exec()
    res.render("saved.ejs", {
        exercises: exercises,
        stretches: stretches,
        currentUser: req.session.currentUser
    })
    } catch (error) {
       res.render("saved.ejs", {
        exercises: [],
        stretches: [],
        error: "An error occured while saving."
       })
    }
})

saved.get("/exercise/:id", isAuthenticated, function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, {$inc: {saved: 1}}, function (error, data) {
        res.redirect("/saved/")
    })
})

saved.get("/stretch/:id", isAuthenticated, function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, {$inc: {saved: 1}}, function (error, data) {
        res.redirect("/saved/")
    })
})


saved.get("/unsave/exercise/:id", isAuthenticated, function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, {$inc: {saved: -1}}, function (error, data) {
        res.redirect("/saved/")
    })
})

saved.get("/unsave/stretch/:id", isAuthenticated, function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, {$inc: {saved: -1}}, function (error, data) {
        res.redirect("/saved/")
    })
})

module.exports = saved



