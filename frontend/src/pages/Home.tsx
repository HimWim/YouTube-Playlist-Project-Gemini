import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <HeroSection />
    </div>
  );
};

export default Home;
