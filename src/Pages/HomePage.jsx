import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import CoreFeatures from "../components/CoreFeatures";
import TechStack from "../components/TechStack";
import UserJourney from "../components/UserJourney";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden w-full">
      <Header />
      <main className="w-full mt-0">
        <HeroSection />
        <FeatureCards />
        <CoreFeatures />
        <TechStack />
        <UserJourney />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
