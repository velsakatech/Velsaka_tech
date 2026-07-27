import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FounderImg from "../assets/AbishekSathiyan.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Custom hook for scroll-triggered animations
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isInView];
};

// Custom hook for animated number counter
const useCountUp = (end, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    if (!startCounting || hasCounted) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setHasCounted(true);
      }
    };
    requestAnimationFrame(step);
  }, [startCounting, end, duration, hasCounted]);

  return count;
};

const About = () => {
  const navigate = useNavigate();

  // Typewriter effect for hero subtitle
  const fullText = "Empowering humanity through next-generation technology.";
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered refs for each major section
  const [storyRef, storyInView] = useInView();
  const [valuesRef, valuesInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  // Animated counter values – will start when stats section is in view
  const clientCount = useCountUp(1, 2000, statsInView);
  const projectsCount = useCountUp(15, 2000, statsInView);
  const ratingCount = useCountUp(5.0, 2000, statsInView);
  const techCount = useCountUp(10, 2000, statsInView);

  // Video ref for hero background
  const videoRef = useRef(null);

  const team = [
    {
      name: "Abishek Sathiyan",
      role: "Founder, Chief Architect, Designer & Developer",
      img: FounderImg,
      active: true,
    },
    {
      name: "Position Open",
      role: "AI Developer ",
      img: null,
      active: false,
      status: "Coming Soon",
    },
    {
      name: "Position Open",
      role: "Machine Learning Engineer",
      img: null,
      active: false,
      status: "Coming Soon",
    },
  ];

  const values = [
    {
      icon: "verified",
      title: "Integrity",
      desc: "Core principle driving excellence.",
    },
    {
      icon: "lightbulb",
      title: "Innovation",
      desc: "Pushing boundaries every day.",
    },
    {
      icon: "target",
      title: "Precision",
      desc: "Engineering with exactitude.",
    },
    {
      icon: "language",
      title: "Cosmic Depth",
      desc: "Thinking beyond horizons.",
    },
  ];

  const stats = [
    {
      icon: "business",
      value: clientCount,
      suffix: "",
      label: "Enterprise Client",
      description: "Trusted partner for innovative solutions",
    },
    {
      icon: "code",
      value: projectsCount,
      suffix: "+",
      label: "Self Projects",
      description: "Full-stack applications & AI integrations",
    },
    {
      icon: "star",
      value: ratingCount,
      suffix: "",
      label: "Client Rating",
      description: "Based on project deliverables",
    },
    {
      icon: "psychology",
      value: techCount,
      suffix: "+",
      label: "Technologies Mastered",
      description: "MERN, AI, Cloud & more",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-['Manrope']">
      <Header />

      <main>
        {/* HERO WITH VIDEO BACKGROUND */}
        <section className="relative min-h-[700px] flex items-center justify-center px-4 sm:px-8 py-16 text-center text-white overflow-hidden">
          {/* Video background */}
          <div className="absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-laptop-close-up-6728-large.mp4"
                type="video/mp4"
              />
              {/* Fallback if video doesn't load */}
              Your browser does not support the video tag.
            </video>
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-black/70" />
          </div>

          {/* Floating animated shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="floating-circle w-32 h-32 bg-indigo-400/30 rounded-full absolute top-20 left-10 animate-float" />
            <div className="floating-circle w-20 h-20 bg-purple-400/30 rounded-full absolute bottom-20 right-10 animate-float-delayed" />
            <div className="floating-triangle absolute top-40 right-20 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-indigo-400/20 animate-float-slow" />
          </div>

          <div className="relative z-10">
            <span className="text-indigo-300 uppercase text-sm sm:text-base tracking-widest font-semibold inline-block animate-fade-in-up">
              Our Vision
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-['Space_Grotesk'] animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Driven by Innovation, <br />
              Defined by Excellence
            </h1>

            <p className="max-w-2xl mx-auto mb-8 text-base sm:text-lg min-h-[3rem] text-gray-200">
              <span className="typewriter-text">{typedText}</span>
              {!typingComplete && <span className="animate-pulse">|</span>}
            </p>

            <div className="flex justify-center gap-4 flex-wrap animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={() => navigate("/services")}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] rounded-xl font-bold text-white hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300 active:scale-95 cursor-pointer font-['Space_Grotesk'] hover:-translate-y-1"
              >
                Explore Solutions
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://abisheksathiyan-portfolio-front-end.vercel.app/",
                    "_blank",
                  )
                }
                className="px-6 sm:px-8 py-3 border border-white/50 rounded-xl font-bold text-white hover:bg-white/10 transition-all duration-300 cursor-pointer font-['Space_Grotesk'] hover:-translate-y-1 backdrop-blur-sm"
              >
                View Our Work
              </button>
            </div>
          </div>
        </section>

        {/* STORY WITH PARALLAX IMAGE */}
        <section ref={storyRef} className={`max-w-[1440px] mx-auto px-4 sm:px-8 py-16 grid md:grid-cols-12 gap-6 items-center transition-all duration-1000 ${storyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="md:col-span-7 bg-gray-50 backdrop-blur-lg border border-gray-200 p-6 sm:p-8 rounded-xl hover:shadow-xl transition-all duration-500">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 font-['Space_Grotesk'] relative inline-block group">
              Our Story
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded at the intersection of orbital mechanics and data science,
              <span className="text-indigo-600 font-semibold">
                {" "}
                VELSAKA TECH
              </span>{" "}
              emerged to redefine deep-tech ecosystems.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              From prototype to powerhouse — technology should be vast yet
              accessible. We believe that complexity shouldn't come at the cost
              of usability.
            </p>

            <p className="text-gray-700 leading-relaxed">
              What started as a vision to bridge advanced technology with
              human-centric design has grown into a journey of continuous
              learning and building innovative solutions.
            </p>
          </div>

          <div className="md:col-span-5 rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-500 parallax-container">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
              className="w-full h-full object-cover parallax-image"
              alt="Story"
            />
          </div>
        </section>

        {/* VALUES */}
        <section ref={valuesRef} className={`max-w-[1440px] mx-auto px-4 sm:px-8 py-16 text-center transition-all duration-1000 ${valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-gray-900 font-['Space_Grotesk'] inline-block relative group">
            The VELSAKA Principles
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => (
              <div
                key={item.title}
                className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:border-indigo-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 mx-auto transition-transform duration-300 hover:rotate-6 hover:scale-110">
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section ref={teamRef} className={`bg-gray-50 py-16 transition-all duration-1000 ${teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-gray-900 font-['Space_Grotesk']">
              Architects of Tomorrow
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={member.name} className="group" style={{ animationDelay: `${idx * 200}ms` }}>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 relative bg-gray-100 transition-shadow duration-300 hover:shadow-2xl">
                    {member.active ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                        <div className="text-center">
                          <span className="material-symbols-outlined text-6xl text-indigo-400 mb-4 animate-pulse">
                            hourglass_empty
                          </span>
                          <p className="text-indigo-600 font-semibold text-lg">
                            {member.status}
                          </p>
                          <p className="text-gray-500 text-sm mt-2">
                            Position Opening Soon
                          </p>
                        </div>
                      </div>
                    )}

                    {member.active && member.role.includes("Founder") && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] text-white text-xs px-2 py-1 rounded-full">
                        Founder
                      </div>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                  <p className="text-indigo-600 text-sm">{member.role}</p>
                  {!member.active && (
                    <p className="text-gray-500 text-xs mt-1">Joining Soon</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS SECTION WITH ANIMATED COUNTERS */}
        <section ref={statsRef} className={`max-w-[1440px] mx-auto px-4 sm:px-8 py-16 bg-white transition-all duration-1000 ${statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 font-['Space_Grotesk']">
              Our Journey in Numbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real metrics from our development journey and project portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center hover:border-indigo-500 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-2xl">
                    {stat.icon}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm font-semibold text-indigo-600 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center animate-fade-in-up">
            <p className="text-sm text-gray-500 bg-gray-100 inline-block px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-indigo-500 text-sm align-middle mr-1">
                info
              </span>
              Currently serving 1 enterprise client with 15+ self-initiated
              projects and growing
            </p>
          </div>
        </section>

        {/* SKILLS HIGHLIGHT */}
        <section ref={skillsRef} className={`max-w-[1440px] mx-auto px-4 sm:px-8 py-16 bg-indigo-50/50 rounded-xl mx-4 sm:mx-8 transition-all duration-1000 ${skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 font-['Space_Grotesk']">
              Technologies We Master
            </h2>
            <p className="text-gray-600">
              Building with modern, scalable tech stack
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "React",
              "Next.js",
              "Node.js",
              "Express",
              "MongoDB",
              "Tailwind CSS",
              "Firebase",
              "JWT",
              "Razorpay",
              "Cloudinary",
              "OpenAI API",
              "Vercel",
            ].map((tech, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-3 rounded-lg text-center text-sm text-gray-700 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section ref={ctaRef} className={`max-w-[1440px] mx-auto px-4 sm:px-8 py-16 transition-all duration-1000 ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-gradient-to-r from-[#6C63FF] to-[#3B82F6] p-8 sm:p-12 rounded-xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/10" />
            {/* Animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white font-['Space_Grotesk']">
                Join our Journey
              </h2>
              <p className="mb-6 text-white/90 text-base sm:text-lg">
                Build the future with us. Let's create something extraordinary
                together.
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 sm:px-8 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 active:scale-95 cursor-pointer hover:-translate-y-1"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 sm:px-8 py-3 border border-white rounded-xl font-bold text-white hover:bg-white/10 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  Partner with Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Custom Animations & Parallax Styles */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        /* Typewriter */
        .typewriter-text {
          display: inline;
          border-right: 2px solid transparent;
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }

        /* Floating shapes */
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
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
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
        .floating-circle {
          animation-duration: inherit;
        }
        .floating-triangle {
          width: 0;
          height: 0;
        }

        /* Parallax effect */
        .parallax-container {
          overflow: hidden;
        }
        .parallax-image {
          transform: scale(1.1);
          transition: transform 0.1s ease-out;
        }
        /* On hover or scroll we could add a more dynamic effect, but for simplicity we use scale on container hover */
        .parallax-container:hover .parallax-image {
          transform: scale(1.02);
        }

        /* Additional animations for entrance */
        @keyframes fade-in-up-staggered {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default About;