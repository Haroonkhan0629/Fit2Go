require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require('express-session')

const methodOverride = require("method-override")
const exerciseController = require("./controllers/exercise.js")
const stretchController = require("./controllers/stretch.js")
const aboutController = require("./controllers/about.js")
const userController = require("./controllers/user.js")
const sessionController = require("./controllers/session.js")
const searchController = require("./controllers/search.js")
const savedController = require("./controllers/saved.js")

const PORT = process.env.PORT || 3000
const mongodbURI = process.env.MONGODBURI

mongoose.connect("mongodb://127.0.0.1:27017")
mongoose.connection.once("open", function () {
    console.log("connected to mongo")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

app.use("/exercises", exerciseController)
app.use("/stretches", stretchController)
app.use("/about", aboutController)
app.use("/users", userController)
app.use("/sessions", sessionController)
app.use("/searches", searchController)
app.use("/saved", savedController)

app.get("/", function (req, res) {
    res.render("index.ejs", {
        currentUser: req.session.currentUser
    })
})

app.listen(PORT, function () {
    console.log(`App is running on port ${PORT}`)
})