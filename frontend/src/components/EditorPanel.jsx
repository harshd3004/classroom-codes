import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { useClassroom } from '../contexts/Classroom'
import { useSocket } from '../contexts/Socket'
import { SOCKET_EVENTS } from '../socket/events'

function EditorPanel({ selectedSnippet }) {
  const [snippetName, setSnippetName] = useState('Untitled')
  const [code, setCode] = useState('// Write your code here')
  const [language, setLanguage] = useState('javascript')
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('')

  const { classroomId, userId } = useClassroom()
  const socket = useSocket()

  useEffect(() => {
    if (!selectedSnippet) return

    setSnippetName(selectedSnippet.name || 'Untitled')
    setCode(selectedSnippet.code || '')
    if (selectedSnippet.language) {
      setLanguage(selectedSnippet.language)
    }
  }, [selectedSnippet])

  useEffect(() => {
    if (!socket) return

    const handleSnippetSubmitted = (snippet) => {
      if (snippet?.userId && String(snippet.userId) === String(userId)) {
        setStatusMessage(`Snippet "${snippet.name || 'Untitled'}" submitted successfully.`)
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

  // Auto-hide message
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [statusMessage])

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
      setStatusMessage('No active classroom connection.')
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

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setStatusMessage('Code copied successfully!')
      setStatusType('success')
    } catch {
      setStatusMessage('Copy failed.')
      setStatusType('error')
    }
  }

  return (
    <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b">

        {/* Left */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={snippetName}
            onChange={(e) => setSnippetName(e.target.value)}
            placeholder="Snippet name..."
            className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {languageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="px-4 py-1.5 text-sm font-medium rounded-lg 
                       bg-slate-600 text-white hover:bg-slate-700 
                       active:scale-95 transition"
          >
            Copy
          </button>

          <button
            onClick={submitSnippet}
            className="px-4 py-1.5 text-sm font-medium rounded-lg 
                       bg-blue-600 text-white hover:bg-blue-700 
                       active:scale-95 transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Status */}
      {statusMessage && (
        <div
          className={`mx-4 mt-2 px-4 py-2 text-sm rounded-lg border ${
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
      <div className="flex-1 mt-2">
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