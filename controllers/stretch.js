const express = require("express")
const stretch = express.Router()
const Stretch = require("../models/stretch.js")
const seedStretch = require("../models/seedStretch.js")

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
            tabTitle: "Stretches"
        })
    })
})

stretch.get("/new", function (req,res) {
    res.render("stretch/stretchNew.ejs", {
        tabTitle: "Creating"
    })
})

stretch.delete("/:id", function (req, res) {
    Stretch.findByIdAndDelete(req.params.id, function () {
        res.redirect("/stretches")
    })
})

stretch.put("/:id", function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, req.body, {new: true}, function () {
        res.redirect("/stretches/" + req.params.id)
    })
})

stretch.post("", function (req, res) {
    Stretch.create(req.body, function (error, data) {
        res.redirect("/stretches")
    })
})

stretch.get("/:id/edit", function (req, res) {
    Stretch.findById(req.params.id, function (error, data) {
        res.render("stretch/stretchEdit.ejs", {
            stretch: data,
            i: req.params.id,
            tabTitle: "Editing"
        })
    })
})

stretch.get("/:id", function (req, res) {
    Stretch.findById(req.params.id, function (error, data) {
        res.render("stretch/stretchShow.ejs", {
            stretch: data,
            tabTitle: "Stretches"
        })
    })
})

module.exports = stretch