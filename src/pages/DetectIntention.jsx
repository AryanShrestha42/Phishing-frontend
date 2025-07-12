import React, { useState } from "react";
import { API_CheckMessage } from "@/service/api/api-services.phishing";

const DetectIntention = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await API_CheckMessage(message);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getOverallStatus = (urlResult, textResult) => {
    if (urlResult && textResult) {
      // If both analyses exist, consider it phishing if either is suspicious
      return urlResult.label === 1 || textResult.label === 1
        ? "phishing"
        : "safe";
    } else if (urlResult) {
      return urlResult.label === 0 ? "safe" : "phishing";
    } else if (textResult) {
      return textResult.label === 0 ? "safe" : "phishing";
    }
    return "unknown";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "safe":
        return "text-green-600";
      case "phishing":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "safe":
        return "Safe";
      case "phishing":
        return "Phishing!";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 px-2 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Understand the Scammer's Intent
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-2xl text-center">
        Paste suspicious text or links to uncover the scammer's true objective
        using intelligent analysis.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-3xl gap-4"
      >
        <textarea
          name="message"
          placeholder="Enter Message and URL (e.g., 'Check out this website: https://example.com')"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-base placeholder-gray-400 shadow resize-y min-h-[120px]"
          disabled={loading}
          required
        />

        <button
          type="submit"
          className={`${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-8 py-4 rounded-xl font-medium transition self-end`}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Intent"}
        </button>
      </form>

      {error && (
        <div className="w-full max-w-4xl bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      {result && (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center mt-12">
          {(() => {
            const overallStatus = getOverallStatus(
              result.url_result,
              result.text_result
            );
            return (
              <>
                <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                  Analysis Result:{" "}
                  <span
                    className={`font-bold ${getStatusColor(overallStatus)}`}
                  >
                    {getStatusText(overallStatus)}
                  </span>
                </h2>

                <div className="w-full space-y-6 mt-6">
                  {/* URL Analysis */}
                  {result.url_result && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        URL Analysis
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <strong>URL:</strong> {result.url_result.url}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Status:</strong>{" "}
                          <span
                            className={
                              result.url_result.label === 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {result.url_result.label === 0
                              ? "Safe"
                              : "Phishing"}
                          </span>
                        </p>
                        {result.url_result.probabilities && (
                          <p className="text-sm text-gray-600">
                            <strong>Confidence:</strong>{" "}
                            {result.url_result.label === 0
                              ? `${(
                                  result.url_result.probabilities[0] * 100
                                ).toFixed(1)}% Safe`
                              : `${(
                                  result.url_result.probabilities[1] * 100
                                ).toFixed(1)}% Phishing`}
                          </p>
                        )}
                        <p className="text-gray-700 mt-2">
                          {result.url_result.user_message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Text Analysis */}
                  {result.text_result && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Text Analysis
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <strong>Text:</strong> "{result.text_result.text}"
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Status:</strong>{" "}
                          <span
                            className={
                              result.text_result.label === 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {result.text_result.label === 0
                              ? "Safe"
                              : "Suspicious"}
                          </span>
                        </p>
                        {result.text_result.probabilities && (
                          <p className="text-sm text-gray-600">
                            <strong>Confidence:</strong>{" "}
                            {result.text_result.label === 0
                              ? `${(
                                  result.text_result.probabilities[0] * 100
                                ).toFixed(1)}% Safe`
                              : `${(
                                  result.text_result.probabilities[1] * 100
                                ).toFixed(1)}% Suspicious`}
                          </p>
                        )}
                        <p className="text-gray-700 mt-2">
                          {result.text_result.user_message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Combined Message */}
                  {result.user_message && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">
                        Summary
                      </h3>
                      <p className="text-blue-700 whitespace-pre-line">
                        {result.user_message}
                      </p>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default DetectIntention;
