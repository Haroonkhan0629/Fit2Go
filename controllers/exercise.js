const express = require("express")
const exercise = express.Router()
const Exercise = require("../models/exercise.js")
const seedExercise = require("../models/seedExercise.js")
const User = require("../models/user.js")

function isAuthenticated(req, res, next) {
    if (req.session.currentUser) {
        return next()
    }
}

// Exercise.create(seedExercise, function (error, data) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// })

exercise.get("/stretches", function (req, res) {
    res.render("index.ejs")
})

exercise.get("", function (req, res) {
    Exercise.find({}, function (error, data) {
        res.render("exercise/exerciseIndex.ejs", {
            exercises: data,
            currentUser: req.session.currentUser
        })
    })
})

exercise.get("/new", isAuthenticated, function (req, res) {
    res.render("exercise/exerciseNew.ejs", {
        currentUser: req.session.currentUser
    })
})

exercise.delete("/:id", isAuthenticated, function (req, res) {
    Exercise.findByIdAndDelete(req.params.id, function () {
        res.redirect("/exercises")
    })
})

exercise.put("/:id", isAuthenticated, function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true }, function () {
        res.redirect("/exercises/" + req.params.id)
    })
})

exercise.post("", isAuthenticated, function (req, res) {
    Exercise.create(req.body, function (error, data) {
        console.log(data)
        res.redirect("/exercises")
    })
})

exercise.get("/:id/edit", isAuthenticated, function (req, res) {
    Exercise.findById(req.params.id, function (error, data) {
        res.render("exercise/exerciseEdit.ejs", {
            exercise: data,
            i: req.params.id,
            currentUser: req.session.currentUser
        })
    })
})

exercise.get("/:id", function (req, res) {
    Exercise.findById(req.params.id, function (error, data) {
        res.render("exercise/exerciseShow.ejs", {
            exercise: data,
            tabTitle: "Exercises",
            currentUser: req.session.currentUser
        })
    })
})

module.exports = exercise