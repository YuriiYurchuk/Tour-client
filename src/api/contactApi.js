import { publicAxios } from "./axiosInstance";

export const sendContactForm = async (data) => {
  try {
    const response = await publicAxios.post("/user/contact", data);
    return response.data;
  } catch (error) {
    console.error("Contact form error:", error.response?.data || error.message);
    throw error;
  }
};
