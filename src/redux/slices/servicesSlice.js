import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedServices: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSelectedServices: (state, action) => {
      state.selectedServices = action.payload;
    },
    clearServices: (state) => {
      state.selectedServices = [];
    },
  },
});

export const { setSelectedServices, clearServices } = servicesSlice.actions;
export default servicesSlice.reducer;
