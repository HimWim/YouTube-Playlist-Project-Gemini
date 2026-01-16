import {
  ChartLineIcon,
  CircleUserRound,
  LogIn,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "../ui/Tooltip";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToMyprofile = () => {
    navigate("/myprofile");
  };

  const navigateToTrackProgress = () => {
    navigate("/track-progress");
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
    <div className="fixed w-full bg-black text-red-400 shadow-lg shadow-red-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="text-2xl font-bold uppercase">
          YouTube Playlist Project
        </div>

        {/* Right Section */}
        {!isLoggedIn ? (
          <div
            className="px-5 h-10 bg-red-400 text-black rounded-lg hover:bg-red-300 transition flex items-center justify-center text-lg font-semibold hover:cursor-pointer hover:scale-105 duration-300"
            onClick={() => navigateToLogin()}
          >
            Log In <LogIn className="ml-1" />
          </div>
        ) : (
          <div className="relative flex items-center gap-10" ref={dropdownRef}>
            <Tooltip text="Track Your Progress" position="bottom">
              <ChartLineIcon 
                className="w-8 h-8 hover:cursor-pointer hover:text-red-300 hover:scale-110 transition-all duration-300" 
                onClick={navigateToTrackProgress}
              />
            </Tooltip>
            <Tooltip text="Settings" position="bottom">
              <Settings className="w-8 h-8 hover:cursor-pointer hover:text-red-300 hover:scale-110 transition-all duration-300" />
            </Tooltip>
            <Tooltip text="About Us" position="bottom">
              <Users className="w-8 h-8 hover:cursor-pointer hover:text-red-300 hover:scale-110 transition-all duration-300" />
            </Tooltip>
            <Tooltip text="Profile" position="bottom">
              <img
                src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-red-400 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={toggleDropdown}
              />
            </Tooltip>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-gray-900 border border-red-400 rounded-2xl shadow-lg shadow-red-500/30 z-50 min-w-[140px]">
                <ul className="py-1">
                  <li className="px-4 py-2 text-white font-semibold hover:bg-red-300 hover:text-black hover:rounded-2xl cursor-pointer"
                  onClick={navigateToMyprofile}
                  >
                    <CircleUserRound className="inline-block mr-2 mb-1" />
                    Profile 
                  </li>
                  <li
                    className="px-4 py-2 text-white font-semibold hover:bg-red-300 hover:text-black hover:rounded-2xl cursor-pointer"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setDropdownOpen(false);
                    }}
                  >
                    <LogOut className="inline-block mr-2 mb-1" />
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
