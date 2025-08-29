import axios from "axios";
import { VITE_API_URL } from "./env";

const url = VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: url.toString(),
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
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

      try {
        // Attempt to refresh the access token
        await axios.post(
          `${url}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        console.error("Refresh token failed:", refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
