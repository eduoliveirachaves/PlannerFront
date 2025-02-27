import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/ApiSetup";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      await api.post("/auth/login", { email, password });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
