import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileSettings from "../components/profile/ProfileSettings";
import Bubble from "../ui/Bubble";
import { apiService } from "../services/api";
import type { UserProfileData } from "../data/mockProfileData";

const Myprofile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"overview" | "settings">(
    "overview"
  );

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const result = await apiService.getProfile();
      if (result.error) {
        if (result.error.includes("Not authenticated") || result.error.includes("401")) {
          navigate("/login");
        } else {
          console.error("Error fetching profile:", result.error);
        }
      } else if (result.data) {
        // Map API response to UserProfileData format
        const profileData: UserProfileData = {
          fullName: result.data.full_name || "",
          email: result.data.email || "",
          avatar: result.data.avatar || "",
          plan: result.data.plan || "Free",
          playlistsCreated: result.data.playlists_created || 0,
          videosSaved: result.data.videos_saved || 0,
          aiPlaylistsGenerated: result.data.ai_playlists_generated || 0,
          lastActiveDate: result.data.last_active_date || "Never",
        };
        setUserData(profileData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setActiveTab("settings");
  };

  const handleNameChange = async (name: string) => {
    if (!userData) return;
    const result = await apiService.updateProfile({ fullName: name });
    if (!result.error && result.data) {
      setUserData((prev) => prev ? { ...prev, fullName: name } : null);
    }
  };

  const handleEmailChange = async (email: string) => {
    if (!userData) return;
    const result = await apiService.updateProfile({ email });
    if (!result.error && result.data) {
      setUserData((prev) => prev ? { ...prev, email } : null);
    }
  };

  const handleAvatarChange = async (avatar: string) => {
    if (!userData) return;
    const result = await apiService.updateProfile({ avatar });
    if (!result.error && result.data) {
      setUserData((prev) => prev ? { ...prev, avatar } : null);
    }
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    console.log("Dark mode:", enabled);
    // Implement dark mode logic
  };

  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    const result = await apiService.changePassword({ oldPassword, newPassword });
    if (result.error) {
      alert(result.error);
    } else {
      alert("Password changed successfully");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const result = await apiService.deleteAccount();
      if (!result.error) {
        await apiService.logout();
        navigate("/login");
      } else {
        alert(result.error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-red-400">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

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
              onPasswordChange={handlePasswordChange}
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
