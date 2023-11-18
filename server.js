const express = require("express")
const app = express()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const exerciseController = require("./controllers/exercise.js")

mongoose.connect("mongodb://127.0.0.1:27017")
mongoose.connection.once("open", function () {
    console.log("connected to mongo")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.use("/exercises", exerciseController)

app.listen(3000, function () {
    console.log("App is listening on port 3000")
})