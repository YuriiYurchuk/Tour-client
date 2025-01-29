import { publicAxios } from "./axiosInstance";

export const getHotelDetailsById = async (hotelId) => {
  try {
    const response = await publicAxios.get(`/hotel/details/${hotelId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Помилка при отриманні даних готелю"
    );
  }
};
