import axios from "axios";
import { BACKEND_API_URL } from "../config/env";

const instance = axios.create({
  baseURL: BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
