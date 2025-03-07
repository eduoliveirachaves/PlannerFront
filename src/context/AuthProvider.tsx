import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  login as loginService,
  logout as logoutService,
} from "../api/AuthService.ts";
import { getProfile } from "@/api/UserRequests.ts";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userReq = await getProfile();

        if (userReq) {
          setUser(userReq);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        console.error(err);
      }
    };

    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginService(email, password);
      const userReq = await getProfile();

      if (userReq) {
        setUser(userReq);
      }
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await logoutService();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
