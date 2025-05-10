import { publicAxios, privateAxios } from "./axiosInstance";

export const sendContactForm = async (data) => {
  try {
    const response = await publicAxios.post("/user/contact", data);
    return response.data;
  } catch (error) {
    console.error("Contact form error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllContactForms = async () => {
  try {
    const response = await privateAxios.get("/user/contacts");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні контактних форм:", error);
    throw error;
  }
};

export const deleteContactForm = async (id) => {
  try {
    const response = await privateAxios.delete(`/user/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні контактної форми:", error);
    throw error;
  }
};
