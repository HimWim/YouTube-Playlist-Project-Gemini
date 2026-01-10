import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">MyApp</h1>
          <nav className="space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Build Faster with React & Tailwind
            </h2>
            <p className="text-gray-600 mb-6">
              A modern starter home page built using React, TypeScript, and
              Tailwind CSS. Clean, responsive, and production-ready.
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Get Started
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Illustration / Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-semibold mb-4">Why Choose This?</h3>
            <ul className="space-y-3 text-gray-600">
              <li>⚡ Fast & Responsive UI</li>
              <li>🎨 Tailwind Utility Styling</li>
              <li>🛡️ Type-Safe with TypeScript</li>
              <li>📦 Easy to Extend</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-500">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
