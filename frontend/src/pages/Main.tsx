import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
    // <div className="w-full bg-red-500">Him</div>
  );
};

export default Home;
