import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeProjectTab, setActiveProjectTab] = useState("all");

  const processSteps = [
    {
      step: "1",
      icon: "forum",
      title: "Discussion",
      desc: "Initial consultation to understand goals, target audience, and project scope.",
      fullDesc:
        "We dive deep into your business requirements, analyze market needs, and define clear project objectives.",
    },
    {
      step: "2",
      icon: "architecture",
      title: "Planning",
      desc: "Architecture design, tech stack selection, and detailed project roadmapping.",
      fullDesc:
        "Our architects design scalable system architecture, choose optimal technologies, and create detailed sprint plans.",
    },
    {
      step: "3",
      icon: "data_object",
      title: "Development",
      desc: "Agile engineering sprints with continuous testing and quality assurance.",
      fullDesc:
        "We build in iterative sprints, conduct regular code reviews, and maintain high testing standards throughout.",
    },
    {
      step: "4",
      icon: "rocket_launch",
      title: "Deployment",
      desc: "Final optimizations and launch on production-ready cloud environments.",
      fullDesc:
        "We ensure smooth deployment, monitor performance metrics, and provide ongoing maintenance support.",
    },
  ];

  // College Projects
  const collegeProjects = [
    {
      title: "AI Campus Navigator",
      category: "Major Project",
      tech: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
      description:
        "Smart campus navigation system using AI/ML for optimal route planning, facility finding, and real-time crowd management.",
      type: "college",
      featured: true,
      academicYear: "Final Year",
    },
    {
      title: "Smart Attendance System",
      category: "Major Project",
      tech: ["Python", "OpenCV", "React", "Firebase", "Face Recognition"],
      description:
        "Facial recognition-based attendance system with real-time tracking, reports generation, and parent notification system.",
      type: "college",
      featured: true,
      academicYear: "Final Year",
    },
    {
      title: "E-Library Management",
      category: "Mini Project",
      tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      description:
        "Digital library system with book tracking, online reservations, fine calculation, and student dashboard.",
      type: "college",
      featured: false,
      academicYear: "Third Year",
    },
    {
      title: "Student Result Analyzer",
      category: "Mini Project",
      tech: ["Python", "Flask", "SQLite", "Chart.js", "HTML/CSS"],
      description:
        "Academic performance analysis tool with grade visualization, CGPA calculator, and semester-wise progress tracking.",
      type: "college",
      featured: false,
      academicYear: "Third Year",
    },
    {
      title: "Campus Recruitment Portal",
      category: "Major Project",
      tech: ["React", "Node.js", "MongoDB", "JWT", "AWS S3"],
      description:
        "Complete placement management system connecting students with recruiters, resume parsing, and interview scheduling.",
      type: "college",
      featured: true,
      academicYear: "Final Year",
    },
    {
      title: "Hostel Management System",
      category: "Mini Project",
      tech: ["Java", "Spring Boot", "MySQL", "React", "Docker"],
      description:
        "Room allocation, mess management, complaint tracking, and visitor management for college hostels.",
      type: "college",
      featured: false,
      academicYear: "Third Year",
    },
  ];

  // Business Websites
  const businessWebsites = [
    {
      title: "Restaurant Ordering Platform",
      category: "Food & Beverage",
      tech: ["React", "Node.js", "MongoDB", "Razorpay", "Socket.io"],
      description:
        "Complete restaurant management with online ordering, table booking, kitchen display system, and delivery tracking.",
      type: "business",
      featured: true,
      industry: "Restaurant",
    },
    {
      title: "Real Estate Portal",
      category: "Property Management",
      tech: ["Next.js", "PostgreSQL", "AWS", "Google Maps API", "Stripe"],
      description:
        "Property listing platform with virtual tours, mortgage calculator, agent dashboard, and lead management system.",
      type: "business",
      featured: true,
      industry: "Real Estate",
    },
    {
      title: "Healthcare Clinic Management",
      category: "Healthcare",
      tech: ["React", "Django", "PostgreSQL", "Twilio", "Celery"],
      description:
        "Clinic management system with appointment booking, patient records, telemedicine integration, and automated reminders.",
      type: "business",
      featured: false,
      industry: "Healthcare",
    },
    {
      title: "Retail Inventory System",
      category: "Retail",
      tech: ["Vue.js", "Laravel", "MySQL", "Redis", "Docker"],
      description:
        "Multi-store inventory management with barcode scanning, supplier management, purchase orders, and analytics.",
      type: "business",
      featured: false,
      industry: "Retail",
    },
    {
      title: "Educational Institute Website",
      category: "Education",
      tech: ["React", "Node.js", "MongoDB", "Zoom API", "Cloudinary"],
      description:
        "Complete school/college website with admission portal, online fee payment, LMS integration, and parent portal.",
      type: "business",
      featured: true,
      industry: "Education",
    },
    {
      title: "Hospital Token System",
      category: "Healthcare",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
      description:
        "A smart hospital queue management system that enables patients to generate digital tokens, monitor live queue status, reduce waiting times, and allows hospital staff to efficiently manage patient flow through an intuitive admin dashboard.",
      type: "business",
      featured: true,
      industry: "Healthcare",
    },
  ];

  // AI Integration Projects (added VELSKA ATS)
  const aiIntegrations = [
    {
      title: "VELSAKA ATS",
      category: "AI Recruitment",
      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Gemini AI",
        "JWT",
      ],
      description:
        "An AI-powered ATS resume analyzer that compares resumes with job descriptions, calculates ATS compatibility scores, identifies missing keywords, provides detailed skill gap analysis, and delivers actionable suggestions to improve interview chances.",
      type: "ai",
      featured: true,
      useCase: "Human Resources",
    },
    {
      title: "AI Chatbot for Customer Support",
      category: "AI Integration",
      tech: ["OpenAI GPT-4", "Python", "FastAPI", "Redis", "Docker"],
      description:
        "Intelligent customer support chatbot with natural language understanding, sentiment analysis, and ticket automation.",
      type: "ai",
      featured: true,
      useCase: "Customer Service",
    },
    {
      title: "Website Modernization with AI",
      category: "AI Integration",
      tech: ["React", "TensorFlow.js", "Node.js", "AWS Lambda", "GraphQL"],
      description:
        "Legacy website upgrade with AI-powered search, personalized recommendations, and smart content optimization.",
      type: "ai",
      featured: true,
      useCase: "Website Upgrade",
    },
    {
      title: "AI Document Processing System",
      category: "AI Integration",
      tech: ["Python", "OCR", "NLP", "React", "PostgreSQL", "Celery"],
      description:
        "Automated document processing with OCR, data extraction, classification, and workflow automation for businesses.",
      type: "ai",
      featured: true,
      useCase: "Business Automation",
    },
    {
      title: "Predictive Analytics Dashboard",
      category: "AI Integration",
      tech: ["Python", "Scikit-learn", "React", "D3.js", "FastAPI"],
      description:
        "Business intelligence dashboard with sales forecasting, customer churn prediction, and trend analysis using ML.",
      type: "ai",
      featured: false,
      useCase: "Business Intelligence",
    },
    {
      title: "AI Content Generator",
      category: "AI Integration",
      tech: ["GPT-4 API", "Next.js", "PostgreSQL", "Stripe", "AWS"],
      description:
        "Content generation platform for businesses with AI writing, SEO optimization, and multi-language support.",
      type: "ai",
      featured: false,
      useCase: "Content Marketing",
    },
    {
      title: "Smart Image Recognition API",
      category: "AI Integration",
      tech: ["Python", "YOLO", "FastAPI", "Docker", "Kubernetes", "Redis"],
      description:
        "Custom image recognition API for product categorization, quality inspection, and visual search capabilities.",
      type: "ai",
      featured: false,
      useCase: "Computer Vision",
    },
  ];

  // Combined all projects
  const allProjects = [...collegeProjects, ...businessWebsites, ...aiIntegrations];

  // Filter projects based on active tab
  const getFilteredProjects = () => {
    switch (activeProjectTab) {
      case "college":
        return collegeProjects;
      case "business":
        return businessWebsites;
      case "ai":
        return aiIntegrations;
      default:
        return allProjects;
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prevStep) => (prevStep + 1) % processSteps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, processSteps.length]);

  const goToStep = (index) => {
    setActiveStep(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % processSteps.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const prevStep = () => {
    setActiveStep(
      (prev) => (prev - 1 + processSteps.length) % processSteps.length
    );
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  // Get project count for tabs
  const getProjectCount = (type) => {
    switch (type) {
      case "college":
        return collegeProjects.length;
      case "business":
        return businessWebsites.length;
      case "ai":
        return aiIntegrations.length;
      default:
        return allProjects.length;
    }
  };

  // Get project type icon
  const getProjectTypeIcon = (type) => {
    switch (type) {
      case "college":
        return "school";
      case "business":
        return "business";
      case "ai":
        return "psychology";
      default:
        return "folder";
    }
  };

  // Get project type badge color
  const getProjectTypeBadge = (type) => {
    switch (type) {
      case "college":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "business":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "ai":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto text-center">
            <span className="text-xs sm:text-sm tracking-widest text-indigo-600 mb-3 sm:mb-4 block font-semibold">
              ENGINEERING THE FUTURE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 font-['Space_Grotesk']">
              Our Services
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              From college projects to enterprise AI solutions, we deliver high-performance digital products 
              tailored for students, businesses, and innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white px-8 sm:px-10 py-3 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 active:scale-95"
              >
                Get a Free Consultation
              </button>
              <button
                onClick={() => {
                  const projectsSection = document.getElementById('projects-section');
                  projectsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-indigo-600 text-indigo-600 px-8 sm:px-10 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300"
              >
                View Our Work
              </button>
            </div>
          </div>
        </section>

        {/* Services Grid - Fixed (misplaced project removed) */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: "school",
                title: "College Projects",
                desc: "Complete major and mini projects for engineering students with documentation, reports, and presentations.",
                points: ["Final Year Projects", "Mini Projects", "Project Reports", "Live Demos"],
              },
              {
                icon: "smart_toy",
                title: "AI/ML Solutions",
                desc: "Integrating cutting-edge AI to automate processes, enhance decision-making, and transform user experiences.",
                points: ["ChatGPT Integration", "Predictive Analytics", "Computer Vision", "NLP Solutions"],
              },
              {
                icon: "language",
                title: "Business Websites",
                desc: "Professional websites with modern design, SEO optimization, and conversion-focused user experiences.",
                points: ["E-commerce Platforms", "Business Portfolios", "Booking Systems", "Admin Dashboards"],
              },
              {
                icon: "auto_fix_high",
                title: "Website Modernization",
                desc: "Transform outdated websites with AI integration, modern UI/UX, and enhanced functionality.",
                points: ["Legacy System Upgrade", "AI Feature Addition", "Performance Optimization", "Mobile Responsive"],
              },
              {
                icon: "code",
                title: "Web Development",
                desc: "Scalable, high-performance web applications built with modern architectures and best practices.",
                points: ["React & Next.js", "Full-Stack Solutions", "API Development", "Cloud Deployment"],
              },
              {
                icon: "support_agent",
                title: "Consultation & Support",
                desc: "Expert guidance for project planning, technology selection, and ongoing maintenance support.",
                points: ["Project Consultation", "Code Reviews", "Technical Support", "Training Sessions"],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-[0_0_25px_rgba(108,99,255,0.15)] hover:border-indigo-300 transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <span className="material-symbols-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow text-sm sm:text-base">
                  {service.desc}
                </p>
                <ul className="space-y-2 mb-4">
                  {service.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm sm:text-base text-gray-700"
                    >
                      <span className="material-symbols-outlined text-indigo-600 text-base">
                        check_circle
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-indigo-300 transition-colors font-medium"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Showcase with Tabs */}
        <section id="projects-section" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 font-['Space_Grotesk']">
                Our Diverse Portfolio
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Showcasing expertise across college projects, business solutions, and AI integrations
              </p>
            </div>

            {/* Project Type Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button
                onClick={() => setActiveProjectTab("all")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProjectTab === "all"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                <span className="material-symbols-outlined text-sm">apps</span>
                All Projects
                <span className="text-xs">({getProjectCount("all")})</span>
              </button>
              <button
                onClick={() => setActiveProjectTab("college")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProjectTab === "college"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-purple-300 hover:text-purple-600"
                }`}
              >
                <span className="material-symbols-outlined text-sm">school</span>
                College Projects
                <span className="text-xs">({getProjectCount("college")})</span>
              </button>
              <button
                onClick={() => setActiveProjectTab("business")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProjectTab === "business"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <span className="material-symbols-outlined text-sm">business</span>
                Business Websites
                <span className="text-xs">({getProjectCount("business")})</span>
              </button>
              <button
                onClick={() => setActiveProjectTab("ai")}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProjectTab === "ai"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                <span className="material-symbols-outlined text-sm">psychology</span>
                AI Integrations
                <span className="text-xs">({getProjectCount("ai")})</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {getFilteredProjects().map((project, idx) => (
                <div
                  key={idx}
                  className={`bg-white border p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(108,99,255,0.1)] hover:-translate-y-1 group ${
                    project.featured ? "border-indigo-300" : "border-gray-200"
                  }`}
                >
                  {/* Project Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getProjectTypeBadge(project.type)}`}>
                      <span className="material-symbols-outlined text-xs align-middle mr-1">
                        {getProjectTypeIcon(project.type)}
                      </span>
                      {project.type === "college" ? "College Project" : 
                       project.type === "business" ? "Business Solution" : "AI Integration"}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Category & Additional Info */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs text-indigo-600 font-medium">
                      {project.category}
                    </span>
                    {project.academicYear && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{project.academicYear}</span>
                      </>
                    )}
                    {project.industry && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{project.industry}</span>
                      </>
                    )}
                    {project.useCase && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{project.useCase}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Space_Grotesk'] group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-gray-600">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-indigo-300 transition-all duration-300 font-medium flex items-center justify-center gap-2 group-hover:gap-3"
                  >
                    <span>Get This Solution</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {getFilteredProjects().length === 0 && (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">folder_off</span>
                <p className="text-gray-500">No projects found in this category</p>
              </div>
            )}

            {/* CTA for Custom Projects */}
            <div className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Whether you're a student needing a unique project or a business looking for AI integration, 
                we build tailored solutions that match your exact requirements.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </section>

        {/* Process Section with Animated Timeline */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 font-['Space_Grotesk']">
                Our Development Process
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                A systematic approach to engineering excellence.
              </p>
            </div>

            {/* Animated Process Flow - Desktop */}
            <div className="relative px-4 sm:px-8">
              <div className="hidden lg:block relative">
                {/* Animated Background */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-100/40 to-blue-100/40 rounded-full blur-[100px] transition-all duration-1000 ease-in-out"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${(activeStep - 1.5) * 80}px)`,
                    }}
                  />
                </div>

                {/* Connecting Line */}
                <div className="absolute top-20 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-1000 ease-in-out"
                    style={{
                      width: `${(activeStep / (processSteps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center text-center flex-1 cursor-pointer transition-all duration-500 ${
                        activeStep === index
                          ? "transform scale-105"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => goToStep(index)}
                    >
                      {/* Step Circle */}
                      <div className="relative">
                        {activeStep === index && (
                          <div className="absolute inset-0 rounded-full animate-ping bg-indigo-200/50" />
                        )}
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 relative z-10 ${
                            activeStep === index
                              ? "bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] shadow-[0_0_30px_rgba(108,99,255,0.6)] scale-110"
                              : activeStep > index
                                ? "bg-green-50 border-2 border-green-400/50"
                                : "bg-white border-2 border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          {activeStep > index ? (
                            <span className="material-symbols-outlined text-2xl text-green-600">
                              check
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-3xl text-gray-700">
                              {step.icon}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-semibold mb-2 font-['Space_Grotesk'] transition-all duration-500">
                        <span
                          className={
                            activeStep === index
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600"
                              : "text-gray-900"
                          }
                        >
                          {step.title}
                        </span>
                      </h4>

                      {/* Description */}
                      <p className="text-sm text-gray-600 max-w-[200px]">
                        {step.desc}
                      </p>

                      {/* Active Step Indicator */}
                      {activeStep === index && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
                          <span className="material-symbols-outlined text-indigo-500">
                            arrow_downward
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Active Step Details Panel */}
                <div className="mt-16 p-6 bg-white border border-indigo-200 rounded-xl shadow-sm animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-2xl">
                        {processSteps[activeStep].icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
                        {processSteps[activeStep].title} Phase
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {processSteps[activeStep].fullDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={prevStep}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-indigo-300 hover:scale-110 transition-all duration-300 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-indigo-500">chevron_left</span>
                  </button>

                  <button
                    onClick={nextStep}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-indigo-300 hover:scale-110 transition-all duration-300 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-indigo-500">chevron_right</span>
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-indigo-300 transition-all duration-300 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-indigo-500 text-sm">
                      {isPlaying ? "pause" : "play_arrow"}
                    </span>
                  </button>
                </div>

                {/* Auto-play indicator */}
                {isPlaying && (
                  <div className="text-center mt-4">
                    <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Auto-playing process flow
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile/Tablet View - Stacked Layout */}
              <div className="lg:hidden space-y-6">
                {processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`bg-white border p-6 rounded-xl transition-all duration-300 ${
                      activeStep === idx
                        ? "border-indigo-300 shadow-[0_0_20px_rgba(108,99,255,0.1)]"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          activeStep > idx
                            ? "bg-green-50 border-2 border-green-400/50"
                            : activeStep === idx
                              ? "bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                              : "bg-gray-100 border-2 border-gray-200"
                        }`}
                      >
                        {activeStep > idx ? (
                          <span className="material-symbols-outlined text-green-600">
                            check
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-gray-700 text-xl">
                            {step.icon}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 font-['Space_Grotesk']">
                          {step.title}
                        </h4>
                        <p className="text-xs text-indigo-600">
                          Step {step.step} of 4
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-['Space_Grotesk']">
                Why Choose Velsaka Tech
              </h2>
              <p className="text-gray-600 mb-8 sm:mb-10 text-base sm:text-lg">
                We serve everyone from college students to enterprise businesses, 
                delivering quality solutions with modern technology and expert guidance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: "groups",
                    title: "Student-Friendly",
                    desc: "Affordable projects with complete documentation and support for college submissions.",
                  },
                  {
                    icon: "bolt",
                    title: "AI-Powered Solutions",
                    desc: "Latest AI/ML integrations to modernize and enhance your existing systems.",
                  },
                  {
                    icon: "hub",
                    title: "Business Ready",
                    desc: "Scalable websites and applications that drive real business growth.",
                  },
                  {
                    icon: "support_agent",
                    title: "24/7 Support",
                    desc: "Continuous technical support and maintenance for all our projects.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 sm:gap-4">
                    <div className="text-indigo-600">
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">
                        {item.title}
                      </h5>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] blur-3xl opacity-20 rounded-full" />
              <div className="relative rounded-lg border border-gray-200 shadow-xl overflow-hidden">
                <img
                  alt="Diverse tech solutions"
                  className="w-full"
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
          <div className="bg-white border border-gray-200 p-8 sm:p-12 rounded-xl relative overflow-hidden text-center shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] opacity-5" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 font-['Space_Grotesk']">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg px-4">
                Whether it's a college project, business website, or AI integration, 
                let's build something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white px-8 sm:px-12 py-3 rounded-full font-semibold hover:shadow-[0_0_40px_rgba(108,99,255,0.5)] transition-all duration-300 active:scale-95"
                >
                  Start Your Project
                </button>
                <button
                  onClick={() => {
                    const projectsSection = document.getElementById('projects-section');
                    projectsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-gray-300 text-gray-700 px-8 sm:px-12 py-3 rounded-full font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
                >
                  Browse Projects
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Fixed style tag – removed invalid jsx attribute */}
      <style>{`
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          75%,
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;