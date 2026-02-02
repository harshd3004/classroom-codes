import { createContext, useContext, useEffect } from "react"
import { socket } from "../socket/socket"
import { useClassroom } from "./Classroom";
import { SOCKET_EVENTS } from "../socket/events";

const socketContext = createContext(null)

export const SocketProvider = ({children}) => {

    const { classroomId, userId } = useClassroom();

    useEffect(() => {
        return () => {
            socket.disconnect()
        }
    },[])

    useEffect(() => {
        if (!classroomId || !userId) return;
        socket.connect()
        socket.emit(SOCKET_EVENTS.JOIN_CLASSROOM, { classroomId, userId })

        socket.on(SOCKET_EVENTS.USER_JOINED, (user) => {
            console.log("User Joined : ",user);
        })

        return () => {
            socket.off(SOCKET_EVENTS.USER_JOINED)
            socket.disconnect()
        }
    }, [classroomId, userId])

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}

export const useSocket = () => useContext(socketContext);