const mongoose = require("mongoose")
const User = require("./User")

const snippetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: "Untitled Snippet"
        },
        classroomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classroom",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        code: {
            type: String,
            required: true
        },
        language: {
            type: String,
            default: "txt"
        },
        status: {
            type: String,
            enum: ["active", "archived"],
            default: "active"
        },
    },{ timestamps: true }
)

snippetSchema.index({ classroomId: 1, createdAt: -1 });
snippetSchema.index({ userId: 1, classroomId: 1 });

module.exports = mongoose.model("Snippet", snippetSchema)