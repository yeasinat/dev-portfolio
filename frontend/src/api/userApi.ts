import axiosInstance from "../config/axiosConfig";

import { VITE_API_URL } from "../config/env";

export const fetchUser = async () => {
  try {
    const { data } = await axiosInstance.get(`${VITE_API_URL}/users`);
    return data?.user;
  } catch (error) {
    console.error("fetchUser error:", error);
    return null;
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.patch(
      `${VITE_API_URL}/users`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  } catch (error) {
    console.error("updateUser error:", error);
    return null;
  }
};
