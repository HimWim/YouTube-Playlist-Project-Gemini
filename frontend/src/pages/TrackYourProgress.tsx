import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaylistWithVideosComponent from "../components/track/PlaylistWithVideos";
import Bubble from "../ui/Bubble";
import { Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockPlaylistData } from "../data/mockDataGenerated";

/* UI-only types */
type UIPlaylistVideo = {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  watched: boolean;
  prerequisites?: string[];
  topics?: { title: string; startTime: string; endTime: string }[];
  relevancyScore: number;
};

type UIPlaylist = {
  id: number;
  name: string;
  thumbnail: string;
  createdDate: string;
  videos: UIPlaylistVideo[];
};

const TrackYourProgress: React.FC = () => {
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState<UIPlaylist[]>(
    mockPlaylistData.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      thumbnail: playlist.thumbnail,
      createdDate: playlist.createdDate,
      videos: playlist.videos.map((video) => ({
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        url: video.url,
        watched: false,
        prerequisites: video.prerequisites,
        topics: video.topics,
        relevancyScore: video.relevancyScore,
      })),
    })),
  );

  const handleVideoToggle = (
    playlistId: number,
    videoId: number,
    watched: boolean,
  ) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              videos: playlist.videos.map((video) =>
                video.id === videoId ? { ...video, watched } : video,
              ),
            }
          : playlist,
      ),
    );
  };

  const handleDeletePlaylist = (playlistId: number) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
    }
  };

  const totalVideos = playlists.reduce(
    (sum, playlist) => sum + playlist.videos.length,
    0,
  );

  const totalWatched = playlists.reduce(
    (sum, playlist) => sum + playlist.videos.filter((v) => v.watched).length,
    0,
  );

  const overallProgress =
    totalVideos > 0 ? (totalWatched / totalVideos) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <Bubble position={{ top: 10, left: 10 }} color="#ff004f" />
      <Bubble position={{ bottom: 10, right: 10 }} color="#ff004f" />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-24">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-red-400 mb-3">
              Track Your Progress
            </h1>
            <p className="text-gray-400 text-lg">
              Monitor your learning journey and mark videos as watched
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 bg-red-400 text-black font-semibold rounded-xl hover:bg-red-300 transition"
          >
            <Plus className="w-5 h-5" />
            Create New Playlist
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Playlists</div>
            <div className="text-3xl font-bold">{playlists.length}</div>
          </div>

          <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Videos</div>
            <div className="text-3xl font-bold">{totalVideos}</div>
          </div>

          <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Overall Progress</div>
            <div className="text-3xl font-bold text-red-400">
              {Math.round(overallProgress)}%
            </div>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* PLAYLISTS */}
        <div className="space-y-6">
          {playlists.map((playlist) => (
            <PlaylistWithVideosComponent
              key={playlist.id}
              playlist={playlist}
              onVideoToggle={handleVideoToggle}
              onDelete={handleDeletePlaylist}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackYourProgress;
