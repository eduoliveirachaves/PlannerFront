import api from "./ApiSetup.ts";

interface User {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile");

    const user: User = response.data.data;

    return user;
  } catch (error) {
    console.error("ERROR GETTING PROFILE: " + error);
  }
};
