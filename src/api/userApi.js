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
      "/email/resend-verification-email",
      { email }
    );
    return response.data;
  } catch (error) {
    console.error("Помилка при повторній відправці листа:", error);
    throw error;
  }
};

export const updateUserProfile = async (data, avatar) => {
  try {
    const formData = new FormData();
    if (data.first_name) formData.append("first_name", data.first_name);
    if (data.last_name) formData.append("last_name", data.last_name);
    if (data.email) formData.append("email", data.email);
    if (avatar) formData.append("avatar", avatar);
    if (data.current_password)
      formData.append("current_password", data.current_password);
    if (data.new_password) formData.append("new_password", data.new_password);

    console.log("FormData перед відправкою:", formData);

    const response = await privateAxios.put("/user/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка оновлення профілю:", error);
    throw error;
  }
};
