import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountBtnRef = useRef(null);
  const menuRef = useRef(null);
  const { user } = useAuth();
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        accountBtnRef.current &&
        !accountBtnRef.current.contains(event.target)
      ) {
        setShowAccountMenu(false);
      }
    }
    if (showAccountMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountMenu]);

  return (
    <nav className="bg-gray-50 w-full py-4 shadow font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between ">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">
            <span className="text-blue-600">Phish</span>
            <span className="text-gray-900">Guard</span>
          </span>
        </div>

        {/* Nav Links */}
        <ul className="flex space-x-10">
          <li>
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive("/")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-900 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive("/about")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-900 hover:text-blue-600"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/detectURL"
              className={`font-medium transition-colors ${
                isActive("/detectURL")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-900 hover:text-blue-600"
              }`}
            >
              Detect URL
            </Link>
          </li>
          <li>
            <Link
              to="/detectIntent"
              className={`font-medium transition-colors ${
                isActive("/detectIntent")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-900 hover:text-blue-600"
              }`}
            >
              Detect Intention
            </Link>
          </li>
        </ul>

        {/* User Account Button */}
        <div className="relative">
          <button
            ref={accountBtnRef}
            onClick={() => setShowAccountMenu((v) => !v)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 focus:outline-none"
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
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </button>
          <AccountMenu
            show={showAccountMenu}
            anchorRef={accountBtnRef}
            onClose={() => setShowAccountMenu(false)}
            user={user}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
