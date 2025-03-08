import api from "./ApiSetup.ts";

export async function login(email: string, password: string) {
  return await api.post(
    "/auth/login",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensure credentials are included
    },
  );
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  return await api.post(
    "/user/register",
    {
      name,
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );
}

export async function check() {
  try {
    await api.get("/auth/check", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("CHECK FAILED USER IS NOT AUTH : " + error);
    throw error;
  }
}

export async function logout() {
  await api.post("/auth/logout", {
    withCredentials: true,
  });
}
