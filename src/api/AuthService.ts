import api from "./ApiSetup.ts";

export async function login(email: string, password: string) {
  try {
    const response = await api.post(
      "/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure credentials are included
      },
    );

    console.log(response.data);

    
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  try {
    const response = await api.post(
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

    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function test() {
  try {
    const response = await api.get("/auth/check", {
      withCredentials: true,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout() {
  await api.post("/auth/logout", {
    withCredentials: true
  })
}
