const express =require("express")
const cors = require("cors")
const router = require("./src/Routes/AuthRoutes")
require("dotenv").config()
const connectDB = require("./src/db/db")
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// routes
app.use("/api/auth",router)

//export app
module.exports = app