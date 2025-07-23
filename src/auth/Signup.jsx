import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_SignUp } from "@/service/api/api-services.auth";
import { showSwal } from "@/lib/showSwal";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      showSwal("warning", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await API_SignUp(username, email, password);
      showSwal("success", res.message || "Signup successful!");
      // Redirect user to OTP verification page with email as query param
      setTimeout(() => {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err) {
      showSwal("error", err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  // Clear messages on input change to improve UX
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold m-5 text-blue-600">PhishGuard</h1>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Username Input with Icon */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gray-400"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleInputChange(setUsername)}
              className="w-full pl-10 pr-5 py-3 rounded-xl border-2 border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow transition-all duration-200 ease-in-out"
              required
            />
          </div>

          {/* Email Input with Icon */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gray-400"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail)}
              className="w-full pl-10 pr-5 py-3 rounded-xl border-2 border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow transition-all duration-200 ease-in-out"
              required
            />
          </div>

          {/* Password Input with Icon and Toggle */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gray-400"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword)}
              className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow transition-all duration-200 ease-in-out"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center transition-all duration-200 ease-in-out hover:opacity-75"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-gray-400 hover:text-gray-600"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-gray-400 hover:text-gray-600"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-black transition-all duration-200 ease-in-out shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
