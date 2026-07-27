// TermsPage.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            By accessing and using the VelSAKA Tech website, you agree to follow
            these Terms and Conditions.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Use of the website
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to use this website only for lawful purposes and not to
            engage in any activity that may harm the website or its users.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Intellectual property
          </h2>
          <p className="text-gray-600 leading-relaxed">
            All content, branding, and materials on this website belong to
            VelSAKA Tech and are protected by applicable copyright laws.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Services
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We provide technology and software-related services. We reserve the
            right to modify or discontinue any service at any time.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Limitation of liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            VelSAKA Tech is not responsible for any direct or indirect damages
            resulting from the use of our website or services.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Changes to terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms at any time. Continued use of the website
            means you accept the updated terms.
          </p>

          <p className="mt-10 text-sm text-gray-400">
            Last updated: {today}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}