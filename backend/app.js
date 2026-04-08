const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorMiddleware")

//cors
const cors = require('cors');
app.use(cors());

//middleware
app.use(express.json())

//routes
const routes = require("./routes")
app.use("/api/classrooms", routes.classroomRoutes)

app.get("/", (req, res) => {
    res.status(200).send("Server is live");
});

app.use("/api", (req, res) => {
    res.send("Classroom Codes API is running")
})

//error handler
app.use(errorHandler)

module.exports = app