import { useParams} from 'react-router-dom'
import EditorPanel from '../components/EditorPanel';
import ParticipantList from '../components/ParticipantList';
import ActivityLog from '../components/ActivityLog';

function Classroom() {
    const { id } = useParams();
  return (
    <div className='flex h-screen bg-slate-100 overflow-hidden'>
      {/* Editor Panel */}
      <div className='w-3/4 h-full bg-white'>
        <EditorPanel/>
      </div>
      
      {/* Sidebar */}
      <div className='h-full bg-slate-50 border-l border-slate-200 flex flex-col w-1/4'>
        {/* Participant List */}
        <div className='h-3/4 border-b border-slate-200 overflow-y-auto'>
          <ParticipantList/>
        </div>

        {/* ActivityLog / Chat */}
        <div className='h-1/2 overflow-y-auto'>
          <ActivityLog/>
        </div>
      </div>
    </div>
  )
}

export default Classroom