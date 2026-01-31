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

export const getClassroomData = async (classroomId, userId) => {
    try{
        const response = await api.get(`/classrooms/${classroomId}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting classroom data:", error);
        throw error;
    }
}