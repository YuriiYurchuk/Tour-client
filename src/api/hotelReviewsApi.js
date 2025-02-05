import { publicAxios, privateAxios } from "./axiosInstance";

export const getHotelReviews = async ({ page = 1, limit = 9 }) => {
  try {
    const response = await publicAxios.get("/hotel/reviews-hotel", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні відгуків:", error);
    throw error;
  }
};

export const sendHotelReviews = async (reviewData) => {
  try {
    const response = await privateAxios.post(
      "/hotel/reviews-hotel",
      reviewData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Помилка при відправці відгуку"
    );
  }
};
