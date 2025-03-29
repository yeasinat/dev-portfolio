import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../api/axiosConfig";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  authChecked: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      console.log("Checking auth status...");

      const { data } = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });

      console.log("Auth status response:", data);

      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Authentication check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (userData: {
    email: string;
    password?: string;
  }): Promise<void> => {
    try {
      const { data } = await axiosInstance.post("/auth/signin", userData, {
        withCredentials: true,
      });
      setUser(data.user);
    } catch (error) {
      console.error("API error:", error);
    }
    return Promise.resolve();
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/signout");
      setUser(null);
      toast.success("Logout successful");
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        authChecked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
