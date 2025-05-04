import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookingReducer from "./slices/bookingSlice";
import servicesReducer from "./slices/servicesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    services: servicesReducer,
  },
});

export default store;
