const app =require("express")
const cors = require("cors")
require("dotenv").config()

// Middleware
app.use(cors())
app.use(express.json())

//export app
module.exports = app