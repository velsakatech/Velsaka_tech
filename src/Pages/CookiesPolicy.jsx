// CookiesPolicy.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CookiesPolicy() {
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
            Cookies Policy
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            This website uses cookies to improve user experience, enhance
            performance, and analyze site traffic.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            What are cookies?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cookies are small text files stored on your device when you visit a
            website. They help websites remember your actions and preferences.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            How we use cookies
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>To understand website traffic (analytics tools)</li>
            <li>To improve performance and user experience</li>
            <li>To remember user preferences and settings</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Third-party cookies
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may use trusted third-party services such as analytics providers
            that may set their own cookies.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            Your control
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You can disable or manage cookies anytime through your browser
            settings.
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