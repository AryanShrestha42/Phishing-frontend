import React, { useState } from "react";
import { API_CheckURL } from "@/service/api/api-services.phishing";

const DetectURL = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await API_CheckURL(url);
      const isSafe = response.label === 0;

      setResult({
        status: isSafe ? "safe" : "phishing",
        message: response.message,
        probabilities: response.probabilities,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 px-2 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Detect Malicious URLs Instantly
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-2xl text-center">
        Analyze any link to identify potential phishing threats and ensure safe
        browsing.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-3xl gap-4"
      >
        <input
          type="text"
          name="url"
          placeholder="Enter URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-grow px-6 py-4 rounded-xl border-2 border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow transition-all duration-200 ease-in-out"
          disabled={loading}
        />
        <button
          type="submit"
          className={`text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 ease-in-out ${
            loading
              ? "bg-blue-400"
              : "bg-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-black"
          }`}
          disabled={loading}
        >
          {loading ? "Scanning..." : "Scan URL"}
        </button>
      </form>

      {error && (
        <div className="w-full max-w-4xl bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      {result && (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center mt-12">
          {result.status === "safe" ? (
            <>
              <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                The website is{" "}
                <span className="font-bold text-green-600">Safe.</span>
              </h2>
              <p className="text-gray-500 text-center text-lg mb-4">
                {result.message}
              </p>
              {result.probabilities && (
                <p className="text-sm text-gray-400">
                  Confidence: {(result.probabilities.safe * 100).toFixed(1)}%
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                The website is{" "}
                <span className="font-bold text-red-600">Phishing!</span>
              </h2>
              <p className="text-gray-500 text-center text-lg mb-4">
                {result.message}
              </p>
              {result.probabilities && (
                <p className="text-sm text-gray-400">
                  Risk Level: {(result.probabilities.phishing * 100).toFixed(1)}
                  %
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DetectURL;
