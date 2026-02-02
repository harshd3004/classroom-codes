import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import CreateClassroom from './pages/CreateClassroom.jsx'
import JoinClassroom from './pages/JoinClassroom.jsx'
import Classroom from './pages/Classroom.jsx'
import { ClassroomProvider } from './contexts/Classroom.js'
import { SocketProvider } from './contexts/Socket.jsx'

function App() {

  //classroom context states & methods-----------------------
  const [classroomId, setClassroomId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [hostKey, setHostKey] = useState(null)
  const [classroomData, setClassroomData] = useState(null)
  //---------------------------------------------------------

  //data persistence-localstorage
  //writing data to local storage
  useEffect(()=>{
    if (!classroomId || !userId || !classroomData?.expiresAt) return

  saveClassroomToStorage({
    classroomId,
    userId,
    expiresAt: classroomData.expiresAt,
    hostKey
  })
  },[classroomId, userId, hostKey])

  //loading data from local storage
  useEffect(() => {
    const classroom = getClassroomFromStorage(classroomId)
    if (!classroom) return
    setUserId(classroom.userId)
    setHostKey(classroom.hostKey ?? null)
  },[classroomId])

  //helper functions---------------------------------
  const getClassroomFromStorage = (classroomId) => {
  try {
    const data = JSON.parse(localStorage.getItem("classrooms") || "{}")
    return data[classroomId] || null
  } catch {
    return null
  }
}

const saveClassroomToStorage = ({
  classroomId,
  userId,
  expiresAt,
  hostKey
}) => {
  try {
    const raw = localStorage.getItem("classrooms")
    const classrooms = raw ? JSON.parse(raw) : {}
    const now = Date.now()

    const cleaned = Object.fromEntries(
      Object.entries(classrooms).filter(
        ([, v]) => v.expiresAt >= now
      )
    )

    cleaned[classroomId] = {
      userId,
      expiresAt,
      ...(hostKey && { hostKey })
    }

    localStorage.setItem("classrooms", JSON.stringify(cleaned))
  } catch {}
}


  return (
    <ClassroomProvider value={{classroomId, userId, hostKey, classroomData, setClassroomId, setUserId, setHostKey, setClassroomData}}>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<CreateClassroom />} />
            <Route path="/join" element={<JoinClassroom />} />
            <Route path="/classroom/:id" element={<Classroom />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </ClassroomProvider>
  )
}

export default App
