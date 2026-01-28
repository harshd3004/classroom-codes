import { useParams} from 'react-router-dom'

function Classroom() {
    const { id } = useParams();
  return (
    <div>Classroom : {id}</div>
  )
}

export default Classroom