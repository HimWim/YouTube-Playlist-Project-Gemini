import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  ChartLineIcon,
  Settings,
  Users,
} from "lucide-react";
import Tooltip from "../ui/Tooltip";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black text-red-400 border-t border-red-500/30 shadow-[0_-4px_20px_rgba(239,68,68,0.15)]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-xl font-bold uppercase tracking-wide">
            YouTube Playlist Project
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 text-sm font-semibold">
            <span className="hover:text-red-300 cursor-pointer transition">
              Home
            </span>
            <span className="hover:text-red-300 cursor-pointer transition">
              About
            </span>
            <span className="hover:text-red-300 cursor-pointer transition">
              Contact
            </span>
            <span className="hover:text-red-300 cursor-pointer transition">
              Privacy
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-red-500/20" />

        {/* Social Icons */}
        <div className="realtive flex gap-5 text-gray-400 justify-end mb-4">
          <Tooltip text="GitHub" position="top">
            <Github className="w-5 h-5 hover:text-red-400 hover:scale-110 transition-all duration-300 cursor-pointer" />
          </Tooltip>

          <Tooltip text="LinkedIn" position="top">
            <Linkedin className="w-5 h-5 hover:text-red-400 hover:scale-110 transition-all duration-300 cursor-pointer" />
          </Tooltip>

          <Tooltip text="Twitter" position="top">
            <Twitter className="w-5 h-5 hover:text-red-400 hover:scale-110 transition-all duration-300 cursor-pointer" />
          </Tooltip>

          <Tooltip text="YouTube" position="top">
            <Youtube className="w-5 h-5 hover:text-red-400 hover:scale-110 transition-all duration-300 cursor-pointer" />
          </Tooltip>
        </div>

        <p className="text-gray-400 flex items-center justify-center">
          © {new Date().getFullYear()} YouTube Playlist Project. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
