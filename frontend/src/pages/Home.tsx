import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
    </div>
    // <div className="w-full bg-red-500">Him</div>
  );
};

export default Home;
