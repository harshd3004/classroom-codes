import { createContext, useContext, useEffect } from "react"
import { socket } from "../socket/socket"
import { useClassroom } from "./Classroom";
import { SOCKET_EVENTS } from "../socket/events";

const socketContext = createContext(null)

export const SocketProvider = ({children}) => {

    const { classroomId, userId } = useClassroom();

    useEffect(() => {
        if (!classroomId || !userId) return;
        if (!socket.connected) {
            socket.connect();
        }        
        socket.on("connect", () => {
            console.log("socket connected");
        })
        socket.emit(SOCKET_EVENTS.JOIN_CLASSROOM, { classroomId, userId })

        socket.on(SOCKET_EVENTS.USER_JOINED, (user) => {
            console.log("User Joined : ",user);
        })

        return () => {        
            socket.off(SOCKET_EVENTS.USER_JOINED)
        }
    }, [classroomId, userId])

    useEffect(() => {        
        return () => {
            socket.off("connect")
            socket.disconnect();
        }
    },[])

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}

export const useSocket = () => useContext(socketContext);