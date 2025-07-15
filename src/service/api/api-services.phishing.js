import { API_Post } from "./api-base";
import config from "@/lib/config";

const { apiBaseUrl } = config;

// Builds the base API URL
function getServerIP() {
  return `${apiBaseUrl}/api`;
}

/**
 * Response type for the URL check endpoint
 * @typedef {Object} URLCheckResponse
 * @property {"safe" | "phishing"} label - The classification result
 * @property {string} url - The URL that was checked
 * @property {string} message - User-friendly message explaining the result
 * @property {Object} probabilities - Confidence scores
 * @property {number} probabilities.safe - Probability of being safe
 * @property {number} probabilities.phishing - Probability of being phishing
 */

/**
 * Sends a URL to the backend for phishing detection
 * @param {string} url - The URL to check for phishing
 * @returns {Promise<URLCheckResponse>} The detection result
 * @throws {Error} If the API request fails
 */
export async function API_CheckURL(url) {
  if (!url || typeof url !== "string") {
    throw new Error("URL is required and must be a string");
  }

  try {
    const response = await API_Post("check_url", { url });

    if (!response || typeof response !== "object") {
      throw new Error("Invalid response from server");
    }

    const { label, probabilities, user_message } = response;

    if (label === undefined || ![0, 1].includes(label)) {
      throw new Error("Invalid detection result from server");
    }

    return {
      label,
      url,
      message:
        user_message || getDefaultURLMessage(label === 0 ? "safe" : "phishing"),
      probabilities: {
        safe: probabilities?.[0] ?? 0,
        phishing: probabilities?.[1] ?? 0,
      },
    };
  } catch (error) {
    if (error.message.includes("Invalid")) {
      throw error;
    }
    throw new Error(
      `Failed to check URL: ${error.message || "Unknown error occurred"}`
    );
  }
}

/**
 * Gets a default message for the URL detection result
 * @param {"safe" | "phishing"} label
 * @returns {string}
 */
function getDefaultURLMessage(label) {
  return label === "safe"
    ? "This URL appears to be safe. Always remain cautious when sharing sensitive information online."
    : "Warning: This URL shows characteristics of a phishing attempt. Do not proceed.";
}

/**
 * Response type for the message check endpoint
 * @typedef {Object} MessageCheckResponse
 * @property {string} message_id - The ID of the saved message
 * @property {Object|null} url_result - URL analysis result (if URL found)
 * @property {Object|null} text_result - Text analysis result
 * @property {string} user_message - Combined user-friendly message
 */

/**
 * Sends a message to the backend for intention detection
 * @param {string} message - The message to check for phishing intent
 * @returns {Promise<MessageCheckResponse>} The detection result
 * @throws {Error} If the API request fails
 */
export async function API_CheckMessage(message) {
  if (!message || typeof message !== "string") {
    throw new Error("Message is required and must be a string");
  }

  try {
    const response = await API_Post("check_message", { message });

    if (!response || typeof response !== "object") {
      throw new Error("Invalid response from server");
    }

    const { message_id, url_result, text_result, user_message } = response;

    if (!message_id) {
      throw new Error("Invalid message ID from server");
    }

    return {
      message_id,
      url_result: url_result || null,
      text_result: text_result || null,
      user_message:
        user_message || getDefaultMessageResult(url_result, text_result),
    };
  } catch (error) {
    if (error.message.includes("Invalid")) {
      throw error;
    }
    throw new Error(
      `Failed to check message: ${error.message || "Unknown error occurred"}`
    );
  }
}

/**
 * Gets a default message for the message detection result
 * @param {Object|null} url_result
 * @param {Object|null} text_result
 * @returns {string}
 */
function getDefaultMessageResult(url_result, text_result) {
  const messages = [];

  if (url_result) {
    const urlStatus = url_result.label === 0 ? "safe" : "phishing";
    messages.push(`URL Analysis: The URL appears to be ${urlStatus}.`);
  }

  if (text_result) {
    const textStatus = text_result.label === 0 ? "safe" : "suspicious";
    messages.push(`Text Analysis: The text content appears ${textStatus}.`);
  }

  return messages.length > 0 ? messages.join(" ") : "Analysis completed.";
}

/**
 * Response type for history entry
 * @typedef {Object} HistoryEntry
 * @property {string} type - Type of entry ("url" or "message")
 * @property {string} timestamp - ISO timestamp
 * @property {string} [url] - URL (for url type entries)
 * @property {number} [label] - Label (0 = safe, 1 = phishing, for url type entries)
 * @property {string} [content] - Message content (for message type entries)
 * @property {number|null} [text_label] - Text analysis label (for message type entries)
 * @property {number|null} [url_label] - URL analysis label (for message type entries)
 */

/**
 * Fetches user's detection history from the backend
 * @returns {Promise<HistoryEntry[]>} Array of history entries
 * @throws {Error} If the API request fails
 */
export async function API_GetHistory() {
  try {
    const response = await fetch(`${getServerIP()}/user/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
    if (!response.ok) {
      throw new Error(
        typeof data === "string" ? data : data?.error || "Unknown error"
      );
    }
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected array");
    }
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch history: ${error.message || "Unknown error occurred"}`
    );
  }
}

export async function API_DeleteHistory(id, type) {
  if (!id || !type) throw new Error("Both id and type are required");
  try {
    const response = await fetch(`${getServerIP()}/user/deleteHistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id, type }),
      credentials: "include",
    });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
    if (!response.ok) {
      throw new Error(
        typeof data === "string" ? data : data?.error || "Unknown error"
      );
    }
    return typeof data === "string" ? data : data.message;
  } catch (error) {
    throw new Error(
      `Failed to delete history: ${error.message || "Unknown error occurred"}`
    );
  }
}
