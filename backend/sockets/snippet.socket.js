const Snippet = require("../models/Snippet");
const Classroom = require("../models/Classroom");
const { usersBySocket } = require("./socketStates");

module.exports = (io, socket) => {
    socket.on("submit_snippet", async ({classroomId, code, language, name}) => {
        try {
            if(!classroomId || !code) return;

            const user = usersBySocket.get(socket.id);
            if (!user) {
                socket.emit("snippet_error", { error: "User not recognized" });
                return;
            }

            if(user.classroomId.toString() !== classroomId) return;

            const classroom = await Classroom.findById(classroomId);
            if (!classroom || !classroom.isActive || classroom.expiresAt < Date.now()) {
                socket.emit("snippet_error", { error: "Classroom not found" });
                return;
            }

            const snippet = await Snippet.create({
                name,
                classroomId,
                userId: user.userId,
                code,
                language
            })

            io.to(classroomId).emit("snippet_submitted", {
                snippetId: snippet._id,
                userId: user.userId,
                name,
                code,
                language,
                createdAt: snippet.createdAt
            })
        }catch (err) {
            console.error(err);
            socket.emit("snippet_error", { error: "Internal server error" });
        }
    })
}