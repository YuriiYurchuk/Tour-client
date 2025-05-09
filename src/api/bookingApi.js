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
    const response = await privateAxios.get(
      `/bookings/details-client/${bookingId}`
    );
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

export const sendBookingDetails = async (bookingId, payload) => {
  try {
    const response = await privateAxios.post(
      `/bookings/details/${bookingId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(
      "Помилка надсилання деталей бронювання:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllBookings = async ({ page = 1, limit = 10, status }) => {
  try {
    const params = { page, limit };
    if (status) params.status = status;

    const response = await privateAxios.get("/bookings/all", { params });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all bookings:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await privateAxios.patch(`/bookings/status/${bookingId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating booking status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBookingDetails = async (bookingId) => {
  try {
    const response = await privateAxios.get(`/bookings/details/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching booking details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
