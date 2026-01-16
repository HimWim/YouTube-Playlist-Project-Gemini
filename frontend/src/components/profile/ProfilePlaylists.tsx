import React, { useState } from "react";
import { ExternalLink, Trash2, Calendar } from "lucide-react";

export interface PlaylistCard {
  id: number;
  name: string;
  thumbnail: string;
  videoCount: number;
  createdDate: string;
}

interface ProfilePlaylistsProps {
  playlists: PlaylistCard[];
  onOpen?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ProfilePlaylists: React.FC<ProfilePlaylistsProps> = ({
  playlists,
  onOpen,
  onDelete,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Your Playlists</h2>
      {playlists.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 border border-red-400/40 rounded-xl">
          <p className="text-gray-400 text-lg">No playlists created yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 border border-red-400/40 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-red-500/20 transition hover:scale-[1.02] relative group"
              onMouseEnter={() => setHoveredId(playlist.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-48 bg-gray-700 overflow-hidden">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Hover Actions */}
                {hoveredId === playlist.id && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-opacity">
                    <button
                      onClick={() => onOpen?.(playlist.id)}
                      className="px-4 py-2 bg-red-400 text-black font-semibold rounded-lg hover:bg-red-300 transition hover:scale-105 flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </button>
                    <button
                      onClick={() => onDelete?.(playlist.id)}
                      className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition hover:scale-105 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 truncate">
                  {playlist.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="text-red-400 font-medium">
                    {playlist.videoCount} {playlist.videoCount === 1 ? "video" : "videos"}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(playlist.createdDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePlaylists;
