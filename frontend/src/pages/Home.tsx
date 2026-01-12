import React from "react";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col">
      <Header />
      {/* Hero Section */}
      {/* <main className="grow">
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-green-400 mb-4">
              Welcome to YouTube Playlist Project
            </h2>
            <p className="text-gray-300 mb-6">
              Manage your YouTube playlists with ease. A modern application
              built using React, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-green-600 text-black rounded-lg hover:bg-green-500 transition">
                Get Started
              </button>
              <button className="px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition">
                Learn More
              </button>
            </div>
          </div>

          
          <div className="bg-gray-800 rounded-2xl shadow-lg shadow-green-500/20 p-8 border border-green-400">
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Features
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>⚡ Fast & Responsive UI</li>
              <li>🎨 Dark Theme with Green Accents</li>
              <li>🛡️ Type-Safe with TypeScript</li>
              <li>📦 Easy Playlist Management</li>
            </ul>
          </div>
        </section>
      </main> */}
    </div>
  );
};

export default Home;
