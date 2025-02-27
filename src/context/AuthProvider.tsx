import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {login as loginService, logout as logoutService} from "../api/AuthService.ts"

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      await loginService(email, password)
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await logoutService();
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
