import axiosInstance from "../config/axiosConfig";
import { VITE_API_URL } from "../config/env";
import { TechnologyProps } from "../types/types";

const url = `${VITE_API_URL}/portfolio/tech`;

export const fetchTechs = async () => {
  const { data } = await axiosInstance.get(url);
  return data;
};

export const createTech = async (formData: TechnologyProps) => {
  const { data } = await axiosInstance.post(url, formData);
  return data;
};

export const fetchTechById = async (id: string) => {
  const { data } = await axiosInstance.get(`${url}/${id}`);
  return data;
};

export const updateTech = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await axiosInstance.put(`${url}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteTech = async (id: string) => {
  await axiosInstance.delete(`${url}/${id}`);
  return true;
};
