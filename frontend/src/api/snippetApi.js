import api from "./apiClient";

export const getUserSnippets = async (classroomId, userId) => {
	try {
		const response = await api.get(`/classrooms/${classroomId}/users/${userId}/snippets`);
		return response.data;
	} catch (error) {
		console.error("Error getting user snippets:", error);
		throw error;
	}
}
