import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../context/authContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      // Small delay to ensure auth check is really complete
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  // Only render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
