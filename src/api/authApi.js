import { privateAxios, publicAxios } from "./axiosInstance";

export const register = async (data) => {
  try {
    const response = await publicAxios.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await publicAxios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await privateAxios.post("/auth/refresh-token");
    return response.data;
  } catch (error) {
    console.error(
      "Refresh token error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const logout = async () => {
  try {
    await privateAxios.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};
