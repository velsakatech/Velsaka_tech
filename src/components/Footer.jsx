import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/VelSAKA_Logo.jpeg";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openLinkedIn = () =>
    window.open("https://www.linkedin.com/in/velsakatech2026/", "_blank");
  const openWhatsApp = () => window.open("https://wa.me/917092085864", "_blank");
  const openGitHub = () => window.open("https://github.com/velsakatech", "_blank");
  const openInstagram = () =>
    window.open("https://www.instagram.com/velsakatech/", "_blank");
  const openEmail = () => (window.location.href = "mailto:velsakatech@gmail.com");
  const openMap = () =>
    window.open(
      "https://www.google.com/maps/place/Methalodai,+Tamil+Nadu+623532/@9.2815489,78.8639504,17z",
      "_blank"
    );

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* =============================================
              COLUMN 1 — BRAND
          ============================================== */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-1.5 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all duration-300">
                <img
                  alt="VELSAKA TECH Logo"
                  className="h-8 w-auto object-contain"
                  src={Logo}
                />
              </div>
              <span className="text-gray-900 font-bold text-lg">
                VELSAKA TECH
              </span>
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Building modern digital products, AI solutions, and
              high-performance web applications that empower people and
              businesses.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 flex-wrap">
              <button
                onClick={openLinkedIn}
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-[#0A66C2] hover:bg-blue-50 hover:shadow-[0_0_12px_rgba(10,102,194,0.2)] transition-all group"
              >
                <LinkedInIcon
                  className="text-gray-500 group-hover:text-[#0A66C2] transition-colors"
                  style={{ fontSize: "18px" }}
                />
              </button>

              <button
                onClick={openGitHub}
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-gray-800 hover:bg-gray-100 hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] transition-all group"
              >
                <GitHubIcon
                  className="text-gray-500 group-hover:text-gray-900 transition-colors"
                  style={{ fontSize: "18px" }}
                />
              </button>

              <button
                onClick={openWhatsApp}
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-green-400 hover:bg-green-50 hover:shadow-[0_0_12px_rgba(37,211,102,0.2)] transition-all group"
              >
                <WhatsAppIcon
                  className="text-gray-500 group-hover:text-green-500 transition-colors"
                  style={{ fontSize: "18px" }}
                />
              </button>

              <button
                onClick={openInstagram}
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-pink-400 hover:bg-pink-50 hover:shadow-[0_0_12px_rgba(236,72,153,0.2)] transition-all group"
              >
                <InstagramIcon
                  className="text-gray-500 group-hover:text-pink-600 transition-colors"
                  style={{ fontSize: "18px" }}
                />
              </button>

              <button
                onClick={openEmail}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-red-400 hover:bg-red-50 hover:shadow-[0_0_12px_rgba(220,38,38,0.2)] transition-all group"
              >
                <EmailIcon
                  className="text-gray-500 group-hover:text-red-600 transition-colors"
                  style={{ fontSize: "18px" }}
                />
              </button>
            </div>
          </div>

          {/* =============================================
              COLUMN 2 — COMPANY
          ============================================== */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/products">Products</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* =============================================
              COLUMN 3 — SERVICES
          ============================================== */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/contact">Web Development</FooterLink>
              <FooterLink to="/contact">App Development</FooterLink>
              <FooterLink to="/contact">AI Chatbot</FooterLink>
              <FooterLink to="/contact">ATS System</FooterLink>
              <FooterLink to="/contact">UI/UX Design</FooterLink>
              <FooterLink to="/contact">Cloud Solutions</FooterLink>
            </ul>
          </div>

          {/* =============================================
              COLUMN 4 — CONTACT
          ============================================== */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={openEmail}
                  className="flex items-start gap-3 text-left group w-full"
                >
                  <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-indigo-50 rounded-lg border border-indigo-100 group-hover:bg-indigo-100 transition-all">
                    <EmailIcon
                      className="text-indigo-600"
                      style={{ fontSize: "16px" }}
                    />
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors pt-1 break-all">
                    velsakatech@gmail.com
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={openWhatsApp}
                  className="flex items-start gap-3 text-left group w-full"
                >
                  <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-indigo-50 rounded-lg border border-indigo-100 group-hover:bg-indigo-100 transition-all">
                    <PhoneIcon
                      className="text-indigo-600"
                      style={{ fontSize: "16px" }}
                    />
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors pt-1">
                    +91 70920 85864
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={openMap}
                  className="flex items-start gap-3 text-left group w-full"
                >
                  <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-indigo-50 rounded-lg border border-indigo-100 group-hover:bg-indigo-100 transition-all">
                    <LocationOnIcon
                      className="text-indigo-600"
                      style={{ fontSize: "16px" }}
                    />
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors pt-1">
                    Methalodai, Ramanathapuram,
                    <br />
                    Tamil Nadu, India
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © {currentYear} VELSAKA TECH. All rights reserved.
            </p>

            <div className="flex gap-5 sm:gap-6 flex-wrap justify-center">
              <Link
                to="/privacy"
                className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* =========================================================
   FOOTER LINK HELPER
========================================================= */

const FooterLink = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-gray-600 hover:text-indigo-600 transition-colors inline-block hover:translate-x-0.5 transform duration-200"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;