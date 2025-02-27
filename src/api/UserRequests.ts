import api from "./ApiSetup.ts";

export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile");

    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
