import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL as string;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "No se pudo completar la solicitud";

    return Promise.reject(new Error(message));
  },
);
