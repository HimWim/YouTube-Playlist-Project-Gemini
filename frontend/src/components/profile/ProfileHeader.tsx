import React from "react";
import { Edit2, Crown, Zap, Gift } from "lucide-react";

interface ProfileHeaderProps {
  avatar?: string;
  fullName: string;
  email: string;
  plan: "Free" | "Pro" | "Premium";
  onEditClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar = "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  fullName,
  email,
  plan,
  onEditClick,
}) => {
  const getPlanIcon = () => {
    switch (plan) {
      case "Premium":
        return <Crown className="w-4 h-4" />;
      case "Pro":
        return <Zap className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  const getPlanColor = () => {
    switch (plan) {
      case "Premium":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black";
      case "Pro":
        return "bg-gradient-to-r from-purple-400 to-purple-600 text-white";
      default:
        return "bg-gray-700 text-white";
    }
  };

  return (
    <div className="bg-gray-800 border border-red-400/40 rounded-2xl p-8 shadow-lg shadow-red-500/20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <img
            src={avatar}
            alt={fullName}
            className="w-32 h-32 rounded-full border-4 border-red-400 object-cover shadow-lg shadow-red-500/30"
          />
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-red-400 rounded-full flex items-center justify-center border-4 border-gray-800 cursor-pointer hover:bg-red-300 hover:scale-110 transition-all duration-300">
            <Edit2 className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{fullName}</h1>
              <p className="text-gray-400 text-lg">{email}</p>
            </div>

            {/* Plan Badge */}
            <div
              className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 justify-center md:justify-start ${getPlanColor()}`}
            >
              {getPlanIcon()}
              <span>{plan}</span>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={onEditClick}
            className="mt-6 px-6 py-3 bg-red-400 text-black font-semibold rounded-lg hover:bg-red-300 transition hover:scale-105 cursor-pointer flex items-center gap-2 mx-auto md:mx-0"
          >
            <Edit2 className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
