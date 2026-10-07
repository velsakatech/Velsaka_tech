import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Logo from "../assets/VelSAKA_Logo.jpeg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center w-full px-5 sm:px-8 lg:px-10 pt-20 pb-20 overflow-hidden bg-white">
      {/* =====================================================
          SUBTLE BACKGROUND
      ====================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-violet-50/70 via-indigo-50/40 to-transparent blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          {/* =================================================
              LEFT — TEXT
          ================================================== */}
          <div className="text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
              <span className="text-xs font-semibold text-gray-600 tracking-wide">
                VELSAKA TECH
              </span>
            </div>

            <h1
              className={`font-bold text-gray-950 leading-[1.05] tracking-[-0.03em]
              text-[clamp(2.5rem,5.5vw,4.5rem)]
              transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                products
              </span>{" "}
              that empower people.
            </h1>

            <p
              className={`mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-8 text-gray-600
              transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Next-generation technology solutions designed for enterprise
              excellence. Built for scale, performance, and innovation.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-9
              transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm sm:text-base hover:bg-violet-600 transition-colors duration-300"
              >
                Explore Products
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-800 font-semibold text-sm sm:text-base hover:border-gray-300 hover:bg-gray-50 transition-colors duration-300"
              >
                About Us
              </Link>
            </div>

            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-3 mt-10 pt-8 border-t border-gray-100 text-sm text-gray-600
              transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-violet-600" />
                Enterprise-grade
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-violet-600" />
                Built to scale
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-violet-600" />
                Trusted by founders
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT — LOGO (FULL CIRCLE + HOVER)
          ================================================== */}
          <div className="flex justify-center lg:justify-end">
            <div
              className={`group relative w-[min(85vw,480px)] aspect-square transition-all duration-1000 delay-200 ease-out cursor-pointer ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              {/* Soft halo — brightens on hover */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-violet-100/60 via-indigo-100/40 to-transparent blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70" />

              {/* Gradient ring border (thin, 2px) — spins/glows on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-200 via-indigo-100 to-blue-100 p-[2px] transition-all duration-500 group-hover:from-violet-400 group-hover:via-indigo-300 group-hover:to-blue-300">
                {/* Logo fills the entire inner circle */}
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={Logo}
                    alt="VELSAKA TECH"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Corner accent dots */}
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/40" />
              <div className="absolute bottom-6 left-3 w-2 h-2 rounded-full bg-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;