// This is a page component, not a reusable UI component.
import React, { useState } from "react";

const mockHistory = [
  {
    id: 1,
    input: "https://safe-bank.com/login",
    type: "URL",
    result: { label: "Safe", color: "green" },
    intent: null,
    date: "2024-07-12 14:23",
  },
  {
    id: 2,
    input:
      "Your account is locked. Click here to reset: http://phishing-site.com/reset",
    type: "Message",
    result: { label: "Phishing", color: "red" },
    intent: "Credential Theft",
    date: "2024-07-12 13:10",
  },
  {
    id: 3,
    input: "http://scam-offer.com/win-prize",
    type: "URL",
    result: { label: "Phishing", color: "red" },
    intent: "Financial Fraud",
    date: "2024-07-12 12:45",
  },
  {
    id: 4,
    input: "Congratulations! You've won a free iPhone. Enter your details...",
    type: "Message",
    result: { label: "Phishing", color: "red" },
    intent: "Personal Info Harvesting",
    date: "2024-07-12 11:12",
  },
  {
    id: 5,
    input: "https://google.com",
    type: "URL",
    result: { label: "Safe", color: "green" },
    intent: null,
    date: "2024-07-12 10:30",
  },
  {
    id: 6,
    input: "Please verify your email address by clicking this link",
    type: "Message",
    result: { label: "Safe", color: "green" },
    intent: null,
    date: "2024-07-12 09:15",
  },
];

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
  const [rows, setRows] = useState(mockHistory);

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    setDeleteRow(null);
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
            {rows.map((row, idx) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 max-w-xs truncate" title={row.input}>
                  {row.input.length > 40
                    ? row.input.slice(0, 40) + "..."
                    : row.input}
                </td>
                <td className="px-4 py-3">{row.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${getBadgeColor(
                      row.result.color
                    )}`}
                  >
                    {row.result.label}
                    {row.intent ? `: ${row.intent}` : ""}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{row.date}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="p-2 text-blue-700 hover:text-blue-900 transition-colors"
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
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
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
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog Modal for View */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
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
                  {rows.find((r) => r.id === viewRow)?.input}
                </span>
              </div>
              <div>
                <span className="font-semibold">Type:</span>{" "}
                {rows.find((r) => r.id === viewRow)?.type}
              </div>
              <div>
                <span className="font-semibold">Detection Result:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${getBadgeColor(
                    rows.find((r) => r.id === viewRow)?.result.color
                  )}`}
                >
                  {rows.find((r) => r.id === viewRow)?.result.label}
                  {rows.find((r) => r.id === viewRow)?.intent
                    ? `: ${rows.find((r) => r.id === viewRow)?.intent}`
                    : ""}
                </span>
              </div>
              <div>
                <span className="font-semibold">Date & Time:</span>{" "}
                {rows.find((r) => r.id === viewRow)?.date}
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
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
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
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium"
                onClick={() => setDeleteRow(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium"
                onClick={() => handleDelete(deleteRow)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
