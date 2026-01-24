const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    classroomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["host", "participant"],
        required: true
    },
    lastSeenAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    }

}, { timestamps: true })

userSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
)

userSchema.index({ classroomId: 1 })

module.exports = mongoose.model("User", userSchema)