import { useState, useEffect } from 'react'
import { getParticipantsList } from '../api/classroomApi';
import { useClassroom } from '../contexts/Classroom';
import { useSocket } from '../contexts/Socket';
import ParticipantRow from './ParticipantRow';
import { SOCKET_EVENTS } from '../socket/events';

function ParticipantList() {
  const [participants, setParticipants] = useState([]);

  const { classroomId } = useClassroom()
  const socket = useSocket()

  useEffect(()=> {
    const fetchParticipants = async () => {
      try{
        const response = await getParticipantsList(classroomId);
        setParticipants(response)
      }catch (error) {
        console.error("Error getting participants list:", error);
      }
    }
    
    if(classroomId) fetchParticipants()
  },[classroomId])

  useEffect(()=> {
    const handleUserJoined = (user) => {
      setParticipants( prev => {
        if(prev.some(p => p.userId === user.userId)) return prev;
        return [...prev, {
          ...user,
          online:true,
          snippetsCount:0
        }]
      })
    }

    socket.on(SOCKET_EVENTS.USER_JOINED, handleUserJoined)

    return ()=>{
      socket.off(SOCKET_EVENTS.USER_JOINED, handleUserJoined)
    }
  },[socket])

  return (
    <div className="bg-white rounded-xl border border-gray-200 divide-y">
      
      <div className="px-4 py-3 text-sm font-semibold text-gray-700">
        Participants
      </div>

      <div className="divide-y">
        {participants.map((p) => (
          <ParticipantRow
            key={p.userId}
            name={p.name}
            role={p.role}
            online={p.online}
            snippetsCount={p.snippetsCount}
          />
        ))}
      </div>
    </div>
    
  )
}

export default ParticipantList