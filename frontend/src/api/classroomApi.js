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