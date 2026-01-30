import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import CreateClassroom from './pages/CreateClassroom.jsx'
import JoinClassroom from './pages/JoinClassroom.jsx'
import Classroom from './pages/Classroom.jsx'
import { ClassroomProvider } from './contexts/Classroom.js'

function App() {

  const [classroomId, setClassroomId] = useState(null)
  const [classroomData, setClassroomData] = useState(null)

  //data persistence-localstorage
  //writing data to local storage
  useEffect(()=>{
    if(!classroomId) return
    let classrooms = JSON.parse(localStorage.getItem("classrooms")) || {}
    classrooms[classroomId] = {
      userId:classroomData.userId, 
      expiresAt:classroomData.expiresAt 
    }
    if(classroomData.hostKey){
      classrooms[classroomId].hostKey = classroomData.hostKey
    }
    Object.keys(classrooms).forEach((key) => {
      if(classrooms[key].expiresAt < Date.now()){
        delete classrooms[key]
      }
    })
    localStorage.setItem("classrooms", JSON.stringify(classrooms))
  },[classroomId, classroomData])

  //loading data from local storage
  useEffect(() => {
    let classrooms = JSON.parse(localStorage.getItem("classrooms")) || {}
    if(classrooms[classroomId]){
      setClassroomData(classrooms[classroomId])
    }
  },[classroomId])

  return (
    <ClassroomProvider value={{classroomId, classroomData, setClassroomId, setClassroomData}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<CreateClassroom />} />
          <Route path="/join" element={<JoinClassroom />} />
          <Route path="/classroom/:id" element={<Classroom />} />
        </Routes>
      </BrowserRouter>
    </ClassroomProvider>
  )
}

export default App
