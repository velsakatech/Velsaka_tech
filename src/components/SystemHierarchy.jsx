import React, { useEffect, useState } from 'react';

const SystemHierarchy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);

  const modules = [
    { title: 'Product Hub', subtitle: 'Inventory / Sales' },
    { title: 'User Console', subtitle: 'Profiles / Settings' },
    { title: 'Analytics Engine', subtitle: 'Metrics / Insights' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('system-hierarchy');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeouts = modules.map((_, index) => {
        return setTimeout(() => {
          setAnimatedItems(prev => [...prev, index]);
        }, index * 200);
      });
      return () => timeouts.forEach(timeout => clearTimeout(timeout));
    }
  }, [isVisible]);

  return (
    <section
      id="system-hierarchy"
      className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* 🌈 Animated Background – multiple soft shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main central glow (existing) – slightly larger & shifted */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] bg-indigo-200/30 rounded-full blur-[100px] md:blur-[140px] animate-pulse-slow" />

        {/* Floating blob 1 – top left */}
        <div className="absolute top-10 left-10 w-40 h-40 md:w-60 md:h-60 bg-purple-200/25 rounded-full mix-blend-multiply blur-3xl animate-float" />

        {/* Floating blob 2 – bottom right */}
        <div className="absolute bottom-10 right-10 w-48 h-48 md:w-72 md:h-72 bg-teal-200/20 rounded-full mix-blend-multiply blur-3xl animate-float-delayed" />

        {/* Floating blob 3 – middle left */}
        <div className="absolute top-1/3 -left-8 w-32 h-32 md:w-44 md:h-44 bg-pink-200/20 rounded-full mix-blend-multiply blur-2xl animate-float-slow" />

        {/* Floating blob 4 – middle right */}
        <div className="absolute bottom-1/4 -right-10 w-36 h-36 md:w-52 md:h-52 bg-blue-200/20 rounded-full mix-blend-multiply blur-2xl animate-float-medium" />

        {/* Subtle floating particles */}
        <div className="absolute top-1/4 left-[20%] w-2 h-2 bg-indigo-400/40 rounded-full animate-drift" />
        <div className="absolute top-[60%] right-[15%] w-2.5 h-2.5 bg-purple-400/30 rounded-full animate-drift-delayed" />
        <div className="absolute top-[30%] right-[25%] w-1.5 h-1.5 bg-teal-400/40 rounded-full animate-drift-slow" />
        <div className="absolute bottom-[35%] left-[10%] w-2 h-2 bg-pink-400/30 rounded-full animate-drift" />
        <div className="absolute bottom-[20%] left-[40%] w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-drift-delayed" />

        {/* Orbiting glow ring (subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[480px] md:h-[480px] border border-indigo-300/10 rounded-full animate-spin-slow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 font-['Space_Grotesk']">
          System Hierarchy
        </h2>

        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Main Gateway */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <div className="glass-card px-5 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full border border-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-all duration-300 cursor-pointer">
              <span className="font-bold text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl flex items-center gap-2">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                Main Gateway
              </span>
            </div>
          </div>

          {/* Animated Vertical Line */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-0.5 h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-b from-indigo-400 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-ping" />
          </div>

          {/* Sub Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl mx-auto">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-700 ${
                  animatedItems.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Module Box */}
                <div className="relative w-full">
                  <div className="glass-card px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-white/80 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)] transition-all duration-300 hover:-translate-y-1 text-center">
                    <span className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">
                      {module.title}
                    </span>
                  </div>
                </div>

                {/* Vertical Line */}
                <div className="relative">
                  <div className="w-0.5 h-4 sm:h-5 md:h-6 bg-gradient-to-b from-indigo-400/50 to-transparent my-2 sm:my-3"></div>
                  {animatedItems.includes(index) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Subtitle */}
                <div className="text-xs sm:text-sm text-gray-500 text-center">
                  {module.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animations – now including background float/spin/drift */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        /* Floating animations for background blobs */
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(-15px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(18px) translateX(12px); }
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 9s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 11s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }

        /* Drifting particles */
        @keyframes drift {
          0% { transform: translate(0, 0); opacity: 0.4; }
          25% { transform: translate(15px, -15px); opacity: 0.7; }
          50% { transform: translate(5px, -25px); opacity: 0.5; }
          75% { transform: translate(-10px, -10px); opacity: 0.8; }
          100% { transform: translate(0, 0); opacity: 0.4; }
        }
        @keyframes drift-delayed {
          0% { transform: translate(0, 0); opacity: 0.4; }
          25% { transform: translate(-20px, 10px); opacity: 0.6; }
          50% { transform: translate(-10px, 25px); opacity: 0.5; }
          75% { transform: translate(10px, 15px); opacity: 0.7; }
          100% { transform: translate(0, 0); opacity: 0.4; }
        }
        @keyframes drift-slow {
          0% { transform: translate(0, 0); opacity: 0.3; }
          33% { transform: translate(25px, -5px); opacity: 0.6; }
          66% { transform: translate(-15px, 20px); opacity: 0.4; }
          100% { transform: translate(0, 0); opacity: 0.3; }
        }
        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }
        .animate-drift-delayed {
          animation: drift-delayed 10s ease-in-out infinite;
        }
        .animate-drift-slow {
          animation: drift-slow 12s ease-in-out infinite;
        }

        /* Subtle spinning border ring */
        @keyframes spin-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SystemHierarchy;