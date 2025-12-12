import axios from "axios";

// Base URL can be configured via Vite env var `VITE_API_BASE`.
const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export const client = axios.create({
  baseURL,
  timeout: 5000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;