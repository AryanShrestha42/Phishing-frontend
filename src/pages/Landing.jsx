import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "@/context/AuthContext";

const Landing = () => {
  const { user } = useAuth();
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center min-h-[420px] flex items-center justify-center shadow-lg font-sans"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        <div className="absolute w-full inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 py-32 gap-8">
          {user && (
            <div className="mb-4 text-white text-xl">
              Welcome back,{" "}
              <span className="font-semibold">{user.username}</span>!
            </div>
          )}
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg font-sans">
            Protect Yourself from Online Scams
            <br /> with One Click
          </h1>
          <p className="text-xl text-gray-200 mb-8 drop-shadow font-sans">
            PhishGuard helps you identify potentially dangerous phishing
            websites before it's too late. Stay safe online and protect your
            personal information with our advanced detection system.
          </p>
          <button
            onClick={() => {
              document.getElementById("services").scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg text-lg hover:bg-blue-700 transition font-medium"
          >
            Get Started
          </button>
        </div>
      </div>

      <section className="bg-white py-16 px-6 w-full font-sans">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <p className="text-gray-500 text-center mb-12 max-w-3xl mx-auto">
          Step-by-step process to ensure secure and seamless authentication for
          every user.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 text-blue-600"
              >
                <path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Paste URL</h3>
            <p className="text-gray-600">
              Simply paste the URL you want to check into our detection system.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 text-blue-600"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Analyze</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes the URL for potential phishing
              indicators.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 text-blue-600"
              >
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Get Results</h3>
            <p className="text-gray-600">
              Receive instant results with detailed analysis and
              recommendations.
            </p>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="bg-gray-100 py-16 px-6 w-full font-sans"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <p className="text-gray-500 text-center mb-12 max-w-3xl mx-auto">
          Comprehensive phishing detection tools to keep you safe online. Choose
          the service that best fits your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* DetectURL Service */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-blue-600"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Detect URL</h3>
            <p className="text-gray-600 mb-6">
              Scan any URL to instantly determine if it's legitimate or a
              phishing attempt. Our advanced algorithm analyzes multiple factors
              to provide accurate results.
            </p>
            <Link
              to="/detectURL"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Scan URL
            </Link>
          </div>

          {/* DetectIntention Service */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-green-600"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Detect Intention</h3>
            <p className="text-gray-600 mb-6">
              Analyze both text and URLs to understand the sender's true
              intention. Perfect for detecting sophisticated phishing attempts
              in messages and emails.
            </p>
            <Link
              to="/detectIntent"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Analyze Intent
            </Link>
          </div>

          {/* Browser Extension Service */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-purple-600"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Browser Extension</h3>
            <p className="text-gray-600 mb-6">
              Get real-time protection while browsing. Our extension
              automatically detects unsafe websites and shows a warning popup
              before you visit them.
            </p>
            <button
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium cursor-pointer"
              disabled
            >
              Install
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 w-full font-sans">
        <h2 className="text-3xl font-bold text-center mb-6">Features</h2>
        <p className="text-gray-500 text-center mb-12 max-w-3xl mx-auto text-lg">
          Explore the core features that make our phishing detection tool fast,
          accurate, secure, and effortless to use—built with machine learning to
          protect you in real time.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-blue-600"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-xl font-medium">Fast Detection</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-12 flex items-center gap-6">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-pink-600"
              >
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.02 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.02 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
              </svg>
            </div>
            <span className="text-xl font-medium">ML Backed Accuracy</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-12 flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-blue-600"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <span className="text-xl font-medium">Easy-to-Use Interface</span>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-12 flex items-center gap-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-yellow-600"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="text-xl font-medium">Privacy/Security</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
