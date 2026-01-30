import { createContext, useContext } from "react";

export const ClassroomContext = createContext({
    classroomId : null,
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
    setClassroomData : (classroomData) => {}
})

export const ClassroomProvider = ClassroomContext.Provider;

export const useClassroom = () => useContext(ClassroomContext); 