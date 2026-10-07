// src/api/client.js

import { auth } from "../firebase";

// =========================================================
// CONFIG
// =========================================================

const RAW_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Remove trailing slashes only
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

console.log("🌐 API BASE URL:", BASE_URL);

// =========================================================
// API CLIENT
// =========================================================

export const api = async (path, options = {}) => {
  // Normalize: ensure leading slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Caller passes full path including /api
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
    }
  }

  // =======================================================
  // HEADERS
  // =======================================================

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
    ...(firebaseToken ? { Authorization: `Bearer ${firebaseToken}` } : {}),
  };

  // =======================================================
  // FETCH
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
      const text = await response.text();
      console.error("❌ Non-JSON API response:", text.substring(0, 500));
      data = {
        success: false,
        message: text || `HTTP ${response.status}`,
      };
    }

    if (!response.ok) {
      if (response.status === 401) {
        console.error("❌ API Unauthorized");
      }
      throw new Error(data?.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", {
      url,
      path,
      message: error.message,
    });

    if (error.message === "Failed to fetch") {
      throw new Error(
        `Cannot connect to server. Please check backend: ${BASE_URL}`
      );
    }

    throw error;
  }
};