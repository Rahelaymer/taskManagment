interface FormState {
  title: string;
  end_at: string;
  time: string;
  priority: string;
  category: string;
  description: string;
}

export const AddTask = async (taskData: FormState): Promise<any> => {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
