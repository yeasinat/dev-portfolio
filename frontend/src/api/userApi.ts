import axiosInstance from "../config/axiosConfig";

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

export const updateUser = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `${VITE_API_URL}/users/${id}`,
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
