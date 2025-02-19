import axios from "axios";
import store from "../redux/store";
import { refreshUserToken, isTokenExpired } from "../redux/slices/authSlice";

export const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const privateAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

privateAxios.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      try {
        const refreshedData = await store.dispatch(refreshUserToken()).unwrap();
        token = refreshedData.accessToken;
        localStorage.setItem("accessToken", token);
      } catch {
        console.error("Не вдалося оновити токен, вихід...");
        localStorage.removeItem("accessToken");
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message));
  }
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Неавторизований доступ. Вихід...");
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(new Error(error));
  }
);
