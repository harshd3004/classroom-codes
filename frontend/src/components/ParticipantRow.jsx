function ParticipantRow({ name, role, online, snippetsCount, onClick, isExpanded }) {
  const isHost = role === "host";

  return (
    <div
      className={`flex items-center justify-between px-4 py-2.5 transition
        ${isHost ? "bg-yellow-50 hover:bg-yellow-100" : "hover:bg-gray-100"}
        ${onClick ? "cursor-pointer" : ""}
      `}
      onClick={onClick}
    >
      {/* Left: Status + Name + Role */}
      <div className="flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
        />

        <span className="text-sm font-medium text-gray-900">
          {name}
        </span>

        {isHost && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full
                           bg-yellow-200 text-yellow-800">
            Host
          </span>
        )}
      </div>

      {/* Right: Snippet count */}
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        {isExpanded && <span className="text-xs text-gray-500">Open</span>}
        <span>{snippetsCount}</span>
      </div>
    </div>
  );
}

export default ParticipantRow;
