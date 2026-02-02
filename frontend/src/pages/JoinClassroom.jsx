import { useState } from 'react'
import { useClassroom } from '../contexts/Classroom'
import { getClassroomId, joinClassroom } from '../api/classroomApi'
import { useNavigate } from 'react-router-dom'

function JoinClassroom() {
  const [isRejoining, setIsRejoining] = useState(false)
  const [joinCode, setJoinCode] = useState('')
  const [participantName, setParticipantName] = useState('')

  const { setClassroomId, setUserId, setClassroomData } = useClassroom();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState(false)

  const submitHandler = async(e) => {
    e.preventDefault()
    if(loading) return;
    try{
      setLoading(true)
      let data = {}
      if(isRejoining){
        const response = await getClassroomId(joinCode)
        setClassroomId(response.classroomId)  
        console.log(response);
        navigate(`/classroom/${response.classroomId}`,{replace:true})
      }else{
        data = {
          joinCode,
          participantName
        }
        const response = await joinClassroom(data)
        setClassroomId(response.classroomId)
        setUserId(response.userId)
        setClassroomData({
          className:response.className,
          joinCode:response.joinCode,
          expiresAt:response.expiresAt,
          name:response.name,
          role:response.role,
        })
        navigate(`/classroom/${response.classroomId}`,{replace:true})
      }

    }catch(err){
      setAlertMessage(err.response?.data?.error || "Something went wrong")
      console.log(err);
      setTimeout(() => {
        setAlertMessage(false)
      }, 5000);
    }finally{
      setLoading(false)
    }
  }

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
          <form className="w-full max-w-lg" onSubmit={submitHandler}>
            {/* Classroom Code */}
            <div className="mb-5">
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
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
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

            {/* Is rejoining toggle button */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium tracking-wide text-slate-600">
                Rejoining this class?
              </span>

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">No</span>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    id="isRejoining"
                    type="checkbox"
                    className="peer sr-only"
                    checked={isRejoining}
                    onChange={(e) => setIsRejoining(e.target.checked)}
                  />
                  <div
                    className="
                      w-11 h-6 rounded-full
                      bg-slate-300
                      peer-checked:bg-blue-600
                      transition-colors duration-300
                    "
                  />
                  <div
                    className="
                      absolute left-1 top-1
                      w-4 h-4 rounded-full bg-white
                      transition-transform duration-300
                      peer-checked:translate-x-5
                    "
                  />
                </label>

                <span className="text-sm text-slate-600">Yes</span>
              </div>
            </div>

            {/* Participant Name */}
            {!isRejoining && (
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
                required = {!isRejoining}
                disabled = {isRejoining}
                value={participantName}
                onChange={(e)=> setParticipantName(e.target.value)}
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
              </div>
            )}

              {/* Alert */}
              {alertMessage && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {alertMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <input
                  type="submit"
                  value="Join Classroom"
                  disabled={loading}
                  className="
                    flex items-center justify-center
                    gap-3 px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:scale-[1.02] transform transition
                  "
                />

            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default JoinClassroom