import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/ApiSetup.ts";
import { Loading } from "../pages/Loading";

const ProtectedRoute = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await api.get("/auth/check");
        authContext.setIsAuthenticated(true);
      } catch (error) {
        //edit to dont need server running all the time /// set to false **********************
        authContext.setIsAuthenticated(false);
        console.error("Not authenticated", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [authContext]);

  if (isLoading) {
    return <Loading />;
  }

  return authContext.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
