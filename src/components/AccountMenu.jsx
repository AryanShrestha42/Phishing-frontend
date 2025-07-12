import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { API_Logout } from "@/service/api/api-services.auth";

const AccountMenu = ({ show, anchorRef, onClose, user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const menuRef = useRef(null);

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

  if (!show) return null;

  return (
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
        className="flex items-center w-full px-2 py-2 rounded-lg hover:bg-gray-100 text-gray-700 gap-3"
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
        onClick={async () => {
          try {
            await API_Logout();
          } catch (error) {
            console.error("Logout error:", error);
          } finally {
            logout();
            onClose();
            navigate("/login");
          }
        }}
        className="flex items-center w-full px-2 py-2 rounded-lg hover:bg-gray-100 text-red-600 gap-3 mt-1"
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
  );
};

export default AccountMenu;
