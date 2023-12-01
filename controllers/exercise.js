const express = require("express")
const exercise = express.Router()
const Exercise = require("../models/exercise.js")
const seedExercise = require("../models/seedExercise.js")

// Exercise.create(seedExercise, function (error, data) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// })

exercise.get("/stretches", function (req, res) {
    res.render("index.ejs", {
        tabTitle: "Fitness"
    })
})

exercise.get("", function (req, res) {
    Exercise.find({}, function (error, data) {
        res.render("exercise/exerciseIndex.ejs", {
            exercises: data,
            tabTitle: "Exercises"
        })
    })
})

exercise.get("/new", function (req,res) {
    res.render("exercise/exerciseNew.ejs", {
        tabTitle: "Creating"
    })
})

exercise.delete("/:id", function (req, res) {
    Exercise.findByIdAndDelete(req.params.id, function () {
        res.redirect("/exercises")
    })
})

exercise.put("/:id", function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true}, function () {
        res.redirect("/exercises/" + req.params.id)
    })
})

exercise.post("", function (req, res) {
    Exercise.create(req.body, function (error, data) {
        res.redirect("/exercises")
    })
})

exercise.get("/:id/edit", function (req, res) {
    Exercise.findById(req.params.id, function (error, data) {
        res.render("exercise/exerciseEdit.ejs", {
            exercise: data,
            i: req.params.id,
            tabTitle: "Editing"
        })
    })
})

exercise.get("/:id", function (req, res) {
    Exercise.findById(req.params.id, function (error, data) {
        res.render("exercise/exerciseShow.ejs", {
            exercise: data,
            tabTitle: "Exercises"
        })
    })
})

module.exports = exercise