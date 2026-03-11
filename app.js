const app =require("express")
const cors = require("cors")
const router = require("./src/Routes/AuthRoutes")
require("dotenv").config()

// Middleware
app.use(cors())
app.use(express.json())

// routes
app.use("/api/auth",router)

//export app
module.exports = app