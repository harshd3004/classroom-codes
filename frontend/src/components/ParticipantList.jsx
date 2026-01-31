import { useState, useEffect } from 'react'
import { getParticipantsList } from '../api/classroomApi';
import { useClassroom } from '../contexts/Classroom';
import ParticipantRow from './ParticipantRow';

function ParticipantList() {
  const [participants, setParticipants] = useState([]);

  const { classroomId } = useClassroom()

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