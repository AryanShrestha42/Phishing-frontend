import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = () => {
      const sessionToken = localStorage.getItem("session_token");
      const userData = localStorage.getItem("user_data");

      if (sessionToken && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("session_token");
          localStorage.removeItem("user_data");
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (userData, sessionToken) => {
    setUser(userData);
    localStorage.setItem("session_token", sessionToken);
    localStorage.setItem("user_data", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session_token");
    localStorage.removeItem("user_data");
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
