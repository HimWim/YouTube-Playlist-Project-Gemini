import React from "react";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <div className="relative h-full bg-gray-900 text-white flex flex-col">
        HImanshu
      </div>
    </div>
  );
};

export default Home;
