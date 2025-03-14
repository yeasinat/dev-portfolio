import axios from "axios";
import { useNavigate } from "react-router";
import { VITE_API_URL } from "../config/env";

const url = VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: url.toString(),
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and response exists
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const navigate = useNavigate();

      try {
        // Attempt to refresh the access token
        const response = await axios.post(
          `${url}/auth/refresh-token`,
          {},
          {
            withCredentials: true, // Important for refresh token in cookies
          },
        );

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the Authorization header and retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("accessToken");

        // Redirect to login page when refresh token is expired
        navigate("/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
