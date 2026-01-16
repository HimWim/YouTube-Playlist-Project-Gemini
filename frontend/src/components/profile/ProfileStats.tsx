import React from "react";
import { PlaySquare, Video, Sparkles, Clock } from "lucide-react";

interface ProfileStatsProps {
  playlistsCreated: number;
  videosSaved: number;
  aiPlaylistsGenerated: number;
  lastActiveDate: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  playlistsCreated,
  videosSaved,
  aiPlaylistsGenerated,
  lastActiveDate,
}) => {
  const stats = [
    {
      label: "Playlists Created",
      value: playlistsCreated,
      icon: PlaySquare,
      color: "text-red-400",
    },
    {
      label: "Videos Saved",
      value: videosSaved,
      icon: Video,
      color: "text-red-400",
    },
    {
      label: "AI Playlists Generated",
      value: aiPlaylistsGenerated,
      icon: Sparkles,
      color: "text-red-400",
    },
    {
      label: "Last Active",
      value: lastActiveDate,
      icon: Clock,
      color: "text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-red-400/40 rounded-xl p-6 hover:shadow-lg hover:shadow-red-500/20 transition hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} bg-gray-900 p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileStats;
