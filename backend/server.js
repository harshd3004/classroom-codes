const express = require("express")
require("dotenv").config()

const PORT = process.env.PORT || 3001
const app = express()

//db connection
const connectDB = require('./config/db')
connectDB()

//middleware
app.use(express.json())

//routes
const routes = require("./routes")
app.use("/api/classrooms", routes.classroomRoutes)

app.use("/api", (req, res) => {
    res.send("Classroom Codes API is running")
})

app.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})