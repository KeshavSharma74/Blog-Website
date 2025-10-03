// src/features/authSlice.js
import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
axios.defaults.withCredentials = true;

/* ----------------- THUNKS ----------------- */

// Signup
export const signupUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/user/register`, userData);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Signup failed");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// Check Auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/user/check-auth`);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Auth check failed");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "checking Authentication failed");
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/user/login`, userData);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Login failed");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "login failed");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/user/logout`);

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Logout failed");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "logout failed");
    }
  }
);

// Send Reset OTP
export const sendResetOtp = createAsyncThunk(
  "auth/sendResetOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/user/reset-otp`, { email });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to send reset OTP");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send reset OTP");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Failed to reset password");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to reset password");
    }
  }
);

/* ----------------- SLICE ----------------- */

const initialState = {
  user: null,
  isLoading: false,
  isCheckingAuth: false,

  // forgot-password states
  resetOtpLoading: false,
  resetPasswordLoading: false,
  resetError: null,
  resetMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
        toast.success("Signup successful!");
      })
      .addCase(signupUser.rejected, (state) => {
        state.isLoading = false;
      })

      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload.user || null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.user = null;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        toast.success("Login successful!");
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        toast.success("Logged out successfully!");
      })

      // send reset otp
      .addCase(sendResetOtp.pending, (state) => {
        state.resetOtpLoading = true;
      })
      .addCase(sendResetOtp.fulfilled, (state, action) => {
        state.resetOtpLoading = false;
        state.resetMessage = action.payload.message;
        toast.success(action.payload.message || "OTP sent!");
      })
      .addCase(sendResetOtp.rejected, (state, action) => {
        state.resetOtpLoading = false;
        state.resetError = action.payload;
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetMessage = action.payload.message;
        toast.success(action.payload.message || "Password reset successful!");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetError = action.payload;
      })

      /*  Global matcher: show toast for all rejects */

  },
});

export const { clearResetState } = authSlice.actions;
export default authSlice.reducer;
