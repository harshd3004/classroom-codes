const express = require("express")
const app = express()
const errorHandler = require("./middleware/errorMiddleware")

//cors
const cors = require('cors');
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean)

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests without an Origin header (e.g. curl, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
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