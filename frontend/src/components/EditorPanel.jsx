import Editor from '@monaco-editor/react';

function EditorPanel() {
  return (
    <div className='h-full flex flex-col mx-1'>
      {/* Topbar */}
      <div className="h-12 border-b flex items-center px-4 bg-slate-50 ">
        <span>Editor</span>
      </div>

      {/* Editor */}
      <div className='flex-1 border'>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="console.log('Hello world!')"
        />
      </div>
    </div>
  )
}

export default EditorPanel