import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-white text-gray-900 text-center font-sans transition-colors duration-200">
      <span className="font-medium">
        &copy; {new Date().getFullYear()} PhishGuard. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
