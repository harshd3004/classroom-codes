const { usersBySocket, socketsByUser } = require("./socketStates")
const Classroom = require("../models/Classroom")

module.exports = (io, socket) => {
    socket.on("join_room", ({ classroomId, userId, role}) => {
        if (!classroomId || !userId) {
            socket.disconnect();
            return;
        }

        socket.join(classroomId)

        // Handle refresh / duplicate sockets
        const oldSocketId = socketsByUser.get(userId);
            if (oldSocketId && oldSocketId !== socket.id) {
            io.to(oldSocketId).disconnectSockets(true);
        }

        usersBySocket.set(socket.id, { userId, classroomId, role })
        socketsByUser.set(userId, socket.id)

        socket.to(classroomId).emit("user_joined", { userId, role})
    })

    socket.on("leave_room", () => {
        const user = usersBySocket.get(socket.id);
        if (!user) return;

        usersBySocket.delete(socket.id);
        socketsByUser.delete(user.userId);

        socket.to(user.classroomId).emit("user_left", {
        userId: user.userId
        });
    });

    socket.on("end_class", async({ classroomId, userId}) => {
        const user = usersBySocket.get(socket.id);
        if (!user) return;
        if (user.userId !== userId) return;
        if (user.role !== "host") return;
        if (user.classroomId !== classroomId) return;

        // Update DB (authoritative)
        await Classroom.findByIdAndUpdate(classroomId, {
            isActive: false
        });

        // Notify all clients in the classroom
        io.to(classroomId).emit("class_ended");

        // Disconnect all sockets in the classroom
        const sockets = await io.in(classroomId).fetchSockets();

        sockets.forEach(s => {
            const u = usersBySocket.get(s.id);

            if (u) {
                socketsByUser.delete(u.userId);
                usersBySocket.delete(s.id);
            }

            s.leave(classroomId);
            s.disconnect(true);
        });

    })

}