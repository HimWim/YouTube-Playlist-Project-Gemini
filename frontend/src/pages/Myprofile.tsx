import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfilePlaylists from "../components/profile/ProfilePlaylists";
import type { PlaylistCard } from "../components/profile/ProfilePlaylists";
import ProfileSettings from "../components/profile/ProfileSettings";
import Bubble from "../ui/Bubble";

const Myprofile: React.FC = () => {
  // Mock data - replace with actual data from your state management
  const [userData, setUserData] = useState({
    fullName: "Piyush Kumar",
    email: "piyush@example.com",
    avatar: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    plan: "Pro" as "Free" | "Pro" | "Premium",
    playlistsCreated: 12,
    videosSaved: 45,
    aiPlaylistsGenerated: 8,
    lastActiveDate: "2 days ago",
  });

  const [playlists, setPlaylists] = useState<PlaylistCard[]>([
    {
      id: 1,
      name: "React Tutorial Series",
      thumbnail:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
      videoCount: 15,
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "JavaScript Fundamentals",
      thumbnail:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
      videoCount: 22,
      createdDate: "2024-01-10",
    },
    {
      id: 3,
      name: "TypeScript Advanced",
      thumbnail:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
      videoCount: 8,
      createdDate: "2024-01-05",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"overview" | "settings">(
    "overview"
  );

  const handleEditProfile = () => {
    setActiveTab("settings");
  };

  const handlePlaylistOpen = (id: number) => {
    console.log("Opening playlist:", id);
    // Navigate to playlist or open modal
  };

  const handlePlaylistDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      setPlaylists(playlists.filter((p) => p.id !== id));
      setUserData((prev) => ({
        ...prev,
        playlistsCreated: prev.playlistsCreated - 1,
      }));
    }
  };

  const handleNameChange = (name: string) => {
    setUserData((prev) => ({ ...prev, fullName: name }));
  };

  const handleEmailChange = (email: string) => {
    setUserData((prev) => ({ ...prev, email }));
  };

  const handleAvatarChange = (avatar: string) => {
    setUserData((prev) => ({ ...prev, avatar }));
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    console.log("Dark mode:", enabled);
    // Implement dark mode logic
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account deletion requested");
      // Implement account deletion logic
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Decorative Bubbles */}
      <Bubble position={{ top: 10, left: 10 }} color="#ff004f" />
      <Bubble position={{ bottom: 10, right: 10 }} color="#ff004f" />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-24">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-red-400/40">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "overview"
                ? "text-red-400 border-b-2 border-red-400"
                : "text-gray-400 hover:text-red-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "settings"
                ? "text-red-400 border-b-2 border-red-400"
                : "text-gray-400 hover:text-red-300"
            }`}
          >
            Settings
          </button>
        </div>

        {activeTab === "overview" ? (
          <div className="space-y-8">
            {/* Profile Header */}
            <ProfileHeader
              avatar={userData.avatar}
              fullName={userData.fullName}
              email={userData.email}
              plan={userData.plan}
              onEditClick={handleEditProfile}
            />

            {/* Profile Stats */}
            <ProfileStats
              playlistsCreated={userData.playlistsCreated}
              videosSaved={userData.videosSaved}
              aiPlaylistsGenerated={userData.aiPlaylistsGenerated}
              lastActiveDate={userData.lastActiveDate}
            />

            {/* Profile Playlists */}
            <ProfilePlaylists
              playlists={playlists}
              onOpen={handlePlaylistOpen}
              onDelete={handlePlaylistDelete}
            />
          </div>
        ) : (
          <div className="max-w-3xl">
            <ProfileSettings
              currentName={userData.fullName}
              currentEmail={userData.email}
              currentAvatar={userData.avatar}
              isDarkMode={true}
              onNameChange={handleNameChange}
              onEmailChange={handleEmailChange}
              onAvatarChange={handleAvatarChange}
              onDarkModeToggle={handleDarkModeToggle}
              onDeleteAccount={handleDeleteAccount}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Myprofile;
