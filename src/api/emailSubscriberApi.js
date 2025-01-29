import { publicAxios } from "./axiosInstance";

export const sendEmailSubscriber = async (data) => {
  try {
    const response = await publicAxios.post("/subscribers/add", data);
    return response.data;
  } catch (error) {
    console.error("Contact form error:", error.response?.data || error.message);
    throw error;
  }
};
