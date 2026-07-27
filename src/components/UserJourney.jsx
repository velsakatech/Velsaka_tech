import React, { useState, useEffect } from "react";

const UserJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    { step: "1", title: "Visit", desc: "Landing on our high-speed gateway" },
    { step: "2", title: "Explore", desc: "Discovering modules tailored to you" },
    { step: "3", title: "Learn", desc: "Interactive guides and documentation" },
    { step: "4", title: "Take Action", desc: "Full integration and deployment" },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prevStep) => (prevStep + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const goToStep = (index) => {
    setActiveStep(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 font-['Space_Grotesk']">
          The User Journey
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center gap-2 sm:gap-3 cursor-pointer transition-all duration-500 ${
                activeStep === index
                  ? "scale-100 sm:scale-105"
                  : "opacity-75 hover:opacity-100"
              }`}
              onClick={() => goToStep(index)}
            >
              {/* Step Circle */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center font-bold text-base sm:text-lg md:text-xl transition-all duration-500 ${
                  activeStep === index
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg scale-110 ring-4 ring-indigo-200/50"
                    : activeStep > index
                      ? "bg-green-100 border-2 border-green-400 text-green-700"
                      : "bg-white border-2 border-gray-300 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                {activeStep > index ? "✓" : item.step}
              </div>

              {/* Title */}
              <h4
                className={`text-sm sm:text-base md:text-lg font-bold transition-all duration-500 ${
                  activeStep === index
                    ? "text-indigo-600"
                    : activeStep > index
                      ? "text-green-600"
                      : "text-gray-700"
                }`}
              >
                {item.title}
              </h4>

              {/* Description – now clearly visible (black/dark) */}
              <p className="hidden sm:block text-xs sm:text-sm text-gray-800 max-w-[150px] leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Mobile description – also dark */}
        <div className="block sm:hidden text-center mt-8">
          <p className="text-sm text-gray-800 px-4 font-medium">
            {steps[activeStep].desc}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserJourney;