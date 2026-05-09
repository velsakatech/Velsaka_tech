import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">

      {/* Header */}
      <Header />

      {/* Content */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Terms & Conditions
          </h1>

          <p className="text-slate-300 mb-6 leading-relaxed">
            By accessing and using the VelSAKA Tech website, you agree to follow these Terms and Conditions.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Use of the website
          </h2>
          <p className="text-slate-400 leading-relaxed">
            You agree to use this website only for lawful purposes and not to engage in any activity that may harm the website or its users.
          </p>

          {/* Section 2 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Intellectual property
          </h2>
          <p className="text-slate-400 leading-relaxed">
            All content, branding, and materials on this website belong to VelSAKA Tech and are protected by applicable copyright laws.
          </p>

          {/* Section 3 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Services
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We provide technology and software-related services. We reserve the right to modify or discontinue any service at any time.
          </p>

          {/* Section 4 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Limitation of liability
          </h2>
          <p className="text-slate-400 leading-relaxed">
            VelSAKA Tech is not responsible for any direct or indirect damages resulting from the use of our website or services.
          </p>

          {/* Section 5 */}
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">
            Changes to terms
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We may update these Terms at any time. Continued use of the website means you accept the updated terms.
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