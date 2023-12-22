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

exercise.get("/seed", function (req, res) {
    const userID = req.session.currentUser._id
    Exercise.create(seedExercise, function (err, exercises) {
        if (err) {
            console.log(err)
        } else {
            console.log(exercises)
            for (let i = 0; i < exercises.length; i++) {
                User.findByIdAndUpdate(userID, { $push: { exercises: exercises[i]._id } }, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`exercise Id was added to the users db: `, exercises[i]._id)
                    }
                })
            }
        }
    })
})

exercise.get("/stretches", function (req, res) {
    res.render("index.ejs")
})

exercise.get("", function (req, res) {
    Exercise.find({}, function (err, data) {
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
    const userId = req.session.currentUser._id;

    Exercise.findById(req.params.id, (err, exercise) => {
        if(err) {
            console.log(err);
        } else {
            if(exercise && exercise.author.toString() === userId.toString()) {
                Exercise.findByIdAndRemove(req.params.id, (err, data) => {
                    if(err) {
                        console.log(err);
                    } else {
                        User.findByIdAndUpdate(userId, {$pull: {exercises: exercise._id}}, (err, user) => {
                            if(err) {
                                console.log(err);
                            } else {
                                res.redirect(`/exercises/`)
                            }
                        })
                    }
                })
            } else {
                res.redirect(`/exercises/${req.params.id}`)
            }
        }
    })
})

exercise.put("/:id", isAuthenticated, function (req, res) {
    Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true }, function () {
        if (req.body.saved === "on") {
            req.body.saved = true
        } else {
            req.body.saved = false
        }
        res.redirect("/exercises/" + req.params.id)
    })
})

exercise.post("", isAuthenticated, function (req, res) {
    const userID = req.session.currentUser._id
    const exerciseData = {
        name: req.body.name,
        muscle: req.body.muscle,
        difficulty: req.body.difficulty,
        description: req.body.description,
        image: req.body.image,
        saved: req.body.saved,
        author: userID
    }
    Exercise.create(exerciseData, function (err, exercise) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Exercise was added to the db: `, exercise);

            User.findByIdAndUpdate(userID, { $push: { exercises: exercise._id } }, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`exercise Id was added to the users db: `, exercise._id)
                }
            })
            res.redirect(`/exercises/`);
        }
    })

})

exercise.get("/:id/edit", isAuthenticated, function (req, res) {
    const userId = req.session.currentUser._id;

    Exercise.findById(req.params.id, (err, exercise) => {
        if (err) {
            console.log(err);
        } else {
            if (exercise.author.toString() === userId.toString()) {
                res.render("exercise/exerciseEdit.ejs", {
                    exercise: exercise,
                    i: req.params.id,
                    currentUser: req.session.currentUser
                });
            } else {
                res.redirect(`/exercises/${req.params.id}`)
            }
        }
    })
})

exercise.get("/:id", function (req, res) {
    Exercise.findById(req.params.id, function (err, data) {
        res.render("exercise/exerciseShow.ejs", {
            exercise: data,
            currentUser: req.session.currentUser
        })
    })
})

module.exports = exercise