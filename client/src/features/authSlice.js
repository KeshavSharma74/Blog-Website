// src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

axios.defaults.withCredentials = true;

// existing thunks (signup, checkAuth, login, logout)
export const signupUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Making checkAuth request to:", `${API_URL}/api/user/check-auth`);
      const response = await axios.get(`${API_URL}/api/user/check-auth`);
      console.log("checkAuth response:", response.data);
      return response.data;
    } catch (error) {
      console.log("checkAuth error:", error);
      return rejectWithValue(
        error.response?.data?.message || "checking Authentication failed"
      );
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "logout failed");
    }
  }
);

// ---------- New thunks for forgot-password flow ----------

// Sends OTP to the provided email (route: POST /api/user/reset-otp)
export const sendResetOtp = createAsyncThunk(
  "auth/sendResetOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/reset-otp`, { email });
      return response.data; // expecting { success: true, message: '...' }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset OTP"
      );
    }
  }
);

// Resets password given email, otp, newPassword (route: POST /api/user/reset-password)
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      });
      return response.data; // expecting { success: true, message: 'Password changed Successfully' }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

// ----------------------------------------------------------

const initialState = {
  user: null,
  isLoading: false,
  isCheckingAuth: true, // ✅ start as true to wait for checkAuth

  // forgot-password specific states
  resetOtpLoading: false,
  resetPasswordLoading: false,
  resetError: null,
  resetMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // If you want to clear reset state from UI (optional)
    clearResetState(state) {
      state.resetOtpLoading = false;
      state.resetPasswordLoading = false;
      state.resetError = null;
      state.resetMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state) => {
        state.isLoading = false;
      })

      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("checkAuth fulfilled:", action.payload);
        state.isCheckingAuth = false;
        state.user = action.payload.user || null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log("checkAuth rejected:", action.payload);
        state.isCheckingAuth = false;
        state.user = null;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isCheckingAuth = false; // ✅ ensure it's not left in a "loading" state
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const { clearResetState } = authSlice.actions;
export default authSlice.reducer;
