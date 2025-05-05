import { privateAxios } from "./axiosInstance";

export const fetchAllUsers = async () => {
  try {
    const response = await privateAxios.get("/user/all");
    return response.data.users;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Не вдалося отримати список користувачів.",
      }
    );
  }
};

export const changeUserRole = async ({ userId, newRole }) => {
  try {
    const response = await privateAxios.put("/user/role", {
      userId,
      newRole,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Не вдалося змінити роль користувача.",
      }
    );
  }
};
