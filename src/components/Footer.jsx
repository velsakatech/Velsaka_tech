import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/VelSAKA_Logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 w-full border-t border-white/10 py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1 sm:p-1.5 group-hover:shadow-[0_0_12px_rgba(108,99,255,0.3)] transition-all duration-300">
            <img
              alt="VELSAKA TECH Logo"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              src={Logo}
            />
          </div>

          <span className="text-white font-bold text-sm sm:text-base md:text-lg">
            VELSAKA TECH
          </span>
        </div>

        {/* Copyright */}
        <div className="text-slate-400 text-[11px] sm:text-xs md:text-sm">
          © {currentYear} VELSAKA TECH. Empowering innovation.
        </div>

        {/* Links */}
        <div className="flex gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center">

          <Link
            to="/privacy"
            className="text-slate-400 hover:text-white transition-all text-[11px] sm:text-xs md:text-sm"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="text-slate-400 hover:text-white transition-all text-[11px] sm:text-xs md:text-sm"
          >
            Terms
          </Link>

          <Link
            to="/cookies"
            className="text-slate-400 hover:text-white transition-all text-[11px] sm:text-xs md:text-sm"
          >
            Cookies
          </Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;