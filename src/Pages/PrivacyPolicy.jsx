import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            This Privacy Policy explains how VelSAKA Tech collects, uses, and protects your information when you use our website.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            Information we collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may collect basic information such as usage data, browser type, and device details to improve our services.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            How we use your information
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>To improve website performance and user experience</li>
            <li>To analyze traffic and usage patterns</li>
            <li>To enhance security and prevent misuse</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            Data protection
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We take reasonable measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            Third-party services
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may use trusted third-party services such as analytics tools, which may collect limited information as per their policies.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            Your rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You can request access, modification, or deletion of your data by contacting us.
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