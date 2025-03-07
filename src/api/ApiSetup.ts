import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // Enables cookies in requests
});

// Automatically handle 401 (Unauthorized) errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // If 403, remove auth state (logout the user)
      localStorage.removeItem("isAuthenticated"); // i have not implemented localStorage // this is doing nothing
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  },
);

export default api;
