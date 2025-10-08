import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, signupUser } from "@/features/authSlice";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          toast.success(message);
          navigate("/");
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
        </div>
      </div>
    </div>
  );
};

export default Login;
