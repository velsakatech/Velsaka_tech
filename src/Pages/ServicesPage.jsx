import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  {
    icon: "school",
    number: "01",
    title: "Student Productivity",
    description:
      "AI-assisted academic tools to help students prepare presentations, assignments, study materials, and reports.",
    points: [
      "PPT and PowerPoint generation",
      "Seminar and project presentations",
      "Assignment and report generation",
      "Notes and study material summarization",
      "Quiz and question paper generation",
      "Project abstract creation",
    ],
    color: "violet",
  },
  {
    icon: "picture_as_pdf",
    number: "02",
    title: "PDF & Document Solutions",
    description:
      "Document creation, PDF management, and conversion solutions for students, professionals, and businesses.",
    points: [
      "PDF generation and editing",
      "PDF merge, split, and compression",
      "PDF to Word and Word to PDF",
      "Image to PDF conversion",
      "PDF summarization and document Q&A",
      "Document formatting and conversion",
    ],
    color: "cyan",
  },
  {
    icon: "account_box",
    number: "03",
    title: "Portfolio & Career Tools",
    description:
      "Career tools to help students, developers, freelancers, and job seekers showcase their skills and experience.",
    points: [
      "Personal portfolio website generation",
      "Portfolio PDF generation",
      "Resume and CV builder",
      "ATS resume analysis",
      "Cover letter generation",
      "LinkedIn content assistance",
      "GitHub README and personal bio",
      "Internship application assistance",
    ],
    color: "blue",
  },
  {
    icon: "description",
    number: "04",
    title: "College Projects & Documentation",
    description:
      "Academic project planning, documentation, and development assistance from initial idea to final presentation.",
    points: [
      "Major and mini project assistance",
      "Synopsis and abstract preparation",
      "SRS and project report documentation",
      "UML diagrams and system design",
      "ER diagrams and flowcharts",
      "Viva questions and project explanations",
      "Source code documentation",
      "Project presentation preparation",
    ],
    color: "pink",
  },
  {
    icon: "psychology",
    number: "05",
    title: "AI Tools & Integration",
    description:
      "AI-powered applications and integrations designed to simplify repetitive tasks and improve digital experiences.",
    points: [
      "AI writing and text rewriting tools",
      "AI chatbots and virtual assistants",
      "Chat with PDF and document Q&A",
      "Text and research paper summarization",
      "AI study assistant",
      "AI content and prompt generation",
      "AI API integration",
      "Document processing and automation",
    ],
    color: "emerald",
  },
  {
    icon: "language",
    number: "06",
    title: "Website & Portfolio Development",
    description:
      "Modern responsive websites for students, freelancers, startups, educational institutions, and businesses.",
    points: [
      "Business and company websites",
      "Personal and developer portfolios",
      "Landing pages and product websites",
      "Educational institute websites",
      "Booking and enquiry platforms",
      "Custom web portals",
      "Responsive UI/UX development",
    ],
    color: "amber",
  },
  {
    icon: "code",
    number: "07",
    title: "Full-Stack Application Development",
    description:
      "Custom applications with modern frontend interfaces, backend APIs, databases, and maintainable application features.",
    points: [
      "React and Next.js applications",
      "Node.js and Express.js backends",
      "REST API development and integration",
      "MongoDB and Firebase integration",
      "Authentication and role-based access",
      "Admin dashboards and management panels",
      "Third-party service integration",
    ],
    color: "violet",
  },
  {
    icon: "shopping_cart",
    number: "08",
    title: "E-Commerce & SaaS Products",
    description:
      "Digital product development for businesses and founders planning to launch online services and applications.",
    points: [
      "E-commerce websites and catalogues",
      "Shopping carts and checkout integration",
      "SaaS application development",
      "Subscription and membership workflows",
      "MVP and prototype development",
      "Customer and order management",
      "Payment gateway integration",
    ],
    color: "cyan",
  },
  {
    icon: "business_center",
    number: "09",
    title: "Business Software Solutions",
    description:
      "Custom software that helps businesses organize operations, manage customers, and streamline everyday work.",
    points: [
      "CRM and customer management systems",
      "Quotation and invoice generators",
      "Inventory and stock management",
      "Project and task management systems",
      "Employee and internal management portals",
      "Digital forms and reporting dashboards",
      "Business portfolio websites",
    ],
    color: "blue",
  },
  {
    icon: "smart_toy",
    number: "10",
    title: "Workflow Automation",
    description:
      "Practical automation and AI integrations that reduce repetitive tasks and connect business processes.",
    points: [
      "Business workflow automation",
      "AI chatbot integration",
      "Automated document workflows",
      "Email and notification integration",
      "API-based application connections",
      "Data processing workflows",
      "Custom productivity solutions",
    ],
    color: "pink",
  },
  {
    icon: "qr_code_2",
    number: "11",
    title: "Digital Utility Tools",
    description:
      "Useful digital utilities for students, freelancers, organizations, and businesses.",
    points: [
      "QR code generator",
      "Digital certificate generator",
      "Digital ID card generator",
      "Online form builder",
      "Digital business card creator",
      "Link-in-bio page builder",
      "Online booking systems",
    ],
    color: "emerald",
  },
  {
    icon: "cloud",
    number: "12",
    title: "Deployment, Maintenance & Support",
    description:
      "Technical assistance to launch, improve, maintain, and optimize websites and applications.",
    points: [
      "Cloud deployment assistance",
      "Website maintenance and updates",
      "Performance and responsive optimization",
      "Basic SEO and website optimization",
      "Application debugging and improvements",
      "Technology selection and project planning",
      "Code review and technical consultation",
    ],
    color: "amber",
  },
];

const collegeProjects = [
  {
    title: "AI Campus Navigator",
    category: "Major Project",
    tech: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    description:
      "An AI-assisted campus navigation concept for finding facilities, planning routes, and exploring campus information.",
    type: "college",
    featured: true,
    meta: "Final Year",
  },
  {
    title: "Smart Attendance System",
    category: "Major Project",
    tech: ["Python", "OpenCV", "React", "Firebase"],
    description:
      "A facial-recognition attendance concept with attendance tracking, reporting, and administrative management.",
    type: "college",
    featured: true,
    meta: "Final Year",
  },
  {
    title: "E-Library Management",
    category: "Mini Project",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    description:
      "A digital library concept for managing books, reservations, borrowing records, and student access.",
    type: "college",
    featured: false,
    meta: "Third Year",
  },
  {
    title: "Student Result Analyzer",
    category: "Mini Project",
    tech: ["Python", "Flask", "SQLite", "Chart.js"],
    description:
      "An academic performance dashboard concept with grade visualizations and semester-wise progress tracking.",
    type: "college",
    featured: false,
    meta: "Third Year",
  },
  {
    title: "Campus Recruitment Portal",
    category: "Major Project",
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    description:
      "A placement portal concept connecting students and recruiters with resume management and interview scheduling.",
    type: "college",
    featured: true,
    meta: "Final Year",
  },
  {
    title: "Hostel Management System",
    category: "Mini Project",
    tech: ["Java", "Spring Boot", "MySQL", "React"],
    description:
      "A hostel administration concept covering room allocation, complaints, visitor records, and management workflows.",
    type: "college",
    featured: false,
    meta: "Third Year",
  },
];

const businessWebsites = [
  {
    title: "Restaurant Ordering Platform",
    category: "Food & Beverage",
    tech: ["React", "Node.js", "MongoDB", "Razorpay"],
    description:
      "A restaurant platform concept featuring digital menus, online orders, table reservations, and order management.",
    type: "business",
    featured: true,
    meta: "Restaurant",
  },
  {
    title: "Real Estate Portal",
    category: "Property Management",
    tech: ["Next.js", "PostgreSQL", "Google Maps API"],
    description:
      "A property listing concept with search filters, property details, map-based discovery, and lead management.",
    type: "business",
    featured: true,
    meta: "Real Estate",
  },
  {
    title: "Healthcare Clinic Management",
    category: "Healthcare",
    tech: ["React", "Django", "PostgreSQL", "Twilio"],
    description:
      "A clinic workflow concept for appointment scheduling, patient records, and automated reminders.",
    type: "business",
    featured: false,
    meta: "Healthcare",
  },
  {
    title: "Retail Inventory System",
    category: "Retail",
    tech: ["Vue.js", "Laravel", "MySQL", "Redis"],
    description:
      "An inventory management concept for stock tracking, suppliers, purchase orders, and reporting.",
    type: "business",
    featured: false,
    meta: "Retail",
  },
  {
    title: "Educational Institute Website",
    category: "Education",
    tech: ["React", "Node.js", "MongoDB", "Cloudinary"],
    description:
      "An education website concept with course information, admission enquiries, fee workflows, and administration.",
    type: "business",
    featured: true,
    meta: "Education",
  },
  {
    title: "Hospital Token System",
    category: "Healthcare",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    description:
      "A queue management concept for digital tokens, live queue status, patient flow, and staff administration.",
    type: "business",
    featured: true,
    meta: "Healthcare",
  },
];

const aiIntegrations = [
  {
    title: "VELSAKA ATS",
    category: "AI Recruitment",
    tech: ["React", "Node.js", "MongoDB", "Gemini AI", "JWT"],
    description:
      "An AI-assisted recruitment tool concept for resume and job-description comparisons, keyword insights, and skill-gap feedback.",
    type: "ai",
    featured: true,
    meta: "Human Resources",
  },
  {
    title: "AI Customer Support Assistant",
    category: "AI Integration",
    tech: ["LLM APIs", "Python", "FastAPI", "Redis"],
    description:
      "A conversational support assistant concept designed to answer common questions and help organize customer requests.",
    type: "ai",
    featured: true,
    meta: "Customer Service",
  },
  {
    title: "AI Website Enhancement",
    category: "AI Integration",
    tech: ["React", "Node.js", "AI APIs"],
    description:
      "Enhance websites with AI-assisted search, content experiences, and intelligent application features.",
    type: "ai",
    featured: true,
    meta: "Website Upgrade",
  },
  {
    title: "AI Document Processing",
    category: "AI Integration",
    tech: ["Python", "OCR", "NLP", "React"],
    description:
      "A document processing concept for extracting information, categorizing files, and simplifying repetitive workflows.",
    type: "ai",
    featured: true,
    meta: "Automation",
  },
  {
    title: "Predictive Analytics Dashboard",
    category: "AI Integration",
    tech: ["Python", "Scikit-learn", "React", "FastAPI"],
    description:
      "A business analytics concept for presenting trends, forecasts, and useful insights through a dashboard.",
    type: "ai",
    featured: false,
    meta: "Business Intelligence",
  },
  {
    title: "AI Content Generator",
    category: "AI Integration",
    tech: ["LLM APIs", "Next.js", "PostgreSQL"],
    description:
      "A content creation concept for drafting marketing copy, organizing ideas, and assisting with content workflows.",
    type: "ai",
    featured: false,
    meta: "Content Marketing",
  },
  {
    title: "Image Recognition API",
    category: "AI Integration",
    tech: ["Python", "YOLO", "FastAPI", "Docker"],
    description:
      "A computer vision concept for visual classification, image-based search, and automated image analysis.",
    type: "ai",
    featured: false,
    meta: "Computer Vision",
  },
];

const studentTools = [
  {
    title: "AI PPT Generator",
    category: "Student Productivity",
    tech: ["React", "AI API", "PPTX"],
    description:
      "A proposed tool to turn a topic or outline into a structured presentation with editable slides.",
    type: "student",
    featured: true,
    meta: "Presentation Tool",
  },
  {
    title: "PDF Studio",
    category: "PDF & Documents",
    tech: ["React", "PDF Tools", "JavaScript"],
    description:
      "A proposed document workspace for PDF creation, merging, splitting, compression, and conversion.",
    type: "student",
    featured: true,
    meta: "Document Tool",
  },
  {
    title: "AI Portfolio Builder",
    category: "Career Tools",
    tech: ["React", "Tailwind CSS", "AI API"],
    description:
      "A proposed portfolio builder that organizes personal details, projects, skills, and career information.",
    type: "student",
    featured: true,
    meta: "Career Tool",
  },
  {
    title: "Resume & CV Builder",
    category: "Career Tools",
    tech: ["React", "PDF Generation", "AI API"],
    description:
      "A proposed resume builder with editable sections, reusable layouts, and PDF export.",
    type: "student",
    featured: true,
    meta: "Career Tool",
  },
  {
    title: "College Report Assistant",
    category: "Academic Tools",
    tech: ["React", "AI API", "PDF"],
    description:
      "A proposed assistant for organizing project abstracts, report sections, documentation, and presentations.",
    type: "student",
    featured: false,
    meta: "Academic Tool",
  },
  {
    title: "AI Study Assistant",
    category: "Learning Tools",
    tech: ["React", "AI API", "Document Processing"],
    description:
      "A proposed study tool for summarizing notes, explaining concepts, and generating revision questions.",
    type: "student",
    featured: false,
    meta: "Learning Tool",
  },
];

const projects = [
  ...collegeProjects,
  ...businessWebsites,
  ...aiIntegrations,
  ...studentTools,
];

const processSteps = [
  {
    number: "01",
    icon: "forum",
    title: "Discovery",
    description:
      "We understand your goals, audience, requirements, and the problem your product needs to solve.",
    deliverable: "Requirements and project scope",
  },
  {
    number: "02",
    icon: "architecture",
    title: "Planning & Design",
    description:
      "We define the solution, select suitable technologies, plan the features, and shape the user experience.",
    deliverable: "Project roadmap and UI direction",
  },
  {
    number: "03",
    icon: "terminal",
    title: "Development",
    description:
      "We build the application in manageable stages, test core functionality, and refine the implementation.",
    deliverable: "Working application and tested features",
  },
  {
    number: "04",
    icon: "rocket_launch",
    title: "Launch & Support",
    description:
      "We prepare the release, help with deployment, and discuss maintenance or improvements where required.",
    deliverable: "Deployment guidance and next steps",
  },
];

const benefits = [
  {
    icon: "devices",
    title: "Responsive by Design",
    description:
      "Interfaces designed to work across mobile phones, tablets, laptops, and desktop screens.",
  },
  {
    icon: "psychology",
    title: "Practical AI Integration",
    description:
      "AI features selected around real product requirements instead of adding complexity without a purpose.",
  },
  {
    icon: "layers",
    title: "Modern Technology",
    description:
      "Contemporary development tools and maintainable implementation patterns suited to the project.",
  },
  {
    icon: "handshake",
    title: "Clear Communication",
    description:
      "A collaborative process with clear scope, progress updates, and practical next steps.",
  },
];

const tabs = [
  { id: "all", label: "All Projects", icon: "apps" },
  { id: "college", label: "College", icon: "school" },
  { id: "business", label: "Business", icon: "business" },
  { id: "ai", label: "AI Solutions", icon: "psychology" },
  { id: "student", label: "Student Tools", icon: "description" },
];

const categoryStyles = {
  college: "border-violet-400/20 bg-violet-400/10 text-violet-700",
  business: "border-sky-400/20 bg-sky-400/10 text-sky-700",
  ai: "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-700",
  student: "border-emerald-400/20 bg-emerald-400/10 text-emerald-700",
};

const categoryLabels = {
  college: "College Project",
  business: "Business Solution",
  ai: "AI Integration",
  student: "Student Tool Concept",
};

const materialIcon = (name, className = "") => (
  <span
    aria-hidden="true"
    className={`material-symbols-outlined ${className}`}
  >
    {name}
  </span>
);

const SectionHeading = ({
  eyebrow,
  title,
  description,
  dark = false,
}) => (
  <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
      {eyebrow}
    </span>

    <h2
      className={`font-['Space_Grotesk'] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
        dark ? "text-white" : "text-slate-950"
      }`}
    >
      {title}
    </h2>

    <p
      className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${
        dark ? "text-slate-400" : "text-slate-600"
      }`}
    >
      {description}
    </p>
  </div>
);

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeProjectTab, setActiveProjectTab] = useState("all");
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const filteredProjects =
    activeProjectTab === "all"
      ? projects
      : projects.filter(
          (project) => project.type === activeProjectTab,
        );

  useEffect(() => {
    if (!isPlaying) return undefined;

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % processSteps.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const changeStep = (index) => {
    setActiveStep(index);
    setIsPlaying(false);
  };

  const goToProjects = () => {
    document
      .getElementById("projects-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToContact = () => navigate("/contact");

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-slate-900">
      <Header />

      <main>
        {/* Hero - LIGHT THEME */}
        <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50/30 px-4 py-24 text-slate-900 sm:px-6 sm:py-28 lg:min-h-[690px] lg:px-10">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(139,92,246,0.08),transparent_50%),radial-gradient(ellipse_at_85%_75%,rgba(59,130,246,0.08),transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] [background-size:52px_52px]" />
            <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-violet-200/40 blur-[110px] sm:h-96 sm:w-96" />
            <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-[110px]" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
            <div className="relative z-10 text-center lg:text-left">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-slate-600 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                </span>
                DIGITAL SERVICES · STUDENT TOOLS · AI · DEVELOPMENT
              </div>

              <h1 className="font-['Space_Grotesk'] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                Ideas into
                <span className="mt-2 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
                  digital products.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
                From AI-powered student tools and PPT generation to PDF
                solutions, portfolio builders, modern websites, full-stack
                applications, and business automation, VELSAKA TECH helps
                students, professionals, and businesses turn ideas into
                useful digital experiences.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <button
                  onClick={goToContact}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-violet-500/30"
                >
                  Discuss Your Project
                  {materialIcon("arrow_forward", "text-xl")}
                </button>

                <button
                  onClick={goToProjects}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition duration-300 hover:border-slate-300 hover:bg-slate-50"
                >
                  Explore Our Work
                  {materialIcon("south_east", "text-xl")}
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500 lg:justify-start">
                {[
                  "Student Tools",
                  "AI Integration",
                  "Web Development",
                  "Business Solutions",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {materialIcon("check_circle", "text-base text-violet-500")}
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Capability panel - LIGHT THEME */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-violet-200/30 via-blue-200/20 to-cyan-200/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      VELSAKA TECH
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900">
                      Digital capabilities
                    </h2>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      icon: "slideshow",
                      title: "Student productivity",
                      desc: "Presentations, reports, and study tools",
                      gradient: "from-violet-50 to-violet-100/50",
                      iconColor: "text-violet-600",
                    },
                    {
                      icon: "picture_as_pdf",
                      title: "PDF & documents",
                      desc: "Document generation and conversion",
                      gradient: "from-blue-50 to-blue-100/50",
                      iconColor: "text-blue-600",
                    },
                    {
                      icon: "account_box",
                      title: "Career tools",
                      desc: "Portfolios, resumes, and CVs",
                      gradient: "from-fuchsia-50 to-fuchsia-100/50",
                      iconColor: "text-fuchsia-600",
                    },
                    {
                      icon: "neurology",
                      title: "AI-powered applications",
                      desc: "Intelligent tools and integrations",
                      gradient: "from-cyan-50 to-cyan-100/50",
                      iconColor: "text-cyan-600",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`flex items-center gap-4 rounded-2xl border border-slate-100 bg-gradient-to-r ${item.gradient} p-4 transition duration-300 hover:border-slate-200 hover:shadow-sm`}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white bg-white shadow-sm">
                        {materialIcon(item.icon, `text-2xl ${item.iconColor}`)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                      <span className="ml-auto text-slate-300">
                        {materialIcon("arrow_outward", "text-lg")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/70 px-4 py-3">
                  <span className="text-sm text-slate-600">
                    Built around your requirements
                  </span>
                  {materialIcon("verified", "text-xl text-violet-500")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services-section" className="scroll-mt-20 bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="What we do"
              title="Digital services for every idea"
              description="From student productivity and document tools to AI solutions, web applications, and business software, explore the digital services available through VELSAKA TECH."
            />

            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {[
                { label: "Student Tools", icon: "school" },
                { label: "PDF & Documents", icon: "picture_as_pdf" },
                { label: "Career Tools", icon: "account_box" },
                { label: "AI Solutions", icon: "psychology" },
                { label: "Web Development", icon: "code" },
                { label: "Business Software", icon: "business_center" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => goToContact()}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/70 px-4 py-2 text-sm font-medium text-violet-800 transition hover:border-violet-300 hover:bg-violet-100"
                >
                  {materialIcon(item.icon, "text-lg")}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/[0.06] sm:p-7"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-100/0 blur-3xl transition duration-500 group-hover:bg-violet-100/90" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-blue-50 text-violet-700 transition duration-300 group-hover:scale-105">
                      {materialIcon(service.icon, "text-3xl")}
                    </div>
                    <span className="font-['Space_Grotesk'] text-sm font-semibold tracking-widest text-slate-300">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-['Space_Grotesk'] text-xl font-bold tracking-tight text-slate-900">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <ul className="relative mt-5 flex-1 space-y-3 border-t border-slate-100 pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        {materialIcon(
                          "check_circle",
                          "mt-0.5 text-lg text-violet-500",
                        )}
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={goToContact}
                    className="relative mt-7 inline-flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  >
                    Discuss this service
                    {materialIcon("arrow_forward", "text-lg")}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects portfolio - LIGHT THEME */}
        <section
          id="projects-section"
          className="scroll-mt-20 bg-slate-50 px-4 py-20 text-slate-900 sm:px-6 sm:py-24 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Selected project concepts"
              title="Ideas across different industries"
              description="Explore example concepts across academic projects, business applications, AI solutions, and student productivity tools."
            />

            <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
              {tabs.map((tab) => {
                const count =
                  tab.id === "all"
                    ? projects.length
                    : projects.filter((project) => project.type === tab.id)
                        .length;

                const selected = activeProjectTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProjectTab(tab.id)}
                    aria-pressed={selected}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition duration-200 sm:px-5 ${
                      selected
                        ? "border-violet-300 bg-violet-100 text-violet-900 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    {materialIcon(tab.icon, "text-lg")}
                    <span>{tab.label}</span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-xs ${
                        selected
                          ? "bg-violet-200 text-violet-800"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
              aria-live="polite"
            >
              {filteredProjects.map((project) => (
                <article
                  key={project.title}
                  className={`group flex h-full flex-col rounded-2xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
                    project.featured
                      ? "border-violet-200 shadow-sm hover:border-violet-300 hover:shadow-violet-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${categoryStyles[project.type]}`}
                    >
                      {materialIcon(
                        project.type === "college"
                          ? "school"
                          : project.type === "business"
                            ? "business"
                            : project.type === "student"
                              ? "description"
                              : "psychology",
                        "text-sm",
                      )}
                      {categoryLabels[project.type]}
                    </span>

                    {project.featured && (
                      <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Featured concept
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-violet-600">
                    {project.category}
                    <span className="px-2 text-slate-300">/</span>
                    <span className="font-medium normal-case tracking-normal text-slate-500">
                      {project.meta}
                    </span>
                  </p>

                  <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-bold text-slate-900 transition group-hover:text-violet-700">
                    {project.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={goToContact}
                    className="mt-6 inline-flex items-center justify-between border-t border-slate-100 pt-5 text-left text-sm font-semibold text-slate-700 transition hover:text-violet-700"
                  >
                    Discuss a similar solution
                    {materialIcon(
                      "arrow_outward",
                      "text-lg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                    )}
                  </button>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 p-7 text-center sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200 bg-violet-100 text-violet-600">
                {materialIcon("lightbulb", "text-3xl")}
              </div>
              <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold text-slate-900 sm:text-3xl">
                Have an idea of your own?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Tell us what you want to build. We can discuss the scope,
                suitable technologies, and a practical way to get started.
              </p>
              <button
                onClick={goToContact}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700"
              >
                Tell us about your idea
                {materialIcon("arrow_forward", "text-lg")}
              </button>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="How we work"
              title="A clear path from idea to launch"
              description="A collaborative process that keeps project goals, implementation, and delivery aligned."
            />

            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div className="space-y-3">
                {processSteps.map((step, index) => {
                  const selected = activeStep === index;

                  return (
                    <button
                      key={step.number}
                      onClick={() => changeStep(index)}
                      aria-pressed={selected}
                      className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition duration-300 ${
                        selected
                          ? "border-violet-200 bg-violet-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-violet-100 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-['Space_Grotesk'] text-sm font-bold transition ${
                          selected
                            ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {step.number}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-['Space_Grotesk'] text-lg font-bold text-slate-900">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-slate-600">
                          {step.description}
                        </span>
                      </span>

                      {materialIcon(
                        selected
                          ? "radio_button_checked"
                          : "radio_button_unchecked",
                        `mt-1 text-xl ${
                          selected ? "text-violet-600" : "text-slate-300"
                        }`,
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-7 text-white sm:p-10 lg:min-h-full">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/15 blur-[90px]" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                      PROJECT WORKFLOW
                    </span>
                    <span className="font-['Space_Grotesk'] text-sm text-slate-500">
                      {processSteps[activeStep].number} / 04
                    </span>
                  </div>

                  <div className="mt-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
                    {materialIcon(processSteps[activeStep].icon, "text-4xl")}
                  </div>

                  <h3 className="mt-6 font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
                    {processSteps[activeStep].title}
                  </h3>

                  <p className="mt-4 max-w-xl leading-8 text-slate-400">
                    {processSteps[activeStep].description}
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-300">
                      Expected focus
                    </p>
                    <p className="mt-2 font-medium text-slate-200">
                      {processSteps[activeStep].deliverable}
                    </p>
                  </div>
                </div>

                <div className="relative mt-10">
                  <div className="mb-5 flex gap-2">
                    {processSteps.map((step, index) => (
                      <button
                        key={step.number}
                        onClick={() => changeStep(index)}
                        aria-label={`Show ${step.title} step`}
                        aria-pressed={activeStep === index}
                        className={`h-1.5 flex-1 rounded-full transition duration-300 ${
                          activeStep === index
                            ? "bg-violet-400"
                            : "bg-white/15 hover:bg-white/30"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveStep(
                          (current) =>
                            (current - 1 + processSteps.length) %
                            processSteps.length,
                        );
                        setIsPlaying(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      {materialIcon("arrow_back", "text-lg")}
                      Previous
                    </button>

                    <button
                      onClick={() => setIsPlaying((playing) => !playing)}
                      aria-label={
                        isPlaying
                          ? "Pause automatic steps"
                          : "Resume automatic steps"
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      {materialIcon(
                        isPlaying ? "pause" : "play_arrow",
                        "text-xl",
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setActiveStep(
                          (current) => (current + 1) % processSteps.length,
                        );
                        setIsPlaying(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-violet-100"
                    >
                      Next
                      {materialIcon("arrow_forward", "text-lg")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why VELSAKA */}
        <section className="bg-slate-50 px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                Why VELSAKA TECH
              </span>

              <h2 className="font-['Space_Grotesk'] text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Technology with a
                <span className="block text-violet-600">
                  purpose behind it.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                We focus on understanding the problem first, choosing
                appropriate tools, and creating digital solutions around
                your goals.
              </p>

              <button
                onClick={goToContact}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700"
              >
                Work with us
                {materialIcon("arrow_forward", "text-lg")}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <article
                  key={benefit.title}
                  className={`rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/[0.05] ${
                    index % 2 === 1 ? "sm:translate-y-6" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    {materialIcon(benefit.icon, "text-2xl")}
                  </div>
                  <h3 className="mt-5 font-['Space_Grotesk'] text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - LIGHT THEME */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 via-blue-50 to-white px-6 py-14 text-center text-slate-900 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(139,92,246,0.06),transparent_45%),radial-gradient(ellipse_at_80%_90%,rgba(59,130,246,0.06),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] [background-size:36px_36px]" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200 bg-white text-violet-600 shadow-sm">
                {materialIcon("rocket_launch", "text-3xl")}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
                Your next step starts here
              </p>

              <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Let's build something
                <span className="block bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  meaningful together.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Share your idea, outline your requirements, and let's
                explore the right digital solution for your needs.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={goToContact}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-violet-700"
                >
                  Start a Conversation
                  {materialIcon("arrow_forward", "text-lg")}
                </button>

                <button
                  onClick={goToProjects}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Browse Project Concepts
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;