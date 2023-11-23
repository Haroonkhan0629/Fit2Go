const bcrypt = require("bcrypt")
const express = require("express")
const user = express.Router()
const User = require("../models/user.js")

user.get("/new", function (req, res) {
    res.render("users/new.ejs", {
        currentUser: req.session.currentUser,
        tabTitle: "Register"
    })
})

user.post("/", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
      console.log('user is created', createdUser)
      res.redirect("/exercises/stretches")
    })
  })

module.exports = user