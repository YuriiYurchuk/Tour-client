import { publicAxios } from "./axiosInstance";

export const getReviewsLatest = async () => {
  try {
    const response = await publicAxios.get("/reviews/latest");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні відгуків", error);
    throw error;
  }
};

export const getReviewsCompany = async (page = 1, limit = 9) => {
  try {
    const response = await publicAxios.get("/reviews/get-reviews", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні відгуків компанії", error);
    throw error;
  }
};
