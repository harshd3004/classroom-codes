import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import CreateClassroom from './pages/CreateClassroom.jsx'
import JoinClassroom from './pages/JoinClassroom.jsx'
import Classroom from './pages/Classroom.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<CreateClassroom />} />
          <Route path="/join" element={<JoinClassroom />} />
          <Route path="/classroom/:id" element={<Classroom />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
