import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleBookingById } from "@api/bookingApi";

export const fetchBookingId = createAsyncThunk(
  "booking/fetchHotelByBookingId",
  async (bookingId, { rejectWithValue }) => {
    try {
      const data = await getSingleBookingById(bookingId);
      if (!data.booking) {
        return rejectWithValue("Бронювання не знайдено");
      }
      if (!data.confirmed) {
        return rejectWithValue("Бронювання не підтверджено");
      }
      return data.booking;
    } catch {
      return rejectWithValue("Помилка при отриманні бронювання");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBooking: (state) => {
      state.booking = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingId.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchBookingId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
