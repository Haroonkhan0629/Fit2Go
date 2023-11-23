const express = require("express")
const router = express.Router()
const Exercise = require("../models/exercise.js")
const seedExercise = require("../models/seedExercise.js")

// Exercise.create(seedExercise, function (error, data) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// })

router.get("/stretches", function (req, res) {
    res.render("index.ejs", {
        tabTitle: "Fitness"
    })
})

router.get("", function (req, res) {
    Exercise.find({}, function (error, data) {
        res.render("exerciseIndex.ejs", {
            exercises: data,
            tabTitle: "Exercises"
        })
    })
})

router.get("/new", function (req,res) {
    res.render("exerciseNew.ejs", {
        tabTitle: "Creating"
    })
})

router.delete("/:id", function (req, res) {
    Exercise.findByIdAndDelete(req.params.id, function () {
        res.redirect("/exercises")
    })
})

router.put("/:id", function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true}, function () {
        res.redirect("/exercises/" + req.params.id)
    })
})

router.post("", function (req, res) {
    Exercise.create(req.body, function (error, data) {
        res.redirect("/exercises")
    })
})

router.get("/:id/edit", function (req, res) {
    Exercise.findById(req.params.id, function (error, data) {
        res.render("exerciseEdit.ejs", {
            exercise: data,
            i: req.params.id,
            tabTitle: "Editing"
        })
    })
})

router.get("/:id", function (req, res) {
    Exercise.findById(req.params.id, function (error, data) {
        res.render("exerciseShow.ejs", {
            exercise: data,
            tabTitle: "Exercises"
        })
    })
})

module.exports = router