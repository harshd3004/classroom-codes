import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-50 via-white to-slate-50 py-14">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-14 max-w-3xl w-full mx-16">
        <header className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">CC</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Classroom Codes</h1>
              <p className="text-sm text-slate-500 mt-1">Create or join classrooms with just a code — fast and simple.</p>
            </div>
          </div>
          <div className="text-sm text-slate-400">No account required to create/join a classroom.</div>
        </header>

        <main className="flex flex-col sm:flex-row items-center sm:items-center justify-center gap-4 mt-12">
          <Link
            to="/create"
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:scale-[1.02] transform transition"
            aria-label="Create Classroom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Classroom</span>
          </Link>

          <Link
            to="/join"
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition"
            aria-label="Join Classroom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 0 1 2 2v4M10 14l5-5m0 0l-5-5m5 5H3" />
            </svg>
            <span>Join Classroom</span>
          </Link>
        </main>

        <p className="mt-6 text-sm text-slate-400 text-center">Teachers can create classrooms and share a short join code with students.</p>
      </div>
    </div>
  )
}

export default Landing