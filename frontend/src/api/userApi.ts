import axiosInstance from "./axiosConfig";

import { VITE_API_URL } from "../config/env";

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get(`${VITE_API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("fetchUser error:", error);
    return null;
  }
};
