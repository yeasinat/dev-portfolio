import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/authContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // TODO add a toast notification
    // Using Navigate component for declarative routing
    return (
      <Navigate
        to="/dev-portfolio/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
