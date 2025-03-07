import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: async () => {},
  logout: async () => {},
  user: null,
};

interface User {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
