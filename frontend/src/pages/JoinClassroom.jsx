import React from 'react'

function JoinClassroom() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-sky-50 to-indigo-100 py-14">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-3xl mx-4 sm:mx-8 lg:mx-16 p-6 sm:p-10 lg:p-14 transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <header className="mb-10">
          <div className="w-14 h-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full mb-4" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            Join Classroom
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Join a classroom quickly and easily using a simple join code.
          </p>
        </header>

        {/* Form */}
        <main className="flex justify-center">
          <form className="w-full max-w-lg">
            {/* Participant Name */}
            <div className="mb-5">
              <label
                htmlFor="participantName"
                className="block text-sm font-medium tracking-wide text-slate-600 mb-2"
              >
                Name
              </label>
              <input
                id="participantName"
                type="text"
                required
                placeholder="Enter your name"
                className="
                  w-full px-4 py-2.5 rounded-lg
                  border border-slate-300
                  transition duration-200
                  hover:border-slate-400
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  invalid:border-red-400
                "
              />

              {/* Classroom Code */}
              <div className="mt-5">
                <label
                  htmlFor="joinCode"
                  className="block text-sm font-medium tracking-wide text-slate-600 mb-2"
                >
                  Classroom Join-Code
                </label>
                <input
                  id="joinCode"
                  type="text"
                  required
                  placeholder="Enter classroom code"
                  className="
                    w-full px-4 py-2.5 rounded-lg
                    border border-slate-300
                    transition duration-200
                    hover:border-slate-400
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    invalid:border-red-400
                  "
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <input
                  type="submit"
                  value="Join Classroom"
                  className="
                    flex items-center justify-center
                    gap-3 px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:scale-[1.02] transform transition
                  "
                />
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default JoinClassroom