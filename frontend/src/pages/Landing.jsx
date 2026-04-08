import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-sky-50 via-white to-slate-50 
      animate-fadeIn py-14">

      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl 
        p-14 max-w-3xl w-full mx-6 
        animate-slideUp border border-slate-200">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">

          {/* Logo + Title */}
          <div className="flex items-center gap-4">

            {/* Animated Logo */}
            <div className="w-16 h-16 rounded-xl 
              bg-gradient-to-br from-blue-600 to-indigo-600 
              flex items-center justify-center text-white text-2xl font-bold
              animate-bounceSlow shadow-lg">
              CC
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight animate-fadeIn">
                Classroom Codes
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Create or join classrooms with just a code — fast and simple.
              </p>
            </div>
          </div>

          <div className="text-sm text-slate-400 text-center sm:text-right">
            No account required to create/join a classroom.
          </div>
        </header>

        {/* Buttons */}
        <main className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">

          {/* Create Button */}
          <Link
            to="/create"
            className="group flex items-center justify-center gap-3 px-7 py-3 rounded-xl 
              bg-gradient-to-r from-blue-600 to-indigo-600 
              text-white font-semibold shadow-lg
              hover:shadow-blue-300/50 hover:scale-105 
              transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Classroom
          </Link>

          {/* Join Button */}
          <Link
            to="/join"
            className="group flex items-center justify-center gap-3 px-7 py-3 rounded-xl 
              border border-slate-200 bg-white text-slate-700 font-semibold 
              shadow-md hover:bg-slate-50 hover:scale-105 
              transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-600 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 0 1 2 2v4M10 14l5-5m0 0l-5-5m5 5H3" />
            </svg>
            Join Classroom
          </Link>
        </main>

        {/* Footer */}
        <p className="mt-8 text-sm text-slate-400 text-center animate-fadeIn delay-200">
          Teachers can create classrooms and share a short join code with students.
        </p>
      </div>
    </div>
  )
}

export default Landing