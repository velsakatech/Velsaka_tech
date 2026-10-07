// src/Routes/ProtectedRoute.jsx

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL)
  .trim()
  .toLowerCase();

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase Auth User:", currentUser);

      if (
        currentUser &&
        currentUser.email?.trim().toLowerCase() === ADMIN_EMAIL
      ) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Wait until Firebase finishes checking the session
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-purple-500" />

          <p className="text-sm text-slate-300">Checking admin access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated / not admin
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Authenticated admin
  return children;
};

export default ProtectedRoute;
