const { Server } = require("socket.io")
const classroomSocket = require("./classroom.socket")

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id)

        classroomSocket(io, socket)

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id)
        })
    })
    
}