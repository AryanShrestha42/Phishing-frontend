import config from "@/lib/config";

const { apiBaseUrl } = config;

// Builds the base API URL
function getServerIP() {
  return `${apiBaseUrl}/api`;
}

// Generates options for POST requests
function postReqOpts(body) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include", // Ensure cookies are sent with every request
  };
}

// Generic POST function
async function API_Post(endpoint, payload) {
  try {
    const response = await fetch(
      `${getServerIP()}/${endpoint}`,
      postReqOpts(payload)
    );
    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(
        typeof data === "string" ? data : data?.error || "Unknown error"
      );
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "API_Post error!");
  }
}

export { API_Post };
