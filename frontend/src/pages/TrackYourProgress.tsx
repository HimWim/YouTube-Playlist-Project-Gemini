import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaylistWithVideosComponent from "../components/track/PlaylistWithVideos";
import Bubble from "../ui/Bubble";
import { mockPlaylistsWithVideos, type PlaylistWithVideos } from "../data/mockProfileData";

const TrackYourProgress: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlaylistWithVideos[]>(
    mockPlaylistsWithVideos
  );

  const handleVideoToggle = (
    playlistId: number,
    videoId: number,
    watched: boolean
  ) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              videos: playlist.videos.map((video) =>
                video.id === videoId ? { ...video, watched } : video
              ),
            }
          : playlist
      )
    );
  };

  const totalVideos = playlists.reduce(
    (sum, playlist) => sum + playlist.videos.length,
    0
  );
  const totalWatched = playlists.reduce(
    (sum, playlist) =>
      sum + playlist.videos.filter((v) => v.watched).length,
    0
  );
  const overallProgress = totalVideos > 0 ? (totalWatched / totalVideos) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Decorative Bubbles */}
      <Bubble position={{ top: 10, left: 10 }} color="#ff004f" />
      <Bubble position={{ bottom: 10, right: 10 }} color="#ff004f" />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-24">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Track Your Progress
          </h1>
          <p className="text-gray-400 text-lg">
            Monitor your learning journey and mark videos as watched
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Playlists</div>
            <div className="text-3xl font-bold text-white">{playlists.length}</div>
          </div>
          <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Videos</div>
            <div className="text-3xl font-bold text-white">{totalVideos}</div>
          </div>
          <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Overall Progress</div>
            <div className="text-3xl font-bold text-red-400">
              {Math.round(overallProgress)}%
            </div>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Playlists Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Your Playlists</h2>
          {playlists.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 border border-red-400/40 rounded-xl">
              <p className="text-gray-400 text-lg">No playlists to track yet</p>
            </div>
          ) : (
            playlists.map((playlist) => (
              <PlaylistWithVideosComponent
                key={playlist.id}
                playlist={playlist}
                onVideoToggle={handleVideoToggle}
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackYourProgress;
