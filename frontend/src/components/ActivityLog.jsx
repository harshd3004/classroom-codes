import React, { useEffect, useState } from "react";
import { useSocket } from "../contexts/Socket";

function ActivityLog() {
  const [logs, setLogs] = useState([]);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // When user joins
    socket.on("user_joined", (data) => {
      setLogs((prev) => [
        ...prev,
        `${data.name} joined the classroom`
      ]);
    });

    // When user leaves
    socket.on("user_left", (data) => {
      setLogs((prev) => [
        ...prev,
        `User ${data.name} left the classroom`
      ]);
    });

    // Cleanup
    return () => {
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, [socket]);

  return (
    <div style={{ padding: "10px" }}>
      <h3>Activity Log</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityLog;