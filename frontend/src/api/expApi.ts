import axiosInstance from "../config/axiosConfig";

import { VITE_API_URL } from "../config/env";
import { ExperienceProps } from "../types/types";

const url = `${VITE_API_URL}/portfolio/experiences`;

export const fetchExperiences = async () => {
  const { data } = await axiosInstance.get(url);
  return data;
};

export const createExperience = async (formData: ExperienceProps) => {
  const { data } = await axiosInstance.post(url, formData);
  return data;
};

export const fetchExperienceById = async (id: string) => {
  const { data } = await axiosInstance.get(`${url}/${id}`);
  return data;
};

export const updateExperience = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await axiosInstance.put(`${url}/${id}`, formData);
  return data;
};

export const deleteExperience = async (id: string) => {
  await axiosInstance.delete(`${url}/${id}`);
  return true;
};
