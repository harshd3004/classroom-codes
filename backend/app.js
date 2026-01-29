const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorMiddleware")

//cors
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}
app.use(cors(corsOptions));

//middleware
app.use(express.json())

//routes
const routes = require("./routes")
app.use("/api/classrooms", routes.classroomRoutes)

app.use("/api", (req, res) => {
    res.send("Classroom Codes API is running")
})

//error handler
app.use(errorHandler)

module.exports = app