// src/components/ProtectedRoute.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase";

const ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL ||
  "velsaka-tech@gmail.com"
)
  .trim()
  .toLowerCase();

export default function ProtectedRoute({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    console.log(
      "🔍 ProtectedRoute: Checking Firebase authentication..."
    );

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          console.log(
            "🔥 Firebase auth state:",
            currentUser?.email ||
              "NO USER"
          );

          if (!currentUser) {
            setUser(null);
            setLoading(false);
            return;
          }

          const email =
            currentUser.email
              ?.trim()
              .toLowerCase();

          if (
            email !==
            ADMIN_EMAIL
          ) {
            console.log(
              "❌ Unauthorized admin email:",
              email
            );

            setUser(null);
            setLoading(false);
            return;
          }

          console.log(
            "✅ Admin verified:",
            email
          );

          setUser(
            currentUser
          );

          setLoading(false);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-400">
            Checking admin access...
          </p>

        </div>

      </div>
    );
  }

  if (!user) {
    console.log(
      "🚫 ProtectedRoute: Redirecting to login"
    );

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}