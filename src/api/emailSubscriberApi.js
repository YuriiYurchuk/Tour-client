import { publicAxios, privateAxios } from "./axiosInstance";

export const sendEmailSubscriber = async (data) => {
  try {
    const response = await publicAxios.post("/subscribers/add", data);
    return response.data;
  } catch (error) {
    console.error("Contact form error:", error.response?.data || error.message);
    throw error;
  }
};

export const subscribeUser = async (userId) => {
  try {
    const response = await privateAxios.post("/subscribers/subscribe", {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Subscribe error:", error.response?.data || error.message);
    throw error;
  }
};

export const unsubscribeUser = async (userId) => {
  try {
    const response = await privateAxios.post("/subscribers/unsubscribe", {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Unsubscribe error:", error.response?.data || error.message);
    throw error;
  }
};
