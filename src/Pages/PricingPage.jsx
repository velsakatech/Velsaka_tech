import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Are the prices fixed?",
      answer:
        "The prices shown on this page are starting prices. Final pricing is negotiable and depends on your exact requirements, project complexity, features, integrations, timeline, and deployment needs.",
    },
    {
      question: "Can I negotiate the project price?",
      answer:
        "Yes. We are flexible with pricing. Share your requirements and expected budget, and we can discuss the scope, prioritize important features, and provide a suitable quotation.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Simple websites and tools may take around 1–3 weeks. Web applications, AI solutions, SaaS products, and custom software may take several weeks depending on the project scope.",
    },
    {
      question: "Do you require upfront payment?",
      answer:
        "Yes. Projects generally begin with an advance payment. For larger projects, the remaining amount can be divided into development milestones. The exact payment structure can be discussed before starting.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept UPI and bank transfer. Other payment options can be discussed depending on the project and client requirements.",
    },
    {
      question: "Do you offer ongoing maintenance?",
      answer:
        "Yes. Maintenance and support plans are available starting from ₹1,999/month. The final maintenance price depends on the application and the level of support required.",
    },
    {
      question: "Do you offer discounts for students or startups?",
      answer:
        "We may offer special pricing for students, early-stage startups, and selected projects depending on the scope and requirements. Contact us to discuss your project.",
    },
  ];

  const pricingCategories = [
    {
      icon: "school",
      title: "Student & Academic",
      price: "₹99+",
      description:
        "Affordable tools, documentation and development assistance for students.",
      services: [
        "Project Abstract — ₹99+",
        "AI PPT / Presentation — ₹299+",
        "Seminar / Project Presentation — ₹299+",
        "SRS Documentation — ₹499+",
        "UML / ER / Flowcharts — ₹299+",
        "Project Documentation — ₹999+",
        "Viva Preparation — ₹299+",
        "College Mini Project — ₹2,999+",
        "College Major Project — ₹5,999+",
      ],
    },
    {
      icon: "picture_as_pdf",
      title: "PDF & Documents",
      price: "₹99+",
      description:
        "Simple PDF tools, document conversion and AI-powered document solutions.",
      services: [
        "Image → PDF — ₹99+",
        "PDF Merge / Split / Compress — ₹199+",
        "PDF → Word — ₹199+",
        "Word → PDF — ₹199+",
        "PDF Generation — ₹299+",
        "Document Conversion — ₹299+",
        "Custom PDF Tool — ₹2,999+",
        "AI PDF / Document Q&A — ₹6,999+",
      ],
    },
    {
      icon: "work",
      title: "Career Tools",
      price: "₹199+",
      description:
        "Affordable career tools for resumes, portfolios and professional profiles.",
      services: [
        "Cover Letter Generator — ₹199+",
        "Resume / CV Builder — ₹299+",
        "ATS Resume Analysis — ₹299+",
        "Portfolio PDF — ₹299+",
        "AI Portfolio Builder — ₹2,999+",
        "Personal Portfolio Website — ₹4,999+",
        "Developer Portfolio — ₹6,999+",
      ],
    },
    {
      icon: "language",
      title: "Websites",
      price: "₹4,999+",
      description:
        "Modern responsive websites for individuals, businesses and organizations.",
      services: [
        "Landing Page — ₹4,999+",
        "Starter Website — ₹9,999+",
        "Business Website — ₹19,999+",
        "Advanced Website — ₹34,999+",
        "Portfolio Website",
        "Business Website",
        "Institution / Organization Website",
      ],
    },
    {
      icon: "psychology",
      title: "AI Solutions",
      price: "₹4,999+",
      description:
        "AI-powered applications, assistants, automation and API integrations.",
      services: [
        "AI API Integration — ₹4,999+",
        "AI Content Tool — ₹7,999+",
        "AI Chatbot — ₹9,999+",
        "Chat with PDF — ₹12,999+",
        "AI Study Assistant — ₹9,999+",
        "AI Document Processing — ₹14,999+",
        "AI Automation — ₹19,999+",
        "AI Recruitment Tool — ₹24,999+",
        "Custom AI Application — ₹29,999+",
      ],
    },
    {
      icon: "code",
      title: "Full-Stack Applications",
      price: "₹39,999+",
      description:
        "Custom web applications built around your business or product requirements.",
      services: [
        "Custom Web Application — ₹39,999+",
        "Advanced Application — ₹69,999+",
        "Custom Digital Product — ₹99,999+",
        "Authentication & Authorization",
        "Database & REST API",
        "Admin Dashboard",
        "Third-Party Integrations",
      ],
    },
    {
      icon: "shopping_cart",
      title: "E-Commerce & SaaS",
      price: "₹24,999+",
      description:
        "Online stores, SaaS MVPs and scalable digital products.",
      services: [
        "E-Commerce Website — ₹24,999+",
        "SaaS MVP — ₹49,999+",
        "SaaS Product — ₹99,999+",
        "Product & Order Management",
        "Payment Integration",
        "Admin Dashboard",
        "User Management",
      ],
    },
    {
      icon: "business_center",
      title: "Business Software",
      price: "₹9,999+",
      description:
        "Custom software to simplify everyday business operations.",
      services: [
        "Quotation System — ₹9,999+",
        "Invoice System — ₹9,999+",
        "Reporting Dashboard — ₹14,999+",
        "Booking System — ₹19,999+",
        "CRM — ₹29,999+",
        "Inventory System — ₹29,999+",
        "Project Management — ₹29,999+",
        "Employee Management — ₹29,999+",
        "Custom Business Software — ₹39,999+",
      ],
    },
    {
      icon: "bolt",
      title: "Automation",
      price: "₹2,999+",
      description:
        "Automate repetitive workflows, notifications, documents and business processes.",
      services: [
        "Email Automation — ₹2,999+",
        "Notification Automation — ₹2,999+",
        "API Integration — ₹4,999+",
        "Document Automation — ₹9,999+",
        "AI Workflow — ₹14,999+",
        "Business Process Automation — ₹19,999+",
      ],
    },
    {
      icon: "support_agent",
      title: "Maintenance & Support",
      price: "₹1,999/mo",
      description:
        "Keep your website or application updated and running smoothly.",
      services: [
        "Essential — ₹1,999/month",
        "Professional — ₹3,999/month",
        "Premium — ₹6,999/month",
        "Bug Fixes",
        "Content / Minor Updates",
        "Performance Monitoring",
        "Priority Support",
      ],
    },
  ];

  const pricingSteps = [
    {
      number: "01",
      title: "Share Your Idea",
      text: "Tell us what you want to build and what problem it should solve.",
    },
    {
      number: "02",
      title: "Define the Scope",
      text: "We identify the important features, integrations and technical requirements.",
    },
    {
      number: "03",
      title: "Discuss Budget",
      text: "Share your expected budget. We can adjust the project scope and pricing accordingly.",
    },
    {
      number: "04",
      title: "Get Your Quote",
      text: "We provide a project-specific quotation with scope and payment milestones.",
    },
  ];

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Header />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-200/30 blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-200/30 blur-[100px]" />
          </div>

          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs sm:text-sm font-semibold tracking-widest mb-6">
              PRICING
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight font-['Space_Grotesk']">
              Digital Solutions for Every Budget
            </h1>

            <p className="max-w-3xl mx-auto mt-6 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              From student tools and career solutions to websites, AI
              applications, SaaS products and custom business software.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                Starting Prices
              </span>

              <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                Custom Quotations
              </span>

              <span className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600">
                Negotiable Pricing
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            PRICING NOTE
        ====================================================== */}
        <section className="px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-['Space_Grotesk']">
                    Flexible pricing for your requirements
                  </h2>

                  <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-3xl leading-relaxed">
                    All prices shown below are starting prices. Final pricing
                    can be negotiated based on your requirements, features,
                    complexity, integrations, timeline and budget.
                  </p>
                </div>

                <button
                  onClick={handleContact}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
                >
                  Discuss Your Budget
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ====================================================== */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-widest text-indigo-600">
                OUR SERVICES
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">
                Choose a Starting Point
              </h2>

              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Choose the service that matches your requirement. If you have
                a different budget or scope, contact us and we can discuss it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {pricingCategories.map((category) => (
                <div
                  key={category.title}
                  className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-indigo-600 text-2xl">
                        {category.icon}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Starting from
                      </p>

                      <p className="text-lg font-bold text-indigo-600">
                        {category.price}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-gray-100 flex-grow">
                    <ul className="space-y-2.5">
                      {category.services.map((service, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-gray-600"
                        >
                          <span
                            className="material-symbols-outlined text-indigo-500 text-base mt-0.5 shrink-0"
                            style={{
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            check_circle
                          </span>

                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleContact}
                    className="mt-6 w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition"
                  >
                    Discuss This Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            NEGOTIABLE PRICING
        ====================================================== */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-8 sm:p-12 text-white text-center shadow-xl shadow-indigo-200">
              <span className="material-symbols-outlined text-4xl mb-4">
                handshake
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk']">
                Pricing Is Negotiable
              </h2>

              <p className="max-w-2xl mx-auto mt-4 text-indigo-100 leading-relaxed">
                Have a specific budget in mind? Share your requirements and
                budget range with us. We can discuss the scope, prioritize the
                important features and provide a suitable quotation.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleContact}
                  className="px-7 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-gray-50 transition"
                >
                  Request a Quote
                </button>

                <button
                  onClick={handleContact}
                  className="px-7 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                >
                  Discuss Your Budget
                </button>
              </div>

              <p className="mt-5 text-xs text-indigo-100">
                Final pricing depends on requirements, complexity,
                integrations, timeline and deployment needs.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW PRICING WORKS
        ====================================================== */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-widest text-indigo-600">
                SIMPLE PROCESS
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">
                How We Finalize Your Price
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {pricingSteps.map((step) => (
                <div
                  key={step.number}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition"
                >
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-sm font-bold">
                    {step.number}
                  </span>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            PAYMENT
        ====================================================== */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-widest text-indigo-600">
              PAYMENT
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">
              Flexible Payment Structure
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Payment schedules can be discussed according to the project size
              and development milestones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
              {[
                {
                  title: "Project Start",
                  value: "Advance",
                  icon: "play_circle",
                },
                {
                  title: "Development",
                  value: "Milestone",
                  icon: "construction",
                },
                {
                  title: "Delivery",
                  value: "Final Payment",
                  icon: "task_alt",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-gray-200 p-6"
                >
                  <span className="material-symbols-outlined text-indigo-600 text-3xl">
                    {item.icon}
                  </span>

                  <h3 className="mt-4 font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-indigo-600 font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ
        ====================================================== */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-widest text-indigo-600">
                FAQ
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = idx === openFaq;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? -1 : idx)
                      }
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    >
                      <span className="font-semibold text-gray-900">
                        {faq.question}
                      </span>

                      <span
                        className={`material-symbols-outlined text-gray-500 transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <span className="material-symbols-outlined text-indigo-600 text-4xl">
              lightbulb
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-['Space_Grotesk']">
              Have an Idea?
            </h2>

            <p className="mt-5 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              You don't need to know exactly what you need. Tell us your idea,
              requirements and budget. We'll help you find the right scope and
              provide a negotiable project quotation.
            </p>

            <button
              onClick={handleContact}
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all"
            >
              Get a Custom Quote

              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>

            <p className="mt-4 text-sm text-gray-500">
              No fixed package required • Custom scope • Negotiable pricing
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;