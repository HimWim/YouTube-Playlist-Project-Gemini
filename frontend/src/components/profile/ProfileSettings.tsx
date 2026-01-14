import React, { useState } from "react";
import { User, Mail, Image, Moon, Sun, Trash2, Save } from "lucide-react";

interface ProfileSettingsProps {
  currentName: string;
  currentEmail: string;
  currentAvatar?: string;
  isDarkMode: boolean;
  onNameChange?: (name: string) => void;
  onEmailChange?: (email: string) => void;
  onAvatarChange?: (avatar: string) => void;
  onDarkModeToggle?: (enabled: boolean) => void;
  onDeleteAccount?: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  currentName,
  currentEmail,
  currentAvatar = "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  isDarkMode,
  onNameChange,
  onEmailChange,
  onAvatarChange,
  onDarkModeToggle,
  onDeleteAccount,
}) => {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [darkMode, setDarkMode] = useState(isDarkMode);

  const handleSave = () => {
    onNameChange?.(name);
    onEmailChange?.(email);
    onAvatarChange?.(avatar);
    onDarkModeToggle?.(darkMode);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
        onAvatarChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

      {/* Change Name */}
      <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Change Name</h3>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-gray-900 border border-red-400/40 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Enter your full name"
        />
      </div>

      {/* Change Email */}
      <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Change Email</h3>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-gray-900 border border-red-400/40 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Enter your email"
        />
      </div>

      {/* Change Avatar */}
      <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Image className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Change Avatar</h3>
        </div>
        <div className="flex items-center gap-6">
          <img
            src={avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-2 border-red-400 object-cover"
          />
          <label className="px-6 py-3 bg-red-400 text-black font-semibold rounded-lg hover:bg-red-300 transition hover:scale-105 cursor-pointer flex items-center gap-2">
            <Image className="w-5 h-5" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? (
              <Moon className="w-5 h-5 text-red-400" />
            ) : (
              <Sun className="w-5 h-5 text-red-400" />
            )}
            <h3 className="text-lg font-semibold text-white">Dark Mode</h3>
          </div>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              onDarkModeToggle?.(!darkMode);
            }}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              darkMode ? "bg-red-400" : "bg-gray-600"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full px-6 py-3 bg-red-400 text-black font-semibold rounded-lg hover:bg-red-300 transition hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save Changes
      </button>

      {/* Danger Zone */}
      <div className="bg-gray-800 border-2 border-red-500/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
        <p className="text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={onDeleteAccount}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
