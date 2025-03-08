import api from "./ApiSetup.ts";

export const createTask = async (
  title: string,
  description: string,
  dueDate: string,
) => {
  try {
    const response = await api.post(
      "/task/create",
      {
        title,
        description,
        dueDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error("ERROR CREATING TASK API TASK REQUESTS : " + error);
    throw error;
  }
};
