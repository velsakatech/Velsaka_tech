// src/Routes/AppRouter.jsx

import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

// =========================================================
// PUBLIC PAGES
// =========================================================

import Home from "../Pages/HomePage";
import About from "../Pages/AboutPage";
import Services from "../Pages/ServicesPage";
import Contact from "../Pages/ContactPage";
import Products from "../Pages/ProductsPage";
import Pricing from "../Pages/PricingPage";
import NotFound from "../Pages/NotFound";
import UnderDevelopment from "../Pages/UnderDevelopment";
import CookiesPolicy from "../Pages/CookiesPolicy";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsPage from "../Pages/Terms&ConditionsPage";

// =========================================================
// ADMIN
// =========================================================

import AdminLogin from "../Pages/AdminLogin";
import AdminPage from "../Pages/AdminPage";

// =========================================================
// ROUTER
// =========================================================

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cookies"
          element={<CookiesPolicy />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<TermsPage />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/careers"
          element={<UnderDevelopment />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        {/* ADMIN LOGIN */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        {/* 404 */}

        <Route
          path="/404"
          element={<NotFound />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/404"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;