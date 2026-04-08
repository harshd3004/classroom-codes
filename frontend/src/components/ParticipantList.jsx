import { useState, useEffect } from 'react'
import { getParticipantsList } from '../api/classroomApi';
import { getUserSnippets } from '../api/snippetApi';
import { useClassroom } from '../contexts/Classroom';
import { useSocket } from '../contexts/Socket';
import ParticipantRow from './ParticipantRow';
import { SOCKET_EVENTS } from '../socket/events';

function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null)
  const [snippetsByUserId, setSnippetsByUserId] = useState({})
  const [loadingByUserId, setLoadingByUserId] = useState({})
  const [errorByUserId, setErrorByUserId] = useState({})

  const { classroomId , userId } = useClassroom()
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

  const handleParticipantClick = async (participantId) => {
    if (!classroomId) return

    const nextExpandedUserId = expandedUserId === participantId ? null : participantId
    setExpandedUserId(nextExpandedUserId)

    if (!nextExpandedUserId) return

    if (snippetsByUserId[participantId]) return

    setLoadingByUserId(prev => ({ ...prev, [participantId]: true }))
    setErrorByUserId(prev => ({ ...prev, [participantId]: '' }))

    try {
      const response = await getUserSnippets(classroomId, participantId)
      setSnippetsByUserId(prev => ({
        ...prev,
        [participantId]: response.snippets || []
      }))
    } catch (error) {
      if (error?.response?.status === 404) {
        setSnippetsByUserId(prev => ({
          ...prev,
          [participantId]: []
        }))
      } else {
        setErrorByUserId(prev => ({
          ...prev,
          [participantId]: error?.response?.data?.message || 'Failed to load snippets.'
        }))
      }
    } finally {
      setLoadingByUserId(prev => ({ ...prev, [participantId]: false }))
    }
  }

  useEffect(()=> {
    const handleUserJoined = (user) => {

    setParticipants(prev => {
      const exists = prev.find(p => p.userId === user.userId);

      if (exists) {
        return prev.map(p =>
          p.userId === user.userId
            ? { ...p, online: true }
            : p
        );
      }

      return [
        ...prev,
        {
          ...user,
          online: true,
          snippetsCount: 0
        }
      ];
    });
  };

    const handleUserLeft = ({ userId }) => {
      setParticipants( prev => prev.map(p => p.userId === userId ? {...p, online:false} : p))
    }

    const handleSnippetSubmitted = ({ user }) => {
      if (!user?.userId) return

      setParticipants(prev =>
        prev.map(participant =>
          participant.userId === user.userId
            ? { ...participant, snippetsCount: user.submissionCount }
            : participant
        )
      )
    }

    socket.on(SOCKET_EVENTS.USER_JOINED, handleUserJoined)
    socket.on(SOCKET_EVENTS.USER_LEFT, handleUserLeft)
    socket.on(SOCKET_EVENTS.SNIPPET_CREATED, handleSnippetSubmitted)

    return ()=>{
      socket.off(SOCKET_EVENTS.USER_JOINED, handleUserJoined)
      socket.off(SOCKET_EVENTS.USER_LEFT, handleUserLeft)
      socket.off(SOCKET_EVENTS.SNIPPET_CREATED, handleSnippetSubmitted)
    }
  },[socket])

  return (
    <div className="bg-white rounded-xl border border-gray-200 divide-y">
      
      <div className="px-4 py-3 text-sm font-semibold text-gray-700">
        Participants
      </div>

      <div className="divide-y">
        {participants.map((p) => (
          <div key={p.userId}>
            <ParticipantRow
              name={p.name}
              role={p.role}
              online={p.userId === userId ? true : p.online}
              snippetsCount={p.snippetsCount}
              isExpanded={expandedUserId === p.userId}
              onClick={() => handleParticipantClick(p.userId)}
            />

            {expandedUserId === p.userId && (
              <div className="bg-slate-50 border-t border-slate-200 px-4 py-3">
                {loadingByUserId[p.userId] && (
                  <div className="text-sm text-slate-500">Loading snippets...</div>
                )}

                {!loadingByUserId[p.userId] && errorByUserId[p.userId] && (
                  <div className="text-sm text-rose-600">{errorByUserId[p.userId]}</div>
                )}

                {!loadingByUserId[p.userId] && !errorByUserId[p.userId] && (
                  <div className="space-y-2">
                    {snippetsByUserId[p.userId]?.length ? (
                      snippetsByUserId[p.userId].map((snippet) => (
                        <div
                          key={snippet._id || snippet.id || `${snippet.name}-${snippet.createdAt}`}
                          className="rounded-md border border-slate-200 bg-white px-3 py-2"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-medium text-slate-900 truncate">
                              {snippet.name || 'Untitled Snippet'}
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide">
                              {snippet.language || 'txt'}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {snippet.createdAt ? new Date(snippet.createdAt).toLocaleString() : 'Unknown date'}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-slate-500">No snippets found for this user.</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default ParticipantList