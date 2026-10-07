import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/VelSAKA_Logo.jpeg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center w-full px-4 sm:px-8 lg:px-9 pt-18 pb-24 overflow-hidden bg-[#f9fafb]">
      {/* Background floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-violet-300/40 to-fuchsia-300/40 rounded-full mix-blend-multiply animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-cyan-300/30 to-blue-400/30 rounded-full mix-blend-multiply animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-amber-200/40 to-rose-300/40 rounded-full mix-blend-multiply animate-float-slow" />
        <div className="absolute top-10 right-1/4 w-20 h-20 bg-gradient-to-bl from-emerald-300/30 to-teal-400/30 rounded-full mix-blend-multiply animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-tr from-pink-300/40 to-purple-400/30 rounded-full mix-blend-multiply animate-float" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT TEXT */}
          <div className="text-center lg:text-left space-y-6">
            <h1
              className={`font-bold text-black leading-tight 
              text-[clamp(2.5rem,6vw,5rem)] font-['Space_Grotesk']
              transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Building{" "}
              <span className="text-slate-500">Products</span> That Empower
              People
            </h1>

            <p
              className={`text-black max-w-xl mx-auto lg:mx-0
              text-[clamp(0.95rem,1.2vw,1.2rem)] leading-relaxed
              transition-all duration-700 delay-200 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Next-generation technology solutions designed for enterprise
              excellence. Built for scale, performance, and innovation.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start
              transition-all duration-700 delay-400 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                to="/products"
                className="bg-slate-600 px-6 py-3 rounded-lg font-semibold text-white
                hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                Our Products
              </Link>
              <Link
                to="/about"
                className="border border-[#d1d5db] px-6 py-3 rounded-lg 
                text-black hover:bg-[#f3f4f6] transition-all duration-300 hover:-translate-y-1"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* RIGHT – Logo area with hover effects */}
          <div className="flex justify-center">
            <div
              className={`relative w-[min(80vw,700px)] aspect-square transition-all duration-1000 ease-out group ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              {/* 1. Breathing rainbow glow – intensifies on hover */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/30 to-cyan-400/40 blur-3xl 
                animate-breathe-glow transition-all duration-500 
                group-hover:scale-110 group-hover:opacity-100 group-hover:blur-2xl" 
              />

              {/* 2. Rotating dashed ring – spins faster on hover */}
              <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-transparent 
                animate-spin-slow transition-all duration-300
                group-hover:animate-spin-fast"
                style={{
                  background: "conic-gradient(from 0deg, #a78bfa, #f472b6, #fbbf24, #34d399, #60a5fa, #a78bfa)",
                  WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))",
                }}
              />

              {/* 3. Main circle container */}
              <div className="relative w-full h-full rounded-full flex items-center justify-center border border-[#e5e7eb] bg-white/70 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                {/* Inner rotating ring */}
                <div className="absolute inset-0 rounded-full border border-slate-300/50 animate-rotate-glow" />

                {/* 4. Floating colorful particles – speed up on hover */}
                {[
                  { color: "bg-violet-500", pos: "top-0 left-1/4", delay: "0s" },
                  { color: "bg-fuchsia-500", pos: "top-1/4 right-0", delay: "1.5s" },
                  { color: "bg-cyan-400", pos: "bottom-0 right-1/4", delay: "3s" },
                  { color: "bg-amber-400", pos: "bottom-1/4 left-0", delay: "4.5s" },
                  { color: "bg-emerald-400", pos: "top-1/3 -left-2", delay: "2s" },
                  { color: "bg-blue-500", pos: "-bottom-2 right-1/3", delay: "5s" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className={`absolute ${p.pos} w-4 h-4 ${p.color} rounded-full shadow-lg 
                      animate-particle-float group-hover:animate-particle-float-fast`}
                    style={{ animationDelay: p.delay }}
                  />
                ))}

                {/* Inner Circle with Logo */}
                <div className="w-[85%] h-[85%] rounded-full flex items-center justify-center border border-[#f3f4f6] bg-white">
                  <div className="p-2 rounded-full bg-white">
                    <img
                      src={Logo}
                      alt="VELSAKA TECH Logo"
                      className="w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 object-contain rounded-full 
                        transition-all duration-500 ease-out
                        group-hover:brightness-125 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.9)] group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Background floats */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }

        /* Breathing rainbow glow – normal */
        @keyframes breathe-glow {
          0% { opacity: 0.6; filter: hue-rotate(0deg); transform: scale(0.95); }
          33% { opacity: 1; filter: hue-rotate(30deg); transform: scale(1.05); }
          66% { opacity: 0.8; filter: hue-rotate(-30deg); transform: scale(0.98); }
          100% { opacity: 0.6; filter: hue-rotate(0deg); transform: scale(0.95); }
        }

        /* Slow spin (default) */
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Fast spin (on hover) */
        @keyframes spin-fast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Inner glow ring */
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Floating particles – normal pace */
        @keyframes particle-float {
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          25% { transform: translateY(-12px) scale(1.2); opacity: 1; }
          50% { transform: translateY(0) scale(1); opacity: 0.8; }
          75% { transform: translateY(8px) scale(0.9); opacity: 0.7; }
          100% { transform: translateY(0) scale(1); opacity: 0.9; }
        }

        /* Floating particles – faster & bouncier on hover */
        @keyframes particle-float-fast {
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          25% { transform: translateY(-18px) scale(1.3); opacity: 1; }
          50% { transform: translateY(0) scale(1); opacity: 0.85; }
          75% { transform: translateY(10px) scale(0.85); opacity: 0.6; }
          100% { transform: translateY(0) scale(1); opacity: 0.9; }
        }

        /* Utility classes */
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-breathe-glow { animation: breathe-glow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-spin-fast { animation: spin-fast 4s linear infinite; }
        .animate-rotate-glow { animation: rotate-glow 20s linear infinite; }
        .animate-particle-float { animation: particle-float 6s ease-in-out infinite; }
        .animate-particle-float-fast { animation: particle-float-fast 2.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;