import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";
import axios from "axios";

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
      const { data } = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });


      if (data && data.user) {
        setUser(data.user);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Auth check failed:",
          error.response?.data || error.message,
        );
      } else {
        console.error("Unexpected error:", error);
      }
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (userData: { email: string; password?: string }) => {
    const { data } = await axiosInstance.post("/auth/signin", userData, {
      withCredentials: true,
    });

    if (data.success !== true) {
      throw new Error(data.message || "Invalid credentials");
    }

    setUser(data?.user);
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
