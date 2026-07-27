import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/VelSAKA_Logo.jpeg";

const PricingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time through your dashboard. The changes will take effect immediately and will be prorated on your next billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a 14-day free trial for our Pro plan, no credit card required. Experience all premium features before making a commitment."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and cryptocurrency for annual enterprise contracts."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes! We have special pricing for educational institutions and registered non-profit organizations. Please contact our support team."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Header />

      <main>
        {/* Hero Section with Big Logo */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto text-center">
            {/* Rounded Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden">
                <img
                  src={Logo}
                  alt="VELSAKA TECH Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <span className="text-xs sm:text-sm tracking-widest text-indigo-600 mb-3 sm:mb-4 block font-semibold">
              PRICING
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 font-['Space_Grotesk']">
              Simple & Transparent Pricing
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Affordable plans for startups, businesses, and creators. Scale your cosmic vision with precision engineering.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Basic Plan */}
            <div className="glass-card p-6 lg:p-8 rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-200 bg-white/80 backdrop-blur-sm">
              <div className="mb-6">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Basic</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 font-['Space_Grotesk']">
                  ₹4,999<span className="text-lg font-normal text-gray-500">/mo</span>
                </h2>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">check_circle</span>
                  Standard Performance
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">check_circle</span>
                  5 Project Capacity
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">check_circle</span>
                  Email Support
                </li>
                <li className="flex items-center gap-3 text-gray-400 opacity-60">
                  <span className="material-symbols-outlined text-xl">cancel</span>
                  Custom Domains
                </li>
              </ul>

              <button
                onClick={() => navigate("/contact")}
                className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-white/80 hover:border-indigo-300 transition-all duration-300 font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan (Most Popular) */}
            <div className="glass-card p-6 lg:p-8 rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col border-2 border-indigo-400 bg-white/80 backdrop-blur-sm relative md:scale-105 z-10">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-1 rounded-bl-xl text-xs font-semibold shadow-md shadow-indigo-500/30">
                Most Popular
              </div>

              <div className="mb-6">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Pro</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 font-['Space_Grotesk']">
                  ₹9,999<span className="text-lg font-normal text-gray-500">/mo</span>
                </h2>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="material-symbols-outlined text-indigo-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Enhanced Throughput
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="material-symbols-outlined text-indigo-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  20 Project Capacity
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="material-symbols-outlined text-indigo-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Priority Support (24h)
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="material-symbols-outlined text-indigo-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Custom Domains
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="material-symbols-outlined text-indigo-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Advanced Analytics
                </li>
              </ul>

              <button
                onClick={() => navigate("/contact")}
                className="w-full py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(108,63,255,0.4)] transition-all duration-300"
              >
                Go Pro
              </button>
            </div>

            {/* Premium Plan */}
            <div className="glass-card p-6 lg:p-8 rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-200 bg-white/80 backdrop-blur-sm">
              <div className="mb-6">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Premium</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 font-['Space_Grotesk']">
                  ₹29,999+<span className="text-lg font-normal text-gray-500">/mo</span>
                </h2>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">check_circle</span>
                  Unlimited Scale
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">check_circle</span>
                  Dedicated Infrastructure
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">check_circle</span>
                  White-glove Onboarding
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span className="material-symbols-outlined text-indigo-500 text-xl">check_circle</span>
                  SSO & Enterprise Security
                </li>
              </ul>

              <button
                onClick={() => navigate("/contact")}
                className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-white/80 hover:border-indigo-300 transition-all duration-300 font-medium"
              >
                Contact Enterprise
              </button>
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center font-['Space_Grotesk']">
            Enhance Your Experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "trending_up", title: "SEO Optimization", desc: "Boost your organic cosmic reach." },
              { icon: "build", title: "Maintenance", desc: "24/7 system health checks." },
              { icon: "cloud_done", title: "Hosting Setup", desc: "Zero-latency global deployment." },
              { icon: "brush", title: "UI Redesign", desc: "Next-gen aesthetic overhaul." },
            ].map((addon, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300">
                <span className="material-symbols-outlined text-indigo-500 text-3xl mb-3">{addon.icon}</span>
                <h4 className="text-lg font-bold text-gray-800 mb-1">{addon.title}</h4>
                <p className="text-gray-600 text-sm">{addon.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 font-['Space_Grotesk']">
            Feature Comparison
          </h3>
          <div className="glass-card rounded-xl overflow-hidden border border-gray-200 bg-white/80 backdrop-blur-sm overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="p-4 lg:p-6 font-semibold text-indigo-600">Feature</th>
                  <th className="p-4 lg:p-6 font-semibold text-gray-800">Basic</th>
                  <th className="p-4 lg:p-6 font-semibold text-gray-800">Pro</th>
                  <th className="p-4 lg:p-6 font-semibold text-gray-800">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 lg:p-6 text-gray-700">API Requests / Day</td>
                  <td className="p-4 lg:p-6 text-gray-500">10k</td>
                  <td className="p-4 lg:p-6 text-gray-800 font-medium">100k</td>
                  <td className="p-4 lg:p-6 text-indigo-600 font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 lg:p-6 text-gray-700">Storage Capacity</td>
                  <td className="p-4 lg:p-6 text-gray-500">5GB</td>
                  <td className="p-4 lg:p-6 text-gray-800 font-medium">50GB</td>
                  <td className="p-4 lg:p-6 text-indigo-600 font-bold">1TB+</td>
                </tr>
                <tr>
                  <td className="p-4 lg:p-6 text-gray-700">Collaborators</td>
                  <td className="p-4 lg:p-6 text-gray-500">2</td>
                  <td className="p-4 lg:p-6 text-gray-800 font-medium">10</td>
                  <td className="p-4 lg:p-6 text-indigo-600 font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 lg:p-6 text-gray-700">Custom Reports</td>
                  <td className="p-4 lg:p-6 text-gray-400">
                    <span className="material-symbols-outlined text-xl opacity-50">close</span>
                  </td>
                  <td className="p-4 lg:p-6 text-indigo-500">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </td>
                  <td className="p-4 lg:p-6 text-indigo-500">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 lg:p-6 text-gray-700">Dedicated IP</td>
                  <td className="p-4 lg:p-6 text-gray-400">
                    <span className="material-symbols-outlined text-xl opacity-50">close</span>
                  </td>
                  <td className="p-4 lg:p-6 text-gray-400">
                    <span className="material-symbols-outlined text-xl opacity-50">close</span>
                  </td>
                  <td className="p-4 lg:p-6 text-indigo-500">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center font-['Space_Grotesk']">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="glass-card rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden"
                open={idx === openFaq}
                onClick={() => setOpenFaq(idx === openFaq ? -1 : idx)}
              >
                <summary className="flex justify-between items-center p-4 lg:p-6 cursor-pointer list-none">
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <span className="material-symbols-outlined text-gray-500 transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="px-4 lg:px-6 pb-4 lg:pb-6 text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-['Space_Grotesk']">
              Not sure which plan fits your project?
            </h3>
            <p className="text-gray-600 mb-8 text-base sm:text-lg max-w-xl mx-auto">
              Our consultants are ready to help you map out the perfect infrastructure for your unique cosmic scale needs.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white px-8 sm:px-10 py-3 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(108,63,255,0.4)] transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
            >
              Contact Us
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;