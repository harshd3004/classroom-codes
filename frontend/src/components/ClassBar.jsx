import { Users, LogOut, Power } from "lucide-react"

function ClassBar({
    title,
    isHost,
    sidebarVisible,
    onToggleSidebar,
    onLeaveClass,
    onEndClass
}) {

  return (
    <div className="h-14 px-4 flex items-center justify-between
                    bg-white border-b border-slate-200 shadow-sm">

      {/* Left: Class title */}
      <div className="text-lg font-semibold text-slate-800 truncate">
        {title || "Untitled Classroom"}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">

        {/* Toggle Participants */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-slate-100 transition"
          title={sidebarVisible ? "Hide participants" : "Show participants"}
        >
          <Users size={20} />
        </button>

        {/* Leave Class */}
        <button
          onClick={onLeaveClass}
          className="flex items-center gap-1 px-3 py-1.5
                     rounded-md text-sm bg-slate-200 hover:bg-slate-300 transition"
        >
          <LogOut size={16} />
          Leave
        </button>

        {/* End Class (host only) */}
        {isHost && (
          <button
            onClick={onEndClass}
            className="flex items-center gap-1 px-3 py-1.5
                       rounded-md text-sm bg-red-600 text-white
                       hover:bg-red-700 transition"
          >
            <Power size={16} />
            End
          </button>
        )}
      </div>
    </div>
  )
}

export default ClassBar;