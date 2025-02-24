import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function login(email: string, password: string) {
  try {
    const response = await api
    .post("/auth/login", {
      email,
      password,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
    }
}

export function registerUser(name: string, email: string, password: string) {
  api
    .post("/user/register", {
      name,
      email,
      password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
    });
}
export default api;
