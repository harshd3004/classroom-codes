const http = require("http")
require("dotenv").config()
const app = require("./app")
const initSockets = require("./sockets")

const PORT = process.env.PORT || 3001

//db connection
const connectDB = require('./config/db')
connectDB()

const server = http.createServer(app)

initSockets(server)

server.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})