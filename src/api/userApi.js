import { privateAxios } from "./axiosInstance";

export const getDataUser = async () => {
  try {
    const response = await privateAxios.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.error("Помилка отримання даних профілю:", error);
    throw error;
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await privateAxios.post(
      "/auth/resend-verification-email",
      { email }
    );
    return response.data;
  } catch (error) {
    console.error("Помилка при повторній відправці листа:", error);
    throw error;
  }
};
