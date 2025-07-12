import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
