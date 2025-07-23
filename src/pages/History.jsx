// This is a page component, not a reusable UI component.
import React, { useState, useEffect } from "react";
import {
  API_GetHistory,
  API_DeleteHistory,
} from "@/service/api/api-services.phishing";
import { showSwal } from "@/lib/showSwal";

const getBadgeColor = (color) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-700 border-green-200";
    case "red":
      return "bg-red-100 text-red-700 border-red-200";
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "orange":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "purple":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "gray":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const History = () => {
  const [viewRow, setViewRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      setError(null);
      try {
        const data = await API_GetHistory();
        setRows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const handleDelete = async (id, type) => {
    setDeleteLoading(true);
    try {
      await API_DeleteHistory(id, type);
      setRows((prev) => prev.filter((row) => row.id !== id));
      setDeleteRow(null);
      showSwal("success", "Entry deleted successfully.");
    } catch (err) {
      showSwal("error", err.message || "Failed to delete entry.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 py-10">
      <h2 className="text-2xl font-semibold mb-6">Detection History</h2>
      <div className="overflow-x-auto rounded-xl shadow border bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Input
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Detection Result
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  Loading history...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-red-400">
                  {error}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No history found.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {idx + 1}
                  </td>
                  <td
                    className="px-4 py-3 max-w-xs truncate"
                    title={row.type === "url" ? row.url : row.content}
                  >
                    {row.type === "url"
                      ? row.url && row.url.length > 40
                        ? row.url.slice(0, 40) + "..."
                        : row.url
                      : row.content && row.content.length > 40
                      ? row.content.slice(0, 40) + "..."
                      : row.content}
                  </td>
                  <td className="px-4 py-3">
                    {row.type === "url" ? "URL" : "Message"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${getBadgeColor(
                        row.type === "url"
                          ? row.label === 0
                            ? "green"
                            : row.label === 1
                            ? "red"
                            : "gray"
                          : row.text_label === 0
                          ? "green"
                          : row.text_label === 1
                          ? "red"
                          : "gray"
                      )}`}
                    >
                      {row.type === "url"
                        ? row.label === 0
                          ? "Safe"
                          : row.label === 1
                          ? "Phishing"
                          : "Unknown"
                        : row.text_label === 0
                        ? "Safe"
                        : row.text_label === 1
                        ? "Phishing"
                        : "Unknown"}
                      {row.type === "message" &&
                      row.url_label !== undefined &&
                      row.url_label !== null
                        ? ` (URL: ${
                            row.url_label === 0
                              ? "Safe"
                              : row.url_label === 1
                              ? "Phishing"
                              : "Unknown"
                          })`
                        : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.timestamp}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="p-2 text-blue-700 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-lg"
                      onClick={() => setViewRow(row.id)}
                      title="View Details"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-lg"
                      onClick={() => setDeleteRow(row.id)}
                      title="Delete Entry"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog Modal for View */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full"
              onClick={() => setViewRow(null)}
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
            <h3 className="text-lg font-semibold mb-4">Detection Details</h3>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Input:</span>{" "}
                <span className="break-words">
                  {/* Data for viewRow would be fetched here */}
                  {/* For now, it will show a placeholder */}
                  Placeholder Input
                </span>
              </div>
              <div>
                <span className="font-semibold">Type:</span>{" "}
                {/* Data for viewRow would be fetched here */}
                {/* For now, it will show a placeholder */}
                Placeholder Type
              </div>
              <div>
                <span className="font-semibold">Detection Result:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${getBadgeColor(
                    // Data for viewRow would be fetched here
                    // For now, it will show a placeholder
                    "gray"
                  )}`}
                >
                  {/* Data for viewRow would be fetched here */}
                  {/* For now, it will show a placeholder */}
                  Placeholder Result
                </span>
              </div>
              <div>
                <span className="font-semibold">Date & Time:</span>{" "}
                {/* Data for viewRow would be fetched here */}
                {/* For now, it will show a placeholder */}
                Placeholder Date
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Modal for Delete Confirmation */}
      {deleteRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-full"
              onClick={() => setDeleteRow(null)}
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
              Confirm Delete
            </h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this entry?
            </p>
            {/* deleteError && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {deleteError}
              </div>
            ) */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-all duration-200 ease-in-out"
                onClick={() => setDeleteRow(null)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-all duration-200 ease-in-out"
                onClick={() => {
                  const row = rows.find((r) => r.id === deleteRow);
                  if (row) handleDelete(row.id, row.type);
                }}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
