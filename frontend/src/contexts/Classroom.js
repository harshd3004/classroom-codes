import { createContext, useContext } from "react";

export const ClassroomContext = createContext({
    classroomId : null,
    userId : null,
    hostKey : null,
    classroomData : null,
    // {
    //     classroomId:"",
    //     className:"",
    //     joinCode:"",
    //     expiresAt:"",
    //     userId:"",
    //     name:"",
    //     role:"host" | "participant",
    //     hostKey:"" //only for hosts
    // }
    setClassroomId : (classroomId) => {},
    setClassroomData : (classroomData) => {},
    setUserId : (userId) => {},
    setHostKey : (hostKey) => {}
})

export const ClassroomProvider = ClassroomContext.Provider;

export const useClassroom = () => useContext(ClassroomContext); 