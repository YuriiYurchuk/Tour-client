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

export const getBookingsByUserId = async (userId) => {
  try {
    const response = await privateAxios.get(`/bookings/get-booking/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching bookings:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleBookingById = async (bookingId) => {
  try {
    const response = await privateAxios.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching booking by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await privateAxios.patch(`/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error canceling booking:",
      error.response?.data || error.message
    );
    throw error;
  }
};
