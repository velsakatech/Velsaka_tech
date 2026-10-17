
import { auth } from "../firebase";

// =========================================================
// CONFIG
// =========================================================

const RAW_BASE_URL = import.meta.env.VITE_API_URL;

if (!RAW_BASE_URL || !RAW_BASE_URL.trim()) {
  throw new Error(
    "VITE_API_URL is missing. Add it in your deployment environment variables."
  );
}

// Remove trailing slashes
const BASE_URL = RAW_BASE_URL.trim().replace(/\/+$/, "");

console.log("🌐 API BASE URL:", BASE_URL);

// =========================================================
// API CLIENT
// =========================================================

export const api = async (path, options = {}) => {
  if (typeof path !== "string" || !path.trim()) {
    throw new Error("API path must be a non-empty string.");
  }

  // Ensure leading slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Caller passes the full path, including /api
  const url = `${BASE_URL}${normalizedPath}`;

  console.log("➡️ API Request:", url);

  // =======================================================
  // FIREBASE TOKEN
  // =======================================================

  let firebaseToken = null;
  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      firebaseToken = await currentUser.getIdToken();
      console.log("🔐 Firebase ID token available");
    } catch (error) {
      console.error("❌ Firebase token error:", error);
      throw new Error("Unable to retrieve your authentication token.");
    }
  }

  // =======================================================
  // HEADERS
  // =======================================================

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
    ...(firebaseToken
      ? { Authorization: `Bearer ${firebaseToken}` }
      : {}),
  };

  // =======================================================
  // FETCH & ERROR HANDLING
  // =======================================================

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const responseText = await response.text();

      console.error(
        "❌ Non-JSON API response:",
        responseText.substring(0, 500)
      );

      data = {
        success: false,
        message: responseText || `HTTP ${response.status}`,
      };
    }

    if (!response.ok) {
      if (response.status === 401) {
        console.error("❌ API Unauthorized");
      }

      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", {
      url,
      path,
      message: error.message,
    });

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        `Cannot connect to the server. Check your backend URL and server status: ${BASE_URL}`
      );
    }

    throw error;
  }
};
