import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, refreshToken, logout } from "../../api/authApi";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await login(data);
      const decodedToken = jwtDecode(response.accessToken);
      localStorage.setItem("accessToken", response.accessToken);
      toast.success("Вхід виконано успішно!");
      return { ...response, user: decodedToken };
    } catch (error) {
      toast.error(
        "Помилка входу: " +
          (error.response?.data?.message || "Невідома помилка")
      );
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await refreshToken();
      const decodedToken = jwtDecode(response.accessToken);
      localStorage.setItem("accessToken", response.accessToken);
      return { ...response, user: decodedToken };
    } catch (error) {
      localStorage.removeItem("accessToken");
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Token refresh failed" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      toast.success("Вихід виконано успішно!");
    } catch (error) {
      toast.error(
        "Помилка виходу: " +
          (error.response?.data?.message || "Невідома помилка")
      );
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    status: "idle",
    error: null,
    isLoading: true,
  },
  reducers: {
    restoreUserFromToken: (state) => {
      const token = localStorage.getItem("accessToken");
      if (token && !isTokenExpired(token)) {
        const decodedToken = jwtDecode(token);
        state.user = decodedToken;
        state.accessToken = token;
      } else {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("accessToken");
      }
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "succeeded";
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Login failed";
        state.status = "failed";
        state.isLoading = false;
      })
      .addCase(refreshUserToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.error = action.payload?.message || "Token refresh failed";
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isLoading = false;
      });
  },
});

export const { restoreUserFromToken } = authSlice.actions;

export default authSlice.reducer;
