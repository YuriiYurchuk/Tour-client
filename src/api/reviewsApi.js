import { publicAxios, privateAxios } from "./axiosInstance";

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

export const getUserReview = async (reviewId) => {
  try {
    const response = await privateAxios.get(`/reviews/get-reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні відгуку", error);
    throw error;
  }
};

export const deleteCompanyReview = async (reviewId) => {
  try {
    await privateAxios.delete(`/reviews/delete/${reviewId}`);
  } catch (error) {
    console.error("Помилка при видаленні відгуку", error);
    throw error;
  }
};

export const createCompanyReview = async (reviewData) => {
  try {
    const response = await privateAxios.post("/reviews/create", reviewData);
    return response.data;
  } catch (error) {
    console.error("Помилка при створенні відгуку", error);
    throw error;
  }
};
