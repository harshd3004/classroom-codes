import { useState } from "react";
import { Users, LogOut, Power } from "lucide-react";
import { useClassroom } from '../contexts/Classroom';
import { useSocket } from '../contexts/Socket';
import { useNavigate } from 'react-router-dom';
import { SOCKET_EVENTS } from "../socket/events";

function ClassBar({
  title,
  isHost,
  sidebarVisible,
  onToggleSidebar
}) {

  const { classroomId, userId, clearClassroomContext } = useClassroom();
  const socket = useSocket();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(null); // "leave" | "end"

  // Confirm action
  const handleConfirm = () => {
    if (confirmType === "leave") {
      clearClassroomContext();
      socket.disconnect();
      navigate("/join");
    }

    if (confirmType === "end") {
      socket.emit(SOCKET_EVENTS.END_CLASS, { classroomId, userId });
      clearClassroomContext();
      socket.disconnect();
      navigate("/join");
    }
  };

  // Open Leave modal
  const handleLeaveClass = () => {
    setConfirmType("leave");
    setShowConfirm(true);
  };

  // Open End modal
  const handleEndClass = () => {
    setConfirmType("end");
    setShowConfirm(true);
  };

  return (
    <>
      {/* Top Bar */}
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
            onClick={handleLeaveClass}
            className="flex items-center gap-1 px-3 py-1.5
                       rounded-md text-sm bg-slate-200 hover:bg-slate-300 transition"
          >
            <LogOut size={16} />
            Leave
          </button>

          {/* End Class (host only) */}
          {isHost && (
            <button
              onClick={handleEndClass}
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

      {/* 🔥 Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center
                        bg-white/60 backdrop-blur-sm z-50">

          <div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center">

            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Are you sure?
            </h2>

            <p className="text-base text-slate-600 mb-6">
              {confirmType === "leave"
                ? "Sure!! You really want to leave??"
                : "This will end the class for everyone. Continue?"}
            </p>

            <div className="flex justify-center gap-6">

              {/* YES */}
              <button
                onClick={handleConfirm}
                className="px-5 py-2 rounded-md bg-red-600 text-white
                           hover:bg-red-700 transition"
              >
                Yes
              </button>

              {/* NO */}
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-md bg-slate-200
                           hover:bg-slate-300 transition"
              >
                No
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClassBar;