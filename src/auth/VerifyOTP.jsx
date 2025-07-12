import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_VerifyOTP } from "@/service/api/api-services.auth";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get("email") || "";
    if (emailFromQuery) setEmail(emailFromQuery);
  }, [location.search]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (!email || otpString.length !== 6) {
      setError("Please fill all fields correctly.");
      return;
    }
    setError("");
    setIsLoading(true);
    setSuccess("");

    try {
      const res = await API_VerifyOTP(email, otpString);
      setSuccess(res.message || "OTP verified successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    setError("");
    setIsLoading(true);

    // TODO: Add resend OTP API call here

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("OTP has been resent to your email!");
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold m-5 text-blue-600">PhishGuard</h1>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Please enter the OTP sent to your email address to verify your
          account.
        </p>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4 text-center">{success}</div>
        )}
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow"
              required
            />
          </div>

          {/* OTP Input Fields */}
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-center text-xl font-bold text-gray-800 shadow"
                maxLength="1"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700 transition shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleResendOTP}
            disabled={isLoading}
            className="text-blue-600 hover:underline font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Resend OTP"}
          </button>
        </div>
        <div className="mt-6 text-gray-500 text-sm">
          Already verified?{" "}
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

export default VerifyOTP;
