import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/VelSAKA_Logo.jpeg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center w-full px-4 sm:px-8 lg:px-9 pt-18 pb-24 overflow-hidden bg-[#f9fafb]">
      {/* Floating background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-slate-200/40 rounded-full mix-blend-multiply animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-slate-300/30 rounded-full mix-blend-multiply animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-slate-100/50 rounded-full mix-blend-multiply animate-float-slow" />
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
                className="bg-slate-600 
                px-6 py-3 rounded-lg font-semibold text-white
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

          {/* RIGHT - Circular Logo Area with glow */}
          <div className="flex justify-center">
            <div
              className={`relative w-[min(80vw,600px)] aspect-square transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-slate-200/40 blur-3xl animate-pulse-ring" />

              <div className="relative w-full h-full rounded-full 
                flex items-center justify-center
                border border-[#e5e7eb] bg-white/70 shadow-sm group">
                {/* Rotating subtle glow ring */}
                <div className="absolute inset-0 rounded-full border border-slate-300/50 animate-rotate-glow" />

                {/* Inner Circle */}
                <div className="w-[80%] h-[80%] rounded-full flex items-center justify-center 
                  border border-[#f3f4f6] bg-white">
                  <div className="p-2 rounded-full bg-white">
                    <img
                      src={Logo}
                      alt="VELSAKA TECH Logo"
                      className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 object-contain rounded-full 
                        hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
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
        @keyframes pulse-ring {
          0% { opacity: 0.5; transform: scale(0.98); }
          50% { opacity: 0.8; transform: scale(1.02); }
          100% { opacity: 0.5; transform: scale(0.98); }
        }
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        .animate-rotate-glow {
          animation: rotate-glow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;