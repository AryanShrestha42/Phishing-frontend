import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_Login } from "@/service/api/api-services.auth";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill up all fields.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await API_Login(username, password);

      if (response.message === "Login successful") {
        setSuccess("Logged in successfully!");
        setError("");

        // Store user data and token using auth context
        const userData = {
          username: response.username,
          email: response.email,
        };
        login(userData, response.session_token);

        setTimeout(() => {
          // Redirect to the page they were trying to access, or landing page
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setError("Invalid credentials. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      // Always show a string error message
      let msg = "Login failed. Please try again.";
      if (typeof err === "string") msg = err;
      else if (err && err.message) msg = err.message;
      setError(msg);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold m-5 text-blue-600">PhishGuard</h1>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
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
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow"
              required
              disabled={isLoading}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={isLoading}
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
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700 transition shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
