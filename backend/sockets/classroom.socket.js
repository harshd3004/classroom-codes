const { usersBySocket, socketsByUser } = require("./socketStates")
const Classroom = require("../models/Classroom");
const User = require("../models/User");

module.exports = (io, socket) => {
    socket.on("join_room", async ({ classroomId, userId }) => {
        try {
            if (!classroomId || !userId) {
            socket.disconnect(true)
            return
            }

            // Validate classroom
            const classroom = await Classroom.findById(classroomId)
            if (!classroom) {
            socket.disconnect(true)
            return
            }

            // Validate user
            const user = await User.findById(userId).select("_id name role")
            if (!user) {
            socket.disconnect(true)
            return
            }

            const oldSocketId = socketsByUser.get(userId)
            if (oldSocketId && oldSocketId !== socket.id) {
            io.to(oldSocketId).disconnectSockets(true)
            }

            socket.join(classroomId)

            usersBySocket.set(socket.id, { userId, classroomId })
            socketsByUser.set(userId, socket.id)

            socket.to(classroomId).emit("user_joined", {
            userId: user._id,
            name: user.name,
            role: user.role
            })

        } catch (err) {
            console.error("join_room error:", err)
            socket.disconnect(true)
        }
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