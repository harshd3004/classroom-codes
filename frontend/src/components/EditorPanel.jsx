import Editor from '@monaco-editor/react'
import { useState } from 'react'

function EditorPanel() {
  const [snippetName, setSnippetName] = useState('Untitled')
  const [code, setCode] = useState('// Write your code here')
  const [language, setLanguage] = useState('javascript')

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
    console.log({ snippetName, language, code })
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
