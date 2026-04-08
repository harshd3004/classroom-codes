import React, { useEffect, useState } from "react";
import { useSocket } from "../contexts/Socket";

function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState({}); // store userId -> name

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // User joined
    const handleUserJoined = (data) => {
      setUsers((prev) => ({
        ...prev,
        [data.userId]: data.name,
      }));

      setLogs((prev) => [
        ...prev,
        `🟢 ${data.name} joined the classroom`,
      ]);
    };

    // User left
    const handleUserLeft = (data) => {
      const name = users[data.userId] || "Unknown User";

      setLogs((prev) => [
        ...prev,
        `🔴 ${name} left the classroom`,
      ]);
    };

    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);

    return () => {
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);
    };
  }, [socket, users]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold mb-3 text-slate-700">
        Activity Log
      </h3>

      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-sm text-slate-400">No activity yet...</p>
        ) : (
          logs.map((log, index) => (
            <li
              key={index}
              className="px-3 py-2 text-sm rounded-md bg-slate-50 border"
            >
              {log}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ActivityLog;