import React, { useState, useRef, useEffect } from "react";

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginIn, setIsLoginIn] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-black text-red-400 p-4 flex justify-between items-center shadow-lg shadow-red-500/20">
      <div className="text-2xl font-bold uppercase tracking-wide">
        YouTube Playlist Project
      </div>

      {!isLoginIn ? (
        <button
          className="relative px-6 h-10 justify-center items-center bg-red-400 text-black rounded-lg hover:bg-red-300 transition"
          onClick={() => setIsLoginIn(true)}
        >
          Log In
        </button>
      ) : (
        <div className="relative flex">
        <div className="flex relative justify-center items-center px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ease-out hover:bg-red-400 hover:text-black hover:scale-110 text-red-400"> Track Your Playlist </div>
        <div className="relative px-6 py-0" ref={dropdownRef}>
          <img
            src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-red-400 cursor-pointer hover:border-red-300  hover:scale-110 transition-all duration-300 ease-out"
            onClick={toggleDropdown}
          />

          {dropdownOpen && (
            <div className="absolute top-12 right-0 bg-gray-900 border border-red-400 rounded-md shadow-lg shadow-red-500/30 z-10 min-w-32">
              <ul className="list-none m-0 p-0">
                <li className="px-4 py-2 border-b border-gray-700 hover:bg-red-400 hover:text-black cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 border-b border-gray-700 hover:bg-red-400 hover:text-black cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-400 hover:text-black cursor-pointer"
                  onClick={() => {
                    setIsLoginIn(false);
                    setDropdownOpen(false);
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        </div>
      )}
    </header>
  );
};

export default Header;
