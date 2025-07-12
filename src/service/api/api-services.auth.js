import { API_Post } from "./api-base";

// Handles user registration
export async function API_SignUp(username, email, password) {
  try {
    const res = await API_Post("auth/signup", { username, email, password });
    if (res?.message) {
      return res;
    }
    throw new Error("Unexpected response format");
  } catch (error) {
    // Extract error message from backend error key or fallback
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "An error occurred during signup. Please try again.";
    console.error("Signup error:", message);
    throw new Error(message);
  }
}

// Handles login authentication
export async function API_Login(username, password) {
  try {
    const res = await API_Post("auth/login", { username, password });
    if (res?.message) {
      return res;
    }
    throw new Error("Unexpected response format");
  } catch (error) {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "An error occurred during login. Please try again.";
    console.error("Login error:", message);
    throw new Error(message);
  }
}

// Handles OTP verification
export async function API_VerifyOTP(email, otp) {
  try {
    const res = await API_Post("auth/verify-otp", { email, otp });
    if (res?.message) {
      return res;
    }
    throw new Error("Unexpected response format");
  } catch (error) {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "An error occurred during OTP verification. Please try again.";
    console.error("Verify OTP error:", message);
    throw new Error(message);
  }
}

// Handles logout
export async function API_Logout() {
  try {
    const res = await API_Post("auth/logout", {});
    if (res?.message) {
      return res;
    }
    throw new Error("Unexpected response format");
  } catch (error) {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "An error occurred during logout. Please try again.";
    console.error("Logout error:", message);
    throw new Error(message);
  }
}

// Check if user is authenticated
export async function API_CheckAuth() {
  try {
    const res = await API_Post("auth/check", {});
    return res;
  } catch (error) {
    throw new Error("Authentication check failed");
  }
}
