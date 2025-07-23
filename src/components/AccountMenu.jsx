import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { API_Logout } from "@/service/api/api-services.auth";
import { showSwal } from "@/lib/showSwal";

const AccountMenu = ({ show, anchorRef, onClose, user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const menuRef = useRef(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target)
      ) {
        onClose();
      }
    }
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose, anchorRef]);

  // Only render the menu if show is true and logout modal is not open
  if (!show && !showLogoutConfirm) return null;

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await API_Logout();
    } catch (error) {
      // ignore API error, always log out locally
    } finally {
      logout();
      setShowLogoutConfirm(false);
      onClose();
      showSwal("success", "Logged out successfully.");
      setLogoutLoading(false);
      navigate("/login");
    }
  };

  return (
    <>
      {/* Account menu dropdown */}
      {show && !showLogoutConfirm && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-4"
        >
          <div className="mb-2">
            <div className="font-semibold text-lg text-gray-900">
              {user?.username || "User"}
            </div>
            <div className="text-gray-500 text-sm">{user?.email || ""}</div>
          </div>
          <div className="border-t border-gray-200 my-3"></div>
          <Link
            to="/history"
            className="flex items-center w-full px-3 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 gap-3 transition-all duration-300"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            History
          </Link>
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-gray-100 text-red-600 gap-3 mt-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M12 19v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
            </svg>
            Log Out
          </button>
        </div>
      )}
      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full"
              onClick={() => setShowLogoutConfirm(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Confirm Logout
            </h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-all duration-200 ease-in-out"
                onClick={() => setShowLogoutConfirm(false)}
                disabled={logoutLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-all duration-200 ease-in-out"
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? "Logging out..." : "Log Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountMenu;
