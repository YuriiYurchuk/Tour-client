import { privateAxios } from "./axiosInstance";

export const createBooking = async (bookingData) => {
  try {
    const response = await privateAxios.post("/bookings/create", bookingData);
    return response.data;
  } catch (error) {
    console.error("Contact form error:", error.response?.data || error.message);
    throw error;
  }
};
