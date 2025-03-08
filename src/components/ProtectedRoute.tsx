import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/ApiSetup.ts";
import { Loading } from "../pages/Loading";

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await api.get("/auth/check");
        setIsAuthenticated(true);
      } catch (error) {
        //edit to dont need server running all the time /// set to false **********************
        console.error("Not authenticated", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
