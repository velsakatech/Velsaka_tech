import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../assets/VelSAKA_Logo.jpeg";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { api } from "../api/client.js";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "Web Development",
    description: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const submitTimeoutRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showAlert = (type, title, message) => {
    setAlert({
      show: true,
      type,
      title,
      message,
    });
  };

  const closeAlert = () => {
    setAlert({ show: false, type: "", title: "", message: "" });
    if (alert.type === "success") {
      navigate("/");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      service: "Web Development",
      description: "",
    });
  };

  const saveToLocalStorage = (data) => {
    const contactHistory = JSON.parse(
      localStorage.getItem("contactHistory") || "[]",
    );
    contactHistory.push({
      ...formData,
      submittedAt: new Date().toISOString(),
      status: "success",
      responseId: data.id || data._id,
    });
    if (contactHistory.length > 50) contactHistory.shift();
    localStorage.setItem("contactHistory", JSON.stringify(contactHistory));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      showAlert(
        "error",
        "Please Wait",
        "You have already submitted a message. Please wait 10 seconds before sending another.",
      );
      return;
    }

    if (!formData.fullName || !formData.email || !formData.description) {
      showAlert(
        "error",
        "Missing Information",
        "Please fill in all required fields.",
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showAlert(
        "error",
        "Invalid Email",
        "Please enter a valid email address.",
      );
      return;
    }

    if (formData.phone && formData.phone.trim() !== "") {
      const phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        showAlert(
          "error",
          "Invalid Phone",
          "Please enter a valid phone number.",
        );
        return;
      }
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }

    try {
      const data = await api("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone?.trim() || "",
          service: formData.service,
          message: formData.description.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (data.success) {
        saveToLocalStorage(data);
        showAlert(
          "success",
          "Message Sent Successfully",
          data.message ||
            "Thank you for reaching out! Our team will contact you within 24 hours.",
        );
        resetForm();
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);

      if (
        error.message?.includes("Failed to fetch") ||
        error.message?.includes("Cannot connect")
      ) {
        const offlineData = {
          ...formData,
          submittedAt: new Date().toISOString(),
          status: "pending",
          id: `offline_${Date.now()}`,
        };

        const pendingSubmissions = JSON.parse(
          localStorage.getItem("pendingContactSubmissions") || "[]",
        );
        pendingSubmissions.push(offlineData);
        if (pendingSubmissions.length > 20) pendingSubmissions.shift();
        localStorage.setItem(
          "pendingContactSubmissions",
          JSON.stringify(pendingSubmissions),
        );

        showAlert(
          "success",
          "Message Saved Locally",
          "Your message has been saved. Our team will review it and contact you shortly.",
        );
        resetForm();
      } else if (
        error.message?.includes("duplicate") ||
        error.message?.includes("already exists")
      ) {
        showAlert(
          "error",
          "Already Submitted",
          "You have already submitted a message recently. Our team will contact you soon!",
        );
      } else if (error.message?.includes("429")) {
        showAlert(
          "error",
          "Too Many Requests",
          "Please wait a moment before sending another message.",
        );
      } else {
        showAlert(
          "error",
          "Something Went Wrong",
          "Unable to send your message. Please try again or contact us directly at velsakatech@gmail.com",
        );
      }
    } finally {
      submitTimeoutRef.current = setTimeout(() => {
        setIsSubmitting(false);
      }, 10000);
    }
  };

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/place/Methalodai,+Tamil+Nadu+623532/@9.2815489,78.8639504,17z/data=!3m1!4b1!4m6!3m5!1s0x3b019734aa46519b:0x4b5f1c9e365c7cf6!8m2!3d9.2815192!4d78.8662416!16s%2Fg%2F1q6401ybq?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D",
      "_blank",
    );
  };

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/velsakatech2026/", "_blank");
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/917092085864", "_blank");
  };

  const openEmail = () => {
    window.location.href = "mailto:velsakatech@gmail.com";
  };

  const openGitHub = () => {
    window.open("https://github.com/velsakatech", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-['Manrope'] antialiased overflow-x-hidden">
      <style>{`
        body {
          background-color: #f9fafb;
          color: #111827;
          overflow-x: hidden;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .glass-card-dark {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-in { animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        input, select, textarea {
          background-color: white;
          border-color: #d1d5db;
          color: #111827;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #6366f1;
          ring: 2px solid #6366f1;
        }
      `}</style>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
        </header>

        {/* Alert Popup */}
        {alert.show && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={closeAlert}
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <div className={`max-w-md w-full ${alert.show ? "animate-bounce-in" : ""}`}>
                {alert.type === "success" && (
                  <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-center shadow-2xl border-2 border-green-300 text-white">
                    <div className="mb-4">
                      <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center animate-float shadow-lg">
                        <span className="text-green-600 text-7xl">✓</span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-['Space_Grotesk']">
                      {alert.title}
                    </h3>
                    <p className="text-green-100 mb-6 leading-relaxed text-base font-medium">
                      {alert.message}
                    </p>
                    <p className="text-green-200 text-sm mb-4">
                      Our team will contact you soon
                    </p>
                    <button
                      onClick={closeAlert}
                      className="px-8 py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Continue
                    </button>
                  </div>
                )}
                {alert.type === "error" && (
                  <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-8 text-center shadow-2xl border-2 border-red-300 text-white">
                    <div className="mb-4">
                      <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center animate-shake shadow-lg">
                        <span className="text-red-600 text-7xl">!</span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-['Space_Grotesk']">
                      {alert.title}
                    </h3>
                    <p className="text-red-100 mb-6 leading-relaxed text-base font-medium">
                      {alert.message}
                    </p>
                    <button
                      onClick={closeAlert}
                      className="px-8 py-3 bg-white text-red-700 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-7 glass-card rounded-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="John Doe"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="john@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    placeholder="+91 70920 85864"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Service Selection
                  </label>
                  <select
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option>Web Development</option>
                    <option>App Development</option>
                    <option>AI Chatbot</option>
                    <option>ATS System</option>
                    <option>UI/UX Design</option>
                    <option>Cloud Solutions</option>
                    <option>DevOps Services</option>
                    <option>Job Enquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                  placeholder="Tell us more about your vision, requirements, or questions..."
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              <button
                className={`w-full md:w-auto bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] active:scale-95"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">Send Message</span>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card rounded-xl p-6 sm:p-8 flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gray-100 rounded-xl p-2 border border-gray-200">
                  <img
                    alt="VELSAKA TECH Logo"
                    className="w-16 h-16 object-contain rounded-lg"
                    src={Logo}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-['Space_Grotesk']">
                    Let's Connect
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Precision in every pixel.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-300"
                  onClick={openEmail}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 rounded-lg border border-indigo-200 group-hover:bg-indigo-100 transition-all">
                    <EmailIcon className="text-indigo-600" style={{ fontSize: "20px" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-gray-900 font-medium group-hover:text-indigo-600 transition-colors text-sm">
                      velsakatech@gmail.com
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-300"
                  onClick={openWhatsApp}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 rounded-lg border border-indigo-200 group-hover:bg-indigo-100 transition-all">
                    <PhoneIcon className="text-indigo-600" style={{ fontSize: "20px" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone / WhatsApp</p>
                    <p className="text-gray-900 font-medium group-hover:text-indigo-600 transition-colors text-sm">
                      +91 70920 85864
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-300"
                  onClick={openMap}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 rounded-lg border border-indigo-200 group-hover:bg-indigo-100 transition-all">
                    <LocationOnIcon className="text-indigo-600" style={{ fontSize: "20px" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-gray-900 font-medium group-hover:text-indigo-600 transition-colors text-sm">
                      Methalodai, Ramanathapuram, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { icon: LinkedInIcon, onClick: openLinkedIn, label: "LinkedIn" },
                    { icon: GitHubIcon, onClick: openGitHub, label: "GitHub" },
                    { icon: WhatsAppIcon, onClick: openWhatsApp, label: "WhatsApp" },
                    { icon: InstagramIcon, onClick: () => window.open("https://www.instagram.com/velsakatech/", "_blank"), label: "Instagram" },
                    { icon: EmailIcon, onClick: openEmail, label: "Email" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.onClick}
                      className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                      aria-label={item.label}
                    >
                      <item.icon className="text-gray-500 group-hover:text-indigo-600 transition-colors" style={{ fontSize: "20px" }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Card */}
            <div className="glass-card rounded-xl overflow-hidden relative group h-48 lg:h-auto lg:flex-1">
              <img
                alt="Cosmic Tech"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent flex items-end p-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 font-['Space_Grotesk']">
                  Innovation beyond borders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section
          className="mt-16 rounded-xl overflow-hidden glass-card h-[300px] sm:h-[400px] relative cursor-pointer group"
          onClick={openMap}
        >
          <div className="absolute inset-0 grayscale contrast-125 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzSgVLw5YcFN3nfkZeHjXizWLu-4A_-TSFTEppUzAWzeoXy_ju53mMjOAC8d2A7LPafNYod63fqc3Qqsoj0ao0_rK1rR05FvGhptleiHvigYzF45HcXjC8ElxpFqqe3pit6ZOtbqINJTj1WczcdofCtWDfGJ-lxgI2HcxV6qx278mnmUXTXosIR9xAewD63NJ3I_lF7xvXg2_y0-az0Yt9GGB53sCsYs3mL3HOFn5WqD1MJtk6TfFkTBl_9OtU2nV9XATTZZ4_oDE"
              alt="Map"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="px-4 sm:px-8 py-3 sm:py-4 glass-card rounded-full border border-indigo-300 flex items-center gap-3 shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors text-xs sm:text-sm">
                Velsaka Hub - Methalodai, Ramanathapuram, Tamil Nadu
              </span>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <div className="mt-16 text-center py-8 sm:py-12 px-4 glass-card rounded-xl border border-indigo-200">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
            Let's turn your idea into reality
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Our team is ready to scale your next big thing.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;