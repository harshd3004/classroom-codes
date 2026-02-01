const express = require("express")
const router = express.Router()

const classroomController = require("../controllers/classroom.controller.js")

router.post("/", classroomController.createClassroom)
router.post("/join", classroomController.joinClassroom)
router.post("/resolve", classroomController.resolveClassroom)

router.get("/:classroomId/participants", classroomController.getParticipants)
router.get("/:classroomId/:userId", classroomController.getClassroom)

module.exports = router