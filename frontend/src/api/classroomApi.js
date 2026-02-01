import api from "./apiClient";

export const createClassroom = async (data) => {
    try{

        const response = await api.post("/classrooms", data);
        return response.data;
    } catch (error) {
        console.error("Error creating classroom:", error);
        throw error;
    }
}

export const joinClassroom = async (data) => {
    try{
        const response = await api.post("/classrooms/join", data);
        return response.data;
    } catch (error) {
        console.error("Error joining classroom:", error);
        throw error;
    }
}

export const getClassroomData = async (classroomId, userId) => {
    try{
        const response = await api.get(`/classrooms/${classroomId}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting classroom data:", error);
        throw error;
    }
}

export const getParticipantsList = async (classroomId) => {
    try{
        const response = await api.get(`/classrooms/${classroomId}/participants`);
        return response.data;
    }catch (error) {
        console.error("Error getting participants list:", error);
        throw error;
    }
}

export const getClassroomId = async (joinCode) => {
    try{
        const response = await api.post("classrooms/resolve", {joinCode});
        return response.data;
    }catch (error) {
        console.error("Error getting classroom id:", error);
        throw error;
    }
}