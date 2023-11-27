const bcrypt = require('bcrypt')
const express = require('express')
const session = express.Router()
const User = require('../models/user')

session.get("/new", (req, res) => {
    res.render('sessions/new.ejs', { 
        currentUser: req.session.currentUser,
        tabTitle: "Log-In"
    })
})

session.post("/", (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(err) {
            console.log(err)
            res.send('oops, you hit an error')
        } else if (!foundUser) {
            res.render("incorrect.ejs")
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
               req.session.currentUser = foundUser
               res.redirect('/')
            } else {
                res.render("incorrect.ejs")
            }
        }
    })
})

session.delete("/", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})

module.exports = session