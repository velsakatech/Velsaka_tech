import React from 'react';
import { RocketLaunch, People, CenterFocusStrong, BarChart } from '@mui/icons-material';

const FeatureCards = () => {
  const features = [
    {
      Icon: RocketLaunch,
      title: 'Core Purpose',
      description: 'Revolutionizing the way enterprises interact with cloud-native infrastructure.'
    },
    {
      Icon: People,
      title: 'Target Audience',
      description: 'Built for tech-forward teams and visionary digital architects.'
    },
    {
      Icon: CenterFocusStrong,
      title: 'Key Goals',
      description: '100% uptime, zero-latency integration, and seamless user adoption.'
    },
    {
      Icon: BarChart,
      title: 'Success Metrics',
      description: 'Quantifiable growth through advanced data analytics and reporting.'
    }
  ];

  return (
    <section className="px-3 sm:px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glass-card p-4 sm:p-5 md:p-6 rounded-lg glow-border transition-all space-y-3 sm:space-y-4 hover:translate-y-[-5px] cursor-pointer group"
          >
            {/* Icon container – light theme */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-indigo-100/50 rounded-xl border border-indigo-200 group-hover:bg-indigo-200/70 group-hover:border-indigo-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
              <feature.Icon 
                className="text-indigo-600 group-hover:scale-110 group-hover:text-indigo-700 transition-transform duration-300"
                style={{ fontSize: '24px' }}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 font-['Space_Grotesk'] group-hover:text-indigo-600 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;