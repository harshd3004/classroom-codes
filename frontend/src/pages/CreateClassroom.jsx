import { useState } from 'react'
import { createClassroom } from '../api/classroomApi'
import { useNavigate } from 'react-router-dom'
import { useClassroom } from '../contexts/Classroom'

function CreateClassroom() {
  const navigate = useNavigate()
  const {setClassroomData, setUserId, setHostKey, setClassroomId} = useClassroom()

  const [title, setTitle] = useState("")
  const [hostName, setHostName] = useState("")
  const [expiresInHours, setExpiresInHours] = useState(1)

  const [loading, setLoading] = useState(false)

  const [alertMessage, setAlertMessage] = useState(false)

  const submitHandler = async (e) =>{
    e.preventDefault()
    if (loading) return
    try{
      setLoading(true)
      const data = {
        title,
        hostName,
        expiresInHours
      }

      const response = await createClassroom(data)
      console.log("Classroom created:", response)

      setClassroomId(response.classroomId)
      setUserId(response.hostUserId)
      setHostKey(response.hostKey)
      setClassroomData({
        className:title,
        joinCode:response.joinCode,
        expiresAt:response.expiresAt,
        name:hostName,
        role:"host",
      })
      navigate(`/classroom/${response.classroomId}`,{replace:true})

    }catch(err){
      setAlertMessage(err.response?.data?.error || "Something went wrong")
      console.log(err);
      setTimeout(() => {
        setAlertMessage(false)
      }, 5000);
    }finally{
      setLoading(false)
      return
    }
  }

  const resetInputs = () => {
    setTitle("")
    setHostName("")
    setExpiresInHours(1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-sky-50 to-indigo-100 py-14">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-3xl mx-4 sm:mx-8 lg:mx-16 p-6 sm:p-10 lg:p-14 transition-all duration-300 hover:shadow-2xl">

        {/* Header */}
        <header className="mb-10">
          <div className="w-14 h-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full mb-4" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            Create Classroom
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Create a classroom with just a code — fast, simple, and secure.
          </p>
        </header>

        {/* Form */}
        <main className="flex justify-center">
          <form
            className="w-full max-w-lg"
            onSubmit={submitHandler}
          >

            {/* Classroom Name */}
            <div className="mb-5">
              <label
                htmlFor="classroomTitle"
                className="block text-sm font-medium tracking-wide text-slate-600 mb-2"
              >
                Class Name
              </label>
              <input
                id="classroomTitle"
                type="text"
                required
                placeholder="Enter class name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

            {/* Host Name */}
            <div className="mb-5">
              <label
                htmlFor="hostName"
                className="block text-sm font-medium tracking-wide text-slate-600 mb-2"
              >
                Host Name
              </label>
              <input
                id="hostName"
                type="text"
                required
                placeholder="Enter your name"
                value={hostName}
                onChange = {(e) => setHostName(e.target.value)}
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

            {/* Expire Time */}
            <div className="mb-8">
              <label
                htmlFor="expireInTime"
                className="block text-sm font-medium tracking-wide text-slate-600 mb-2"
              >
                Expire In (1–24 Hours)
              </label>
              <input
                id="expireInTime"
                type="number"
                min="1"
                max="24"
                placeholder="Enter duration"
                value={expiresInHours}
                onKeyDown={(e) => {
                  if (
                    e.key === 'e' ||
                    e.key === 'E' ||
                    e.key === '+' ||
                    e.key === '-' ||
                    e.key === '.'
                  ) {
                    e.preventDefault()
                  }
                }}
                onChange={(e) => {
                  const n = Number(e.target.value)
                  if (n >= 1 && n <= 24) {
                    setExpiresInHours(n)
                  }
                }}
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

            {/* Alert */}
            {alertMessage && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {alertMessage}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">

              <input
                type="reset"
                value="Clear"
                onClick={resetInputs}
                className="
                  px-8 py-3 rounded-lg
                  border border-slate-300
                  bg-white text-slate-700 font-semibold
                  shadow-sm transition
                  hover:bg-slate-50 hover:shadow
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400
                  cursor-pointer
                "
              />

              <input
                type="submit"
                value="Create Classroom"
                className="
                  px-8 py-3 rounded-lg
                  bg-linear-to-r from-blue-600 to-indigo-600
                  text-white font-semibold
                  shadow-md transition-all duration-200
                  hover:scale-[1.03] hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                  cursor-pointer
                "
                disabled={loading}
              />
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreateClassroom