import axiosInstance from "./axiosConfig";
import { VITE_API_URL } from "../config/env";
import { ProjectProps } from "../types/types";

export const fetchProjects = async () => {
  const { data } = await axiosInstance.get(
    `${VITE_API_URL}/portfolio/projects/`,
  );
  return data;
};

export const createProject = async (formData: ProjectProps) => {
  const { data } = await axiosInstance.post(
    `${VITE_API_URL}/portfolio/projects/`,
    formData,
  );
  return data;
};

export const fetchProjectById = async (id: string) => {
  const { data } = await axiosInstance.get(
    `${VITE_API_URL}/portfolio/projects/${id}`,
  );
  return data;
};

export const updateProject = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await axiosInstance.put(
    `${VITE_API_URL}/portfolio/projects/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
//  console.log("API response:", data);
  return data;
};

export const deleteProject = async (id: string) => {
  await axiosInstance.delete(`${VITE_API_URL}/portfolio/projects/${id}`);
  return true;
};
