import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import DetectURL from "./pages/DetectURL";
import DetectIntention from "./pages/DetectIntention";
import About from "./pages/About";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import VerifyOTP from "./auth/VerifyOTP";
import History from "./pages/History";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <PublicRoute>
                <VerifyOTP />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="detectURL" element={<DetectURL />} />
            <Route path="detectIntent" element={<DetectIntention />} />
            <Route path="history" element={<History />} />
          </Route>
          {/* Catch all route - redirect to login if not authenticated */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
