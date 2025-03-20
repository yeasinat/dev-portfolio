import { createContext, ReactNode, useContext, useState } from "react";
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
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

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
      value={{ user, login, logout, isAuthenticated: !!user }}
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
