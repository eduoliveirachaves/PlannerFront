import api from "./ApiSetup.ts";

export const createTask = async (
  title: string,
  description: string,
  dueDate: string,
) => {
  try {
    const response = await api.post(
      "/task",
      {
        title,
        description,
        type: "ONE_TIME",
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

export const getTasks = async () => {
  try {
    const response = await api.get("/task");

    return response.data;
  } catch (e) {
    console.error("ERROR WHILE REQUESTING TASKS: " + e);
  }
};

export const getOneTimeTasks = async () => {
  try {
    const response = await api.get("/task/one");

    return response.data;
  } catch (e) {
    console.error("ERROR WHILE REQUESTiNG ONE TIME TASKS" + e);
  }
};
