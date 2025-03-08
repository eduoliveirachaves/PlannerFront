import { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {
  login as loginService,
  logout as logoutService,
} from "../api/AuthService.ts";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (email: string, password: string) => {
    try {
      await loginService(email, password);
    } catch (error) {
      console.error("LOGIN AUTH PROVIDER : " + error);
      throw error;
    }
  };

  const logout = async () => {
    await logoutService();
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
