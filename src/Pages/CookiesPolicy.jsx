import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">

      {/* Header */}
      <Header />

      {/* Content */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Cookies Policy
          </h1>

          <p className="text-slate-300 mb-6 leading-relaxed">
            This website uses cookies to improve user experience, enhance performance,
            and analyze site traffic.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            What are cookies?
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Cookies are small text files stored on your device when you visit a website.
            They help websites remember your actions and preferences.
          </p>

          {/* Section 2 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            How we use cookies
          </h2>

          <ul className="list-disc pl-6 text-slate-400 space-y-2">
            <li>To understand website traffic (analytics tools)</li>
            <li>To improve performance and user experience</li>
            <li>To remember user preferences and settings</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Third-party cookies
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We may use trusted third-party services such as analytics providers
            that may set their own cookies.
          </p>

          {/* Section 4 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Your control
          </h2>
          <p className="text-slate-400 leading-relaxed">
            You can disable or manage cookies anytime through your browser settings.
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