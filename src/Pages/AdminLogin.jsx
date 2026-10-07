// src/Pages/AdminLogin.jsx

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";


// =========================================================
// ADMIN CONFIG
// =========================================================

const ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL ||
  "velsakatech@gmail.com"
)
  .trim()
  .toLowerCase();


// =========================================================
// FIREBASE ERROR
// =========================================================

const getFirebaseErrorMessage = (error) => {
  switch (error?.code) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/invalid-login-credentials":
      return "Incorrect email or password.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    default:
      return (
        error?.message ||
        "Unable to login. Please try again."
      );
  }
};


// =========================================================
// ADMIN LOGIN
// =========================================================

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");


  // =======================================================
  // LOGIN
  // =======================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    // Clear old message
    setMessage("");

    const cleanEmail = email
      .trim()
      .toLowerCase();


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!cleanEmail) {
      setMessageType("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setMessageType("error");
      setMessage("Please enter your password.");
      return;
    }


    // -----------------------------------------------------
    // ADMIN EMAIL CHECK
    // -----------------------------------------------------

    if (cleanEmail !== ADMIN_EMAIL) {
      setMessageType("error");

      setMessage(
        "Access denied. This account is not authorized as an administrator."
      );

      return;
    }


    // -----------------------------------------------------
    // START LOGIN
    // -----------------------------------------------------

    setLoading(true);

    try {
      console.log("🔐 Starting Firebase login...");
      console.log("📧 Email:", cleanEmail);

      const result =
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );


      // ---------------------------------------------------
      // CHECK FIREBASE USER
      // ---------------------------------------------------

      if (!result?.user) {
        throw new Error(
          "Firebase login completed but user information was not returned."
        );
      }

      console.log(
        "✅ Firebase login successful"
      );

      console.log(
        "👤 Firebase user:",
        result.user.email
      );


      // ---------------------------------------------------
      // DOUBLE CHECK EMAIL
      // ---------------------------------------------------

      const loggedInEmail =
        result.user.email
          ?.trim()
          .toLowerCase();

      if (
        loggedInEmail !==
        ADMIN_EMAIL
      ) {
        await signOut(auth);

        setMessageType("error");

        setMessage(
          "Access denied. This Firebase account is not the authorized admin account."
        );

        setLoading(false);

        return;
      }


      // ---------------------------------------------------
      // SUCCESS MESSAGE
      // ---------------------------------------------------

      setMessageType("success");

      setMessage(
        "Login successful! Redirecting to Admin Dashboard..."
      );


      console.log(
        "✅ Admin authenticated"
      );

      console.log(
        "➡️ Redirecting to /admin/dashboard..."
      );


      // ---------------------------------------------------
      // REDIRECT
      // ---------------------------------------------------

      setTimeout(() => {
        console.log(
          "🚀 Navigating to dashboard..."
        );

        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );
      }, 1500);


    } catch (error) {

      console.error(
        "❌ Firebase Login Error:",
        error
      );

      setMessageType("error");

      setMessage(
        getFirebaseErrorMessage(error)
      );

      setLoading(false);
    }
  };


  // =======================================================
  // UI
  // =======================================================

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center">

      <div className="w-full max-w-md">

        {/* ================================================= */}
        {/* CARD */}
        {/* ================================================= */}

        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="px-8 pt-8 pb-6 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950">

              <span className="text-xl font-bold text-white">
                VT
              </span>

            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              VELSAKA TECH
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Administrator Login
            </p>

          </div>


          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <div className="px-8 pb-8">

            {/* ================================================= */}
            {/* MESSAGE */}
            {/* ================================================= */}

            {message && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
                  messageType === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >

                <div className="flex items-start gap-3">

                  <span className="text-base">

                    {messageType === "success"
                      ? "✓"
                      : "!"}

                  </span>

                  <span>
                    {message}
                  </span>

                </div>

              </div>
            )}


            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* ================================================= */}
              {/* EMAIL */}
              {/* ================================================= */}

              <div>

                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="velsakatech@gmail.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

              </div>


              {/* ================================================= */}
              {/* PASSWORD */}
              {/* ================================================= */}

              <div>

                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                />

              </div>


              {/* ================================================= */}
              {/* LOGIN BUTTON */}
              {/* ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <span className="flex items-center justify-center gap-2">

                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                    Signing in...

                  </span>
                ) : (
                  "Sign in"
                )}

              </button>

            </form>


            {/* ================================================= */}
            {/* SECURITY INFO */}
            {/* ================================================= */}

            <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-center">

              <p className="text-xs text-slate-500">
                Authorized administrator access only
              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} VELSAKA TECH. All rights reserved.
        </p>

      </div>

    </div>
  );
}