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

export const getAllSubscribers = async () => {
  try {
    const response = await privateAxios.get("/subscribers/all");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all subscribers:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteSubscriber = async (email) => {
  try {
    const response = await privateAxios.delete("/subscribers/delete", {
      data: { email },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting subscriber:",
      error.response?.data || error.message
    );
    throw error;
  }
};
