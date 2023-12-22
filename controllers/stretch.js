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

stretch.get("/seed", function (req, res) {
    const userID = req.session.currentUser._id
    Stretch.create(seedStretch, function (err, stretches) {
        if (err) {
            console.log(err)
        } else {
            console.log(stretches)
            for (let i = 0; i < stretches.length; i++) {
                User.findByIdAndUpdate(userID, { $push: { stretches: stretches[i]._id } }, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`stretch Id was added to the users db: `, stretches[i]._id)
                    }
                })
            }
        }
    })
})

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
    const userId = req.session.currentUser._id;

    Stretch.findById(req.params.id, (err, stretch) => {
        if(err) {
            console.log(err);
        } else {
            if(stretch && stretch.author.toString() === userId.toString()) {
                Stretch.findByIdAndRemove(req.params.id, (err, data) => {
                    if(err) {
                        console.log(err);
                    } else {
                        User.findByIdAndUpdate(userId, {$pull: {stretches: stretch._id}}, (err, user) => {
                            if(err) {
                                console.log(err);
                            } else {
                                res.redirect(`/stretches/`)
                            }
                        })
                    }
                })
            } else {
                res.redirect(`/stretches/${req.params.id}`)
            }
        }
    })
})

stretch.put("/:id", isAuthenticated, function (req, res) {
    Stretch.findByIdAndUpdate(req.params.id, req.body, {new: true}, function () {
        res.redirect("/stretches/" + req.params.id)
    })
})

stretch.post("", isAuthenticated, function (req, res) {
    const userID = req.session.currentUser._id
    const stretchData = {
        name: req.body.name,
        muscle: req.body.muscle,
        time: req.body.time,
        description: req.body.description,
        image: req.body.image,
        saved: req.body.saved,
        author: userID
    }
    Stretch.create(stretchData, function (err, stretch) {
        if (err) {
            console.log(err);
        } else {
            console.log(`stretch was added to the db: `, stretch);

            User.findByIdAndUpdate(userID, { $push: { stretches: stretch._id } }, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`stretch Id was added to the users db: `, stretch._id)
                }
            })
            res.redirect(`/stretches/`);
        }
    })

})

stretch.get("/:id/edit", isAuthenticated, function (req, res) {
    const userId = req.session.currentUser._id;

    Stretch.findById(req.params.id, (err, stretch) => {
        if (err) {
            console.log(err);
        } else {
            if (stretch.author.toString() === userId.toString()) {
                res.render("stretch/stretchEdit.ejs", {
                    stretch: stretch,
                    i: req.params.id,
                    currentUser: req.session.currentUser
                });
            } else {
                res.redirect(`/stretches/${req.params.id}`)
            }
        }
    })
})

stretch.get("/:id", function (req, res) {
    Stretch.findById(req.params.id, function (err, data) {
        res.render("stretch/stretchShow.ejs", {
            stretch: data,
            currentUser: req.session.currentUser
        })
    })
})

module.exports = stretch
