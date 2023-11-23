const express = require("express")
const router = express.Router()
const Stretch = require("../models/stretch.js")
const seedStretch = require("../models/seedStretch.js")

// Stretch.create(seedStretch, function (error, data) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// })

router.get("", function (req, res) {
    Stretch.find({}, function (error, data) {
        res.render("stretchIndex.ejs", {
            stretches: data,
            tabTitle: "Stretches"
        })
    })
})

router.get("/new", function (req,res) {
    res.render("stretchNew.ejs", {
        tabTitle: "Creating"
    })
})

router.delete("/:id", function (req, res) {
    Stretch.findByIdAndDelete(req.params.id, function () {
        res.redirect("/stretches")
    })
})

router.put("/:id", function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, req.body, {new: true}, function () {
        res.redirect("/stretches/" + req.params.id)
    })
})

router.post("", function (req, res) {
    Stretch.create(req.body, function (error, data) {
        res.redirect("/stretches")
    })
})

router.get("/:id/edit", function (req, res) {
    Stretch.findById(req.params.id, function (error, data) {
        res.render("stretchEdit.ejs", {
            stretch: data,
            i: req.params.id,
            tabTitle: "Editing"
        })
    })
})

router.get("/:id", function (req, res) {
    Stretch.findById(req.params.id, function (error, data) {
        res.render("stretchShow.ejs", {
            stretch: data,
            tabTitle: "Stretches"
        })
    })
})

module.exports = router