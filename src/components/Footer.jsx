import React from "react";

const Footer = () => (
  <footer className="py-6 border-t border-slate-700 flex items-center justify-between gap-8 text-slate-300 text-sm w-full px-6 font-sans bg-slate-800">
    <div>PhishGuard. © 2024 PhishGuard. All Rights Reserved.</div>
    <div className="flex space-x-6">
      <a href="#" className="hover:text-white transition-colors">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="hover:text-white transition-colors">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" className="hover:text-white transition-colors">
        <i className="fab fa-github"></i>
      </a>
      <a href="#" className="hover:text-white transition-colors">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </footer>
);

export default Footer;
