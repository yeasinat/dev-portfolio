import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../context/authContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, authChecked, user } = useAuth();

  if (isLoading || !authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Only render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
