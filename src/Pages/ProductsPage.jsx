import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// API Configuration - Using Vite environment variables
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://your-api-domain.com";
const WAITLIST_ENDPOINT = `${API_BASE_URL}/api/waitlist`;

// Utility functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (!email) return "Email is required";
  if (email.length > 254) return "Email is too long";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

// Retry logic with exponential backoff
const fetchWithRetry = async (url, options, maxRetries = 3) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok || response.status !== 429) {
        return response;
      }

      // Rate limited - wait with exponential backoff
      const delay = Math.pow(2, i) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      lastError = error;
      if (i === maxRetries - 1) throw lastError;

      const delay = Math.pow(2, i) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
};

// Rate limiter for client-side
class RateLimiter {
  constructor(minInterval = 1000) {
    this.lastRequestTime = 0;
    this.minInterval = minInterval;
  }

  async throttle() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minInterval) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.minInterval - timeSinceLastRequest),
      );
    }
    this.lastRequestTime = Date.now();
  }
}

const rateLimiter = new RateLimiter();

const ProductsPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const waitlistRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Escape key handler for modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleModalGetNotified = () => {
    closeModal();
    setTimeout(() => {
      scrollToWaitlist();
    }, 300);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) {
      setEmailError(validateEmail(newEmail));
    }
  };

  const handleNotify = async () => {
    // Validate email
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsSubmitting(true);

    // Apply rate limiting
    await rateLimiter.throttle();

    const trimmedEmail = email.trim().toLowerCase();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          timestamp: new Date().toISOString(),
          source: window.location.origin,
        }),
        signal: abortController.signal,
      };

      const res = await fetchWithRetry(WAITLIST_ENDPOINT, requestOptions);

      let responseData = {};
      try {
        responseData = await res.json();
      } catch (e) {
        // Handle non-JSON response
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
      }

      if (!res.ok) {
        let errorMessage = "Something went wrong. Please try again.";

        switch (res.status) {
          case 400:
            errorMessage =
              responseData.message ||
              "Invalid request. Please check your email.";
            break;
          case 409:
            errorMessage = "This email is already on our waitlist!";
            break;
          case 429:
            errorMessage =
              "Too many requests. Please try again in a few minutes.";
            break;
          case 500:
            errorMessage = "Server error. Our team has been notified.";
            console.error("Server error:", {
              status: res.status,
              email: trimmedEmail,
            });
            break;
          default:
            errorMessage = responseData.message || `Error: ${res.status}`;
        }

        throw new Error(errorMessage);
      }

      // Success
      setNotified(true);
      setEmail("");
      setEmailError("");

      setTimeout(() => setNotified(false), 3000);

      // Store in localStorage to prevent duplicate notifications
      try {
        const notifiedEmails = JSON.parse(
          localStorage.getItem("notified_emails") || "[]",
        );
        if (!notifiedEmails.includes(trimmedEmail)) {
          notifiedEmails.push(trimmedEmail);
          localStorage.setItem(
            "notified_emails",
            JSON.stringify(notifiedEmails),
          );
        }
      } catch (e) {
        // Silently fail localStorage
      }
    } catch (error) {
      // Handle different error types
      if (error.name === "AbortError") {
        console.log("Request aborted");
        return;
      }

      let userMessage = "Something went wrong. Please try again.";

      if (
        error.message.includes("fetch") ||
        error.message.includes("network")
      ) {
        userMessage = "Network error. Please check your connection.";
      } else if (error.message.includes("timeout")) {
        userMessage = "Request timed out. Please try again.";
      } else if (error.message.includes("Failed to fetch")) {
        userMessage = "Unable to connect to server. Please try again later.";
      } else {
        userMessage = error.message || userMessage;
      }

      setEmailError(userMessage);

      // Log to monitoring service in production
      if (import.meta.env.PROD) {
        console.error("Waitlist API Error:", {
          message: error.message,
          email: trimmedEmail,
          timestamp: new Date().toISOString(),
        });
      }
    } finally {
      setIsSubmitting(false);
      abortControllerRef.current = null;
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const products = [
    {
      icon: "folder_copy",
      name: "Portfolio Generator",
      description: "Build your professional portfolio in minutes.",
      badge: "Under Development",
      badgeColor: "indigo",
      fullDescription:
        "Build your professional portfolio with modern templates, seamless customization, and one-click publishing — fast and simple",
      features: [
        "Automatic resume parsing",
        "Multiple modern templates",
        "Custom domain support",
        "GitHub integration",
        "Project showcase builder",
        "Analytics dashboard",
      ],
      launchDate: "Will Soon...",
    },
    {
      icon: "description",
      name: "AI Resume Builder",
      description: "Create ATS-friendly resumes with AI-powered suggestions.",
      badge: "Under Development",
      badgeColor: "indigo",
      fullDescription:
        "Our AI Resume Builder uses advanced natural language processing to analyze job descriptions and optimize your resume for Applicant Tracking Systems. Features include:",
      features: [
        "ATS-friendly template suggestions",
        "Keyword optimization based on job descriptions",
        "Real-time content scoring",
        "Multiple resume versions",
        "PDF and DOCX export",
        "AI-powered content enhancement",
      ],
      launchDate: "Soon...",
    },
    {
      icon: "psychology",
      name: "AI Interview Prep",
      description: "Practice interviews with AI feedback.",
      badge: "Planned",
      badgeColor: "indigo",
      fullDescription:
        "Prepare for technical interviews with our AI-powered mock interview system. Get real-time feedback and improve your skills. Features include:",
      features: [
        "Technical and behavioral questions",
        "Real-time voice feedback",
        "Code challenge simulator",
        "Performance analytics",
        "Personalized study plans",
        "Industry-specific questions",
      ],
      launchDate: "Soon...",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto text-center">
            <span className="text-xs sm:text-sm tracking-widest text-indigo-600 mb-3 sm:mb-4 block font-semibold">
              INNOVATION AT SCALE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 font-['Space_Grotesk']">
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              We're building AI-powered tools to help developers grow faster.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={scrollToWaitlist}
                className="bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white px-8 sm:px-10 py-3 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(108,63,255,0.4)] transition-all duration-300 active:scale-95"
              >
                Get Notified
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="bg-white/70 backdrop-blur-sm border border-gray-300 px-8 sm:px-10 py-3 rounded-full font-semibold text-gray-700 hover:bg-white/90 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="glass-card p-6 lg:p-8 rounded-xl hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-200"
              >
                <div className="w-14 h-14 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-600 mb-5">
                  <span className="material-symbols-outlined text-3xl">
                    {product.icon}
                  </span>
                </div>

                <div className="mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      product.badgeColor === "indigo"
                        ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                        : "bg-gray-200 text-gray-600 border border-gray-300"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 font-['Space_Grotesk']">
                  {product.name}
                </h3>

                <p className="text-gray-600 mb-6 text-base leading-relaxed flex-grow">
                  {product.description}
                </p>

                <button
                  onClick={() => openModal(product)}
                  className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-white/80 hover:border-indigo-300 transition-all duration-300 font-medium"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Email Waitlist Section */}
        <section
          ref={waitlistRef}
          className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto scroll-mt-20"
        >
          <div className="glass-card p-8 sm:p-12 rounded-xl relative overflow-hidden border border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] opacity-5" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-600 mb-5 mx-auto">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-['Space_Grotesk']">
                Be the First to Experience VELSAKA
              </h2>
              <p className="text-gray-600 mb-8 text-base sm:text-lg">
                Get early access to our AI-powered tools and exclusive updates.
              </p>

              <div className="flex flex-col gap-2 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => setEmailError(validateEmail(email))}
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 bg-white/80 border rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500/50 transition-all duration-300 ${
                        emailError
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-300 focus:border-indigo-500/50"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        {emailError}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleNotify}
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-[0_0_30px_rgba(108,63,255,0.4)] active:scale-95"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Notify Me"
                    )}
                  </button>
                </div>
              </div>

              {notified && (
                <p className="text-green-600 text-sm mt-4 animate-pulse flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    check_circle
                  </span>
                  Thanks! We'll notify you when we launch.
                </p>
              )}

              <p className="text-gray-400 text-xs mt-4">
                No spam. Only updates about product launches.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal Component */}
      {showModal && selectedProduct && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
            onClick={closeModal}
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-gray-200 rounded-xl max-w-3xl w-full relative animate-in slide-in-from-bottom-10 duration-300 shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center z-10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-indigo-100/50 flex items-center justify-center text-indigo-600">
                    <span className="material-symbols-outlined text-4xl">
                      {selectedProduct.icon}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-['Space_Grotesk']">
                      {selectedProduct.name}
                    </h2>
                    <div className="mt-1">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          selectedProduct.badgeColor === "indigo"
                            ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                            : "bg-gray-200 text-gray-600 border border-gray-300"
                        }`}
                      >
                        {selectedProduct.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.fullDescription}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 font-['Space_Grotesk']">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <span className="material-symbols-outlined text-indigo-500 text-base">
                          check_circle
                        </span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-500">
                      schedule
                    </span>
                    <span className="text-gray-600 text-sm">
                      Expected Launch: {selectedProduct.launchDate}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleModalGetNotified}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 text-sm"
                    >
                      Get Notified
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(108,63,255,0.4)] transition-all duration-300 text-sm"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;