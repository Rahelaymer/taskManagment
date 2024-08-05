import axios from "axios";

export const getAllTasks = async (token: string|null) => {
  try {
    const response = await axios.get(
      "https://task-manager-k0i9.onrender.com/api/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
