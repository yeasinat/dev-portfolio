import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router";

import { useAuth } from "../../context/authContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // TODO add a toast notification later
      console.error("Login is required to access this page!");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
