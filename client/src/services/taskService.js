const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

class TaskService {
  async getAllTasks() {
    console.log(`Attempting to fetch from: ${API_BASE_URL}/tasks`);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      console.log(`Response status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Successfully fetched tasks:', data);
      return data;
    } catch (error) {
      console.error('Fetch error in taskService:', error);
      throw error;
    }
  }

  async createTask(taskData) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  }

  async deleteTask(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  }
}

export const taskService = new TaskService();
