import { useParams, useNavigate} from 'react-router-dom'
import EditorPanel from '../components/EditorPanel';
import ParticipantList from '../components/ParticipantList';
import ActivityLog from '../components/ActivityLog';
import InviteModal from '../components/InviteModal';
import { useEffect, useState } from 'react';
import { useClassroom } from '../contexts/Classroom';
import { getClassroomData } from '../api/classroomApi';

function Classroom() {
    const { id } = useParams();
    const [showInvite, setShowInvite] = useState(false);
    const { classroomId, userId, hostKey, classroomData, setClassroomId, setClassroomData } = useClassroom();

    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(320);

    const navigate = useNavigate()
    
    useEffect(() => {
      setClassroomId(id)
    },[id])

    useEffect(() => {
      if (!classroomId || !userId) return
      getClassroomData(classroomId, userId).then(data => {
        if (!data) return
        setClassroomData(data)
      }).catch(() => {
        setClassroomData(null)
        navigate("/join")
      })
    },[userId, classroomId])

    useEffect(() => {
      if(hostKey && classroomData) setShowInvite(true)
    },[hostKey, classroomData])

    useEffect(() => {
      const handleMouseMove = (e) => {
        if (!isResizing) return;

        const newWidth = window.innerWidth - e.clientX;

        // clamp width (important)
        if (newWidth < 240 || newWidth > 600) return;

        setSidebarWidth(newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isResizing]);

    
  return (
    <>
    
    {showInvite && classroomData?.role === "host" && (
        <InviteModal
          onClose={() => setShowInvite(false)}
        />
      )} 
    <div className={`flex h-screen bg-slate-100 overflow-hidden ${isResizing ? "select-none" : ""}`}>
      {/* Editor Panel */}
      <div className='flex-1 h-full bg-white'>
        <EditorPanel/>
      </div>

      <div
        onMouseDown={() => setIsResizing(true)}
        className="w-1 cursor-col-resize bg-slate-200 hover:bg-slate-300 transition"
      />

      {/* Sidebar */}
      <div style={{ width: sidebarWidth }} className='h-full bg-slate-50 border-l border-slate-200 flex flex-col'>
        {/* Participant List */}
        <div className='h-3/4 border-b border-slate-200 overflow-y-auto'>
          <ParticipantList/>
        </div>

        {/* ActivityLog / Chat */}
        <div className='flex-1 overflow-y-auto'>
          <ActivityLog/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Classroom