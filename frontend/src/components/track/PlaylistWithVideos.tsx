import React, { useState } from "react";
import { CheckCircle2, Circle, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import type { PlaylistWithVideos, PlaylistVideo } from "../../data/mockProfileData";
import PieChart from "../../ui/PieChart";

interface PlaylistWithVideosProps {
  playlist: PlaylistWithVideos;
  onVideoToggle?: (playlistId: number, videoId: number, watched: boolean) => void;
}

const PlaylistWithVideosComponent: React.FC<PlaylistWithVideosProps> = ({
  playlist,
  onVideoToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredPlaylistId, setHoveredPlaylistId] = useState<number | null>(null);
  const [localVideos, setLocalVideos] = useState<PlaylistVideo[]>(playlist.videos);

  const watchedCount = localVideos.filter((v) => v.watched).length;
  const totalVideos = localVideos.length;
  const progress = totalVideos > 0 ? (watchedCount / totalVideos) * 100 : 0;

  const handleVideoToggle = (videoId: number) => {
    setLocalVideos((prev) =>
      prev.map((video) =>
        video.id === videoId ? { ...video, watched: !video.watched } : video
      )
    );
    const video = localVideos.find((v) => v.id === videoId);
    if (video && onVideoToggle) {
      onVideoToggle(playlist.id, videoId, !video.watched);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-800 border border-red-400/40 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-red-500/20 transition">
      {/* Playlist Header */}
      <div
        className="relative p-6 bg-gradient-to-r from-gray-800 to-gray-900 cursor-pointer"
        onMouseEnter={() => setHoveredPlaylistId(playlist.id)}
        onMouseLeave={() => setHoveredPlaylistId(null)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-6">
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={playlist.thumbnail}
              alt={playlist.name}
              className="w-32 h-20 rounded-lg object-cover"
            />
            {hoveredPlaylistId === playlist.id && !isExpanded && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                <PieChart watched={watchedCount} total={totalVideos} size={80} />
              </div>
            )}
          </div>

          {/* Playlist Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{playlist.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(playlist.createdDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalVideos} videos</span>
              </div>
              <div className="text-red-400 font-semibold">
                {Math.round(progress)}% Complete
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Expand/Collapse Icon */}
          <div className="text-red-400 transition-transform duration-300">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>

      {/* Videos List - Only show when expanded */}
      {isExpanded && (
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-800 border-t border-red-400/20">
        {localVideos.map((video) => (
          <div
            key={video.id}
            className={`flex items-center gap-4 p-4 rounded-lg border transition hover:scale-[1.02] cursor-pointer ${
              video.watched
                ? "bg-gray-900/50 border-green-500/30"
                : "bg-gray-800/50 border-red-400/30"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleVideoToggle(video.id);
            }}
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-24 h-16 rounded-md object-cover"
              />
              {video.watched && (
                <div className="absolute inset-0 bg-green-500/20 rounded-md flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="flex-1">
              <h4
                className={`font-semibold mb-1 ${
                  video.watched ? "text-gray-400 line-through" : "text-white"
                }`}
              >
                {video.title}
              </h4>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{video.duration}</span>
              </div>
            </div>

            {/* Watch Status Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVideoToggle(video.id);
              }}
              className={`p-2 rounded-full transition hover:scale-110 ${
                video.watched
                  ? "text-green-400 hover:text-green-300"
                  : "text-gray-500 hover:text-red-400"
              }`}
            >
              {video.watched ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistWithVideosComponent;
