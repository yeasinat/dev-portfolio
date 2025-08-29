import axios from "../config/axiosConfig";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  email?: string;
}

export const signin = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post("/auth/signin", data);
    console.log(response.data);

    if (response.data.token) {
      return response.data;
    } else {
      return {
        success: false,
        message: "Authentication failed: No token received",
      };
    }
  } catch (error) {
    console.error("API error:", error);

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
