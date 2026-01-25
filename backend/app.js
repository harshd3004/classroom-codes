const express = require("express")
const app = express()

//middleware
app.use(express.json())

//routes
const routes = require("./routes")
app.use("/api/classrooms", routes.classroomRoutes)

app.use("/api", (req, res) => {
    res.send("Classroom Codes API is running")
})

module.exports = app