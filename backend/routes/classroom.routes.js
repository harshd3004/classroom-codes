const express = require("express")
const router = express.Router()

const classroomController = require("../controllers/classroom.controller.js")

router.get("/", classroomController.getHostedClassrooms)
router.post("/", classroomController.createClassroom)

module.exports = router