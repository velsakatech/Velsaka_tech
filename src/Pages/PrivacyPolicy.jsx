import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">

      {/* Header */}
      <Header />

      {/* Content */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Privacy Policy
          </h1>

          <p className="text-slate-300 mb-6 leading-relaxed">
            This Privacy Policy explains how VelSAKA Tech collects, uses, and protects your information when you use our website.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Information we collect
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We may collect basic information such as usage data, browser type, and device details to improve our services.
          </p>

          {/* Section 2 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            How we use your information
          </h2>
          <ul className="list-disc pl-6 text-slate-400 space-y-2">
            <li>To improve website performance and user experience</li>
            <li>To analyze traffic and usage patterns</li>
            <li>To enhance security and prevent misuse</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Data protection
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We take reasonable measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </p>

          {/* Section 4 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Third-party services
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We may use trusted third-party services such as analytics tools, which may collect limited information as per their policies.
          </p>

          {/* Section 5 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Your rights
          </h2>
          <p className="text-slate-400 leading-relaxed">
            You can request access, modification, or deletion of your data by contacting us.
          </p>

          {/* Footer note */}
          <p className="mt-10 text-sm text-slate-500">
            Last updated: May 2026
          </p>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}