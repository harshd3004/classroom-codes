//controllers/classroom.controller.js
const Classroom = require('../models/Classroom')
const crypto = require("crypto");
const User = require("../models/User");
const { usersBySocket } = require("../sockets/socketStates")
const mongoose = require("mongoose");

const joinClassroom = async(req, res) => {
  try{
    let { joinCode, participantName, userId } = req.body;

    if (!joinCode || (!userId && !participantName)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    if (participantName) {
      participantName = participantName.trim();
      if (participantName.length > 30) {
        return res.status(400).json({ error: "Name too long" });
      }
    }

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    joinCode = joinCode.trim().toUpperCase();
    const classroom = await Classroom.findOne({ joinCode });

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    if (!classroom.isActive || classroom.expiresAt < new Date()) {
      return res.status(403).json({ error: "Classroom expired" });
    }

    let user;
    if (userId) {
      user = await User.findOne({ _id: userId, classroomId: classroom._id, role: "participant" });
    }

    if (user) {
      user.lastSeenAt = new Date();
      await user.save();
    }else{
      user = await User.create({
        classroomId: classroom._id,
        name: participantName,
        role: "participant",
        expiresAt: classroom.expiresAt
      });
    }

    res.status(200).json({
      classroomId: classroom._id,
      userId: user._id,
      role: user.role,
      expiresAt: classroom.expiresAt
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

const createClassroom = async(req, res) => {
  try {
    const { title, hostName, expiresInHours } = req.body

    if (!title || !hostName || !expiresInHours) {
      return res.status(400).json({ error: "Invalid input" });
    }

    if (expiresInHours < 1 || expiresInHours > 24) {
      return res.status(400).json({ error: "Invalid expiry duration" });
    }

    const expiresAt = new Date(
      Date.now() + expiresInHours * 60 * 60 * 1000
    );
    
    const classroom = await createClassroomDoc({ title, hostName, expiresAt })

    const hostUser = await User.create({
      classroomId: classroom._id,
      name: hostName,
      role: "host",
      expiresAt
    });

    res.status(201).json({
      classroomId: classroom._id,
      joinCode: classroom.joinCode,
      hostKey: classroom.hostKey,
      hostUserId: hostUser._id,
      expiresAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createClassroomDoc(data) {
  while (true) {
    try {
      return await Classroom.create({
        ...data,
        hostKey: generateHostKey(),
        joinCode: generateJoinCode()
      });
    } catch (err) {
      if (err.code !== 11000) throw err; // duplicate key
    }
  }
}

function generateHostKey() {
  return crypto.randomBytes(32).toString("hex");
}

function generateJoinCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

const getParticipants = async(req, res) => {
  try{

    const {classroomId} = req.params
  
    if (!classroomId || !mongoose.Types.ObjectId.isValid(classroomId)) {
      return res.status(400).json({ error: "Invalid ClassroomId" });
    }
  
    const users = await User.find({ classroomId }).select('_id name role');
  
    const participants = users.map(user => ({
      userId: user._id,
      name: user.name,
      role: user.role,
      online: usersBySocket.has(user._id.toString()),
      snippetsCount: 0 // Placeholder for future implementation
    }))
  
    res.status(200).json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
    joinClassroom,
    createClassroom
  }