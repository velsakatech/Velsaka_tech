import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import VelSAKA_LOGO from "../assets/VelSAKA_Logo.jpeg";
import { LogOut, User, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Careers", path: "/careers" },
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export default function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  // Prevent scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  /**
   * =========================
   * 🔷 MAIN HEADER (NON-ADMIN) – LIGHT THEME, COMPACT
   * =========================
   */
  if (!isAdminPage) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#f9fafb]/95 backdrop-blur-md border-b border-[#e5e7eb]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              
              {/* Mobile & Tablet Layout */}
              <div className="lg:hidden flex items-center justify-between h-12 sm:h-14">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
                  <img
                    src={VelSAKA_LOGO}
                    alt="VELSAKA TECH Logo"
                    className="h-6 sm:h-7 w-auto object-contain"
                  />
                  <span className="text-black font-bold text-xs sm:text-sm tracking-wide">
                    VELSAKA TECH
                  </span>
                </NavLink>

                {/* Menu Button */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-0 hover:opacity-80 transition-all duration-200 active:scale-95 bg-transparent border-0 shadow-none"
                  aria-label="Toggle menu"
                >
                  {menuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  )}
                </button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
                  <img
                    src={VelSAKA_LOGO}
                    alt="VELSAKA TECH Logo"
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-black font-bold text-base tracking-wide">
                    VELSAKA TECH
                  </span>
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="flex items-center gap-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                          isActive
                            ? "text-indigo-600"
                            : "text-black hover:text-indigo-600"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>

                {/* CTA Button */}
                <NavLink
                  to="/contact"
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-slate-700 hover:bg-slate-800 transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Get in Touch
                </NavLink>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
            />

            {/* Sidebar Menu */}
            <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#f9fafb] z-50 lg:hidden shadow-2xl border-l border-[#e5e7eb] transform transition-transform duration-300 translate-x-0 overflow-y-auto">
              {/* Menu Header */}
              <div className="sticky top-0 flex justify-between items-center p-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
                <div className="flex items-center gap-2">
                  <img src={VelSAKA_LOGO} className="h-6 w-auto" alt="Logo" />
                  <span className="text-black font-semibold text-sm">
                    VELSAKA TECH
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1 hover:bg-[#e5e7eb] rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="text-black w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-100 text-indigo-600 border-l-2 border-indigo-500"
                          : "text-black hover:bg-[#e5e7eb] hover:text-indigo-600"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* Divider */}
                <div className="h-px bg-[#e5e7eb] my-2"></div>

                {/* CTA Button in Menu */}
                <NavLink
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 text-center py-3 rounded-lg text-white font-semibold text-base bg-slate-700 hover:bg-slate-800 transition-all shadow-sm active:scale-95"
                >
                  Get in Touch
                </NavLink>
              </div>
            </div>
          </>
        )}

        {/* Spacer for fixed header */}
        <div className="h-12 sm:h-14 lg:h-16" />
      </>
    );
  }

  /**
   * =========================
   * 🔷 ADMIN HEADER – LIGHT THEME, COMPACT
   * =========================
   */
  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#f9fafb]/95 backdrop-blur-md border-b border-[#e5e7eb]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Mobile & Tablet Admin Header */}
            <div className="lg:hidden flex items-center justify-between h-12 sm:h-14">
              <NavLink to="/admin/dashboard" className="flex items-center gap-2">
                <img src={VelSAKA_LOGO} className="h-6 sm:h-7 w-auto" alt="Logo" />
                <span className="text-black font-semibold text-xs sm:text-sm">
                  VELSAKA TECH
                </span>
              </NavLink>

              <span className="text-indigo-600 font-semibold text-sm">
                Admin
              </span>

              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-red-50 border border-red-300 rounded-lg text-red-600 active:scale-95"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>

            {/* Desktop Admin Header */}
            <div className="hidden lg:flex items-center justify-between h-16">
              <NavLink to="/admin/dashboard" className="flex items-center gap-3">
                <img src={VelSAKA_LOGO} className="h-8 w-auto" alt="Logo" />
                <span className="text-black font-semibold text-base">
                  VELSAKA TECH
                </span>
              </NavLink>

              <span className="text-indigo-600 font-semibold text-lg">
                Admin Panel
              </span>

              <div className="flex items-center gap-4">
                {user && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200">
                    <User className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-black">
                      {user.name || user.email}
                    </span>
                  </div>
                )}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 border border-red-300 rounded-lg text-red-600 hover:text-red-700 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-12 sm:h-14 lg:h-16" />
    </>
  );
}