module.exports = {
  usersBySocket: new Map(),   // socketId -> { userId, classroomId, role }
  socketsByUser: new Map()    // userId -> socketId
}