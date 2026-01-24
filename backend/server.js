const express = require("express")
require("dotenv").config()

const PORT = process.env.PORT || 3001
const app = express()

const connectDB = require('./config/db')
connectDB()

//routes
const routes = require("./routes")
app.use("/api/classrooms", routes.classroomRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})