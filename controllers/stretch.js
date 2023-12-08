const express = require("express")
const stretch = express.Router()
const Stretch = require("../models/stretch.js")
const seedStretch = require("../models/seedStretch.js")
const User = require("../models/user.js")

function isAuthenticated(req, res, next) {
    if (req.session.currentUser) {
        return next()
    }
}

// Stretch.create(seedStretch, function (error, data) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// })

stretch.get("", function (req, res) {
    Stretch.find({}, function (error, data) {
        res.render("stretch/stretchIndex.ejs", {
            stretches: data,
            currentUser: req.session.currentUser
        })
    })
})

stretch.get("/new", isAuthenticated, function (req,res) {
    res.render("stretch/stretchNew.ejs", {
        currentUser: req.session.currentUser
    })
})

stretch.delete("/:id", isAuthenticated, function (req, res) {
    Stretch.findByIdAndDelete(req.params.id, function () {
        res.redirect("/stretches")
    })
})

stretch.put("/:id", isAuthenticated, function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, req.body, {new: true}, function () {
        res.redirect("/stretches/" + req.params.id)
    })
})

stretch.post("", isAuthenticated, function (req, res) {
    Stretch.create(req.body, function (error, data) {
        res.redirect("/stretches")
    })
})

stretch.get("/:id/edit", isAuthenticated, function (req, res) {
    Stretch.findById(req.params.id, function (error, data) {
        res.render("stretch/stretchEdit.ejs", {
            stretch: data,
            i: req.params.id,
            currentUser: req.session.currentUser
        })
    })
})

stretch.get("/:id", function (req, res) {
    Stretch.findById(req.params.id, function (error, data) {
        res.render("stretch/stretchShow.ejs", {
            stretch: data,
            currentUser: req.session.currentUser
        })
    })
})

module.exports = stretch