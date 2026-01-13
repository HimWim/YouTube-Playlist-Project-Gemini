import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const navigateToLogin = () => {
    navigate("/login");
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
    <div className="z-100 fixed top-0 w-full bg-black text-red-400 shadow-lg shadow-red-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="text-2xl font-bold uppercase">
          YouTube Playlist Project
        </div>

        {/* Right Section */}
        {!isLoggedIn ? (
          <button
            className="px-6 h-10 bg-red-400 text-black rounded-lg hover:bg-red-300 transition"
            onClick={() => navigateToLogin()}
          >
            Log In
          </button>
        ) : (
          <div className="relative flex items-center gap-4" ref={dropdownRef}>
            <div className="cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-400 hover:text-black">
              Track Your Playlist
            </div>

            <img
              src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-red-400 cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={toggleDropdown}
            />

            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-gray-900 border border-red-400 rounded-md shadow-lg shadow-red-500/30 z-50 min-w-[140px]">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-red-400 hover:text-black cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-red-400 hover:text-black cursor-pointer">
                    Settings
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-red-400 hover:text-black cursor-pointer"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setDropdownOpen(false);
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
