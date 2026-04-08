import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { useClassroom } from '../contexts/Classroom'
import { useSocket } from '../contexts/Socket'
import { SOCKET_EVENTS } from '../socket/events'

function EditorPanel() {
  const [snippetName, setSnippetName] = useState('Untitled')
  const [code, setCode] = useState('// Write your code here')
  const [language, setLanguage] = useState('javascript')
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('')
  const { classroomId, userId } = useClassroom()
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return

    const handleSnippetSubmitted = (snippet) => {
      if (snippet?.userId && String(snippet.userId) === String(userId)) {
        setStatusMessage(`Snippet \"${snippet.name || 'Untitled'}\" submitted successfully.`)
        setStatusType('success')
      }
    }

    const handleSnippetError = (payload) => {
      setStatusMessage(payload?.error || 'Failed to submit snippet.')
      setStatusType('error')
    }

    socket.on(SOCKET_EVENTS.SNIPPET_CREATED, handleSnippetSubmitted)
    socket.on(SOCKET_EVENTS.SNIPPET_ERROR, handleSnippetError)

    return () => {
      socket.off(SOCKET_EVENTS.SNIPPET_CREATED, handleSnippetSubmitted)
      socket.off(SOCKET_EVENTS.SNIPPET_ERROR, handleSnippetError)
    }
  }, [socket, userId])

  const languageOptions = [
    { value: 'csharp', label: 'C#' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'java', label: 'Java' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
  ]

  const submitSnippet = () => {
    if (!socket || !classroomId) {
      setStatusMessage('Cannot submit snippet without an active classroom connection.')
      setStatusType('error')
      return
    }

    setStatusMessage('Submitting snippet...')
    setStatusType('info')

    socket.emit(SOCKET_EVENTS.SNIPPET_SUBMITTED, {
      classroomId,
      name: snippetName.trim() || 'Untitled',
      language,
      code,
    })
  }

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden border bg-white shadow-sm">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-100">
        
        {/* Left side */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={snippetName}
            onChange={(e) => setSnippetName(e.target.value)}
            className="px-3 py-1 text-lg font-semibold rounded-md border 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 rounded-md border bg-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right side */}
        <button
          onClick={submitSnippet}
          className="px-4 py-1.5 rounded-md bg-blue-600 text-white 
                     hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Submit Snippet
        </button>
      </div>

      {statusMessage && (
        <div
          className={`px-4 py-2 text-sm border-b ${
            statusType === 'success'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : statusType === 'error'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-slate-50 text-slate-700 border-slate-200'
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value ?? '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  )
}

export default EditorPanel
