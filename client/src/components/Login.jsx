import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, signupUser, verifyAdminLogin } from "@/features/authSlice";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const passwordRef = useRef(null);
  const otpRefs = useRef([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let action;
      if (mode === "login") {
        action = await dispatch(
          login({ email: formData.email, password: formData.password })
        );
      } else {
        action = await dispatch(signupUser(formData));
      }

      if (login.fulfilled.match(action) || signupUser.fulfilled.match(action)) {
        const data = action.payload;
        const success = Boolean(data?.success);
        const message =
          data?.message ||
          (success
            ? mode === "login"
              ? "Login Successful!"
              : "Signup Successful!"
            : "Something went wrong!");

        if (success) {
          // Check if this is an admin OTP verification response
          if (data.message && data.message.includes("OTP sent to admin email")) {
            toast.success(message);
            setShowOtpVerification(true);
          } else {
            toast.success(message);
            navigate("/");
          }
        } else {
          toast.error(message);
        }
      } else if (
        login.rejected.match(action) ||
        signupUser.rejected.match(action)
      ) {
        const message =
          action.payload || action.error?.message || "Something went wrong!";
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    
    setLoading(true);
    try {
      const action = await dispatch(verifyAdminLogin(otpString));
      
      if (verifyAdminLogin.fulfilled.match(action)) {
        const data = action.payload;
        const success = Boolean(data?.success);
        const message = data?.message || "OTP verification successful!";

        if (success) {
          toast.success(message);
          navigate("/");
        } else {
          toast.error(message);
        }
      } else if (verifyAdminLogin.rejected.match(action)) {
        const message = action.payload || action.error?.message || "OTP verification failed!";
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Navigation />

      <div className="bg-white flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="login.png"
            alt="leftSideImage"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
          {!showOtpVerification ? (
            <form
              className="w-full max-w-md flex flex-col items-center justify-center"
              onSubmit={handleSubmit}
            >
              <h2 className="text-3xl font-bold text-gray-900 self-start">
                {mode === "login" ? "Sign in" : "Sign up"}
              </h2>
              <p className="text-sm text-gray-500/90 mt-2 self-start">
                {mode === "login"
                  ? "Welcome back! Please sign in to continue"
                  : "Create your account to get started"}
              </p>

            {/* Name input only for signup */}
            {mode === "signup" && (
              <div className="flex items-center mt-4 w-full border border-gray-300/60 h-12 rounded-full px-4 gap-3 focus-within:border-indigo-500">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  required
                />
              </div>
            )}

            {/* Email Input */}
            <div className="flex items-center mt-4 w-full border border-gray-300/60 h-12 rounded-full px-4 gap-3 focus-within:border-indigo-500">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email id"
                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password Input - Always Visible */}
            <div className="flex items-center mt-4 w-full border border-gray-300/60 h-12 rounded-full px-4 focus-within:border-indigo-500">
              <input
                ref={passwordRef}
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Remember Me & Forgot Password only for login */}
            {/* {mode === "login" && (
              <div className="w-full flex items-center justify-between mt-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <input
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    type="checkbox"
                    id="checkbox"
                  />
                  <label className="text-sm" htmlFor="checkbox">
                    Remember me
                  </label>
                </div>
                <span className="text-sm text-indigo-500 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
            )} */}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-8 w-full h-12 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading || isLoading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Sign Up"}
            </button>

              {/* Switch mode link */}
              <p className="text-gray-500/90 text-sm mt-6">
                {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  className="text-indigo-500 font-semibold hover:underline cursor-pointer"
                  onClick={() =>
                    setMode(mode === "login" ? "signup" : "login")
                  }
                >
                  {mode === "login" ? "Sign up" : "Login"}
                </span>
              </p>
            </form>
          ) : (
            <form
              className="w-full max-w-md flex flex-col items-center justify-center"
              onSubmit={handleOtpVerification}
            >
              <h2 className="text-3xl font-bold text-gray-900 self-start">
                Verify OTP
              </h2>
              <p className="text-sm text-gray-500/90 mt-2 self-start">
                Please enter the 6-digit code sent to your email address
              </p>

              {/* OTP Input Boxes */}
              <div className="flex gap-3 mt-8 w-full justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="mt-8 w-full h-12 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center"
                disabled={loading}
              >
                {loading || isLoading ? "Verifying..." : "Verify OTP"}
              </button>

              {/* Back to login link */}
              <p className="text-gray-500/90 text-sm mt-6">
                <span
                  className="text-indigo-500 font-semibold hover:underline cursor-pointer"
                  onClick={() => {
                    setShowOtpVerification(false);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                >
                  Back to Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;