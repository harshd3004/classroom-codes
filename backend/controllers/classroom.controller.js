//controllers/classroom.controller.js
const Classroom = require('../models/Classroom')
const crypto = require("crypto");
const User = require("../models/User");
const { usersBySocket } = require("../sockets/socketStates")
const mongoose = require("mongoose");
const { join } = require('path');

const joinClassroom = async(req, res, next) => {
  try{
    let { joinCode, participantName, userId } = req.body;

    if (!joinCode || (!userId && !participantName)) {
      res.status(400);
      throw new Error("Invalid input");
    }

    if (participantName) {
      participantName = participantName.trim();
      if (participantName.length > 30) {
        res.status(400);
        throw new Error("Participant name too long");
      }
    }

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      throw new Error("Invalid UserId");
    }

    joinCode = joinCode.trim().toUpperCase();
    const classroom = await Classroom.findOne({ joinCode });

    if (!classroom) {
      res.status(404);
      throw new Error("Classroom not found");
    }

    if (!classroom.isActive || classroom.expiresAt < new Date()) {
      res.status(403);
      throw new Error("Classroom is inactive or expired");
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
    next(err);
  }
}

const getClassroom = async(req, res, next) => {
  try {
    const { classroomId, userId } = req.params;
    
    if (!classroomId || !mongoose.Types.ObjectId.isValid(classroomId)) {
      res.status(400);
      throw new Error("Invalid ClassroomId");
    }

    if (!userId && !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      throw new Error("Invalid UserId");
    }

    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      res.status(404);
      throw new Error("Classroom not found");
    }

    if (!classroom.isActive || classroom.expiresAt < new Date()) {
      res.status(403);
      throw new Error("Classroom is inactive or expired");
    }
    const user = await User.findOne({ classroomId, _id: userId });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      classroomName: classroom.title,
      joinCode: classroom.joinCode,
      name: user.name,
      role: user.role,
      expiresAt: classroom.expiresAt
    });
  }catch(err){
    next(err)
  }
}

const createClassroom = async(req, res, next) => {
  try {
    const { title, hostName, expiresInHours } = req.body

    if (!title || !hostName || !expiresInHours) {
      res.status(400);
      throw new Error("Invalid input");
    }

    if (expiresInHours < 1 || expiresInHours > 24) {
      res.status(400);
      throw new Error("Invalid expiry duration");
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
    next(err);
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

const getParticipants = async(req, res, next) => {
  try{

    const {classroomId} = req.params
  
    if (!classroomId || !mongoose.Types.ObjectId.isValid(classroomId)) {
      res.status(400);
      throw new Error("Invalid ClassroomId");
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
    next(err);
  }
}

module.exports = {
    joinClassroom,
    createClassroom,
    getClassroom,
    getParticipants
  }