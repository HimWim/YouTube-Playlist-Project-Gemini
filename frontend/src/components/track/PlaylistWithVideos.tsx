import React, { useState } from "react";
import { Calendar, Clock, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type {
  PlaylistMock,
  PlaylistVideoItem,
} from "../../data/mockDataGenerated";
import VideoItem from "./VideoItem";

interface PlaylistWithVideosProps {
  playlist: PlaylistMock;
  onVideoToggle?: (
    playlistId: number,
    videoId: number,
    watched: boolean,
  ) => void;
  onDelete?: (playlistId: number) => void;
}

const PlaylistWithVideosComponent: React.FC<PlaylistWithVideosProps> = ({
  playlist,
  onVideoToggle,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [localVideos, setLocalVideos] = useState<PlaylistVideoItem[]>(() =>
    playlist.videos.map((v) => ({ ...v })),
  );

  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const [completedPrereqs, setCompletedPrereqs] = useState<
    Record<string, boolean>
  >({});

  const watchedCount = localVideos.filter((v) => v.watched).length;
  const totalVideos = localVideos.length;
  const progress = totalVideos > 0 ? (watchedCount / totalVideos) * 100 : 0;

  const handleVideoClick = (videoId: number) => {
    setActiveVideoId((prev) => (prev === videoId ? null : videoId));
  };

  const handleVideoToggle = (videoId: number) => {
    setLocalVideos((prev) =>
      prev.map((video) =>
        video.id === videoId ? { ...video, watched: !video.watched } : video,
      ),
    );

    const video = localVideos.find((v) => v.id === videoId);
    if (video && onVideoToggle) {
      onVideoToggle(playlist.id, videoId, !video.watched);
    }
  };

  const handleDeleteVideo = (videoId: number) => {
    setLocalVideos((prev) => prev.filter((v) => v.id !== videoId));

    setCompletedPrereqs((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${videoId}-pre-`)) {
          delete updated[key];
        }
      });
      return updated;
    });

    if (activeVideoId === videoId) {
      setActiveVideoId(null);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  console.log(playlist);

  return (
    <div className="bg-gray-800 border border-red-400/40 rounded-xl overflow-hidden">
      {/* PLAYLIST HEADER */}
      <div
        className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-6">
          <img
            src={playlist.thumbnail}
            alt={playlist.name}
            className="w-32 h-20 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{playlist.name}</h3>

            <div className="flex gap-4 text-sm text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(playlist.createdDate)}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {totalVideos} videos
              </span>

              <span className="text-red-400 font-semibold">
                {Math.round(progress)}% Complete
              </span>
            </div>

            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(playlist.id);
              }}
              className="p-2 text-gray-500 hover:text-red-400"
            >
              <Trash2 />
            </div>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
      </div>

      {/* VIDEOS */}
      <div
        className={`
    overflow-hidden transition-all duration-300 ease-in-out
    ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
    border-t border-red-400/20
  `}
      >
        <div className="p-6 space-y-4">
          {localVideos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              isActive={activeVideoId === video.id}
              completedPrereqs={completedPrereqs}
              onToggleDropdown={() => handleVideoClick(video.id)}
              onToggleWatch={() => handleVideoToggle(video.id)}
              onDelete={() => handleDeleteVideo(video.id)}
              onTogglePrereq={(key) =>
                setCompletedPrereqs((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            />
          ))}

          {localVideos.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              No videos in this playlist
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistWithVideosComponent;
