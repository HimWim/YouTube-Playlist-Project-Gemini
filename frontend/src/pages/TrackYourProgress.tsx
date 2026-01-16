import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaylistWithVideosComponent from "../components/track/PlaylistWithVideos";
import Bubble from "../ui/Bubble";
import { Plus, ArrowRight } from "lucide-react";
import { mockPlaylistsWithVideos, type PlaylistWithVideos, type PlaylistVideo } from "../data/mockProfileData";

const TrackYourProgress: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlaylistWithVideos[]>(
    mockPlaylistsWithVideos
  );
  const [inputLink, setInputLink] = useState("");

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

  const handleAddPlaylist = () => {
    if (!inputLink.trim()) return;

    const isPlaylist = inputLink.includes("playlist");
    if (!isPlaylist) {
      alert("Please enter a valid YouTube playlist link");
      return;
    }

    // Generate mock videos for the new playlist
    const mockVideos: PlaylistVideo[] = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      title: `Video ${i + 1} - New Playlist`,
      thumbnail: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
      duration: `${Math.floor(Math.random() * 30) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}`,
      watched: false,
    }));

    const newPlaylist: PlaylistWithVideos = {
      id: Date.now(),
      name: `New YouTube Playlist - ${new Date().toLocaleDateString()}`,
      thumbnail: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
      videoCount: mockVideos.length,
      createdDate: new Date().toISOString().split("T")[0],
      videos: mockVideos,
    };

    setPlaylists((prev) => [newPlaylist, ...prev]);
    setInputLink("");
  };

  const handleDeletePlaylist = (playlistId: number) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
    }
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

        {/* Add Playlist Input */}
        <div className="bg-gray-800 border border-red-400/40 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Add New Playlist</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Paste YouTube playlist link..."
              value={inputLink}
              onChange={(e) => setInputLink(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddPlaylist();
                }
              }}
              className="flex-1 h-12 px-4 rounded-lg bg-gray-900 border border-red-400/40 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={handleAddPlaylist}
              className="px-6 h-12 bg-red-400 text-black font-semibold flex justify-center items-center rounded-lg hover:bg-red-300 transition hover:scale-105 cursor-pointer"
            >
              <Plus className="h-6 w-6" />
            </button>
            <button
              onClick={handleAddPlaylist}
              className="h-12 px-4 flex items-center gap-1 bg-red-400 text-black font-semibold text-lg rounded-lg hover:bg-red-300 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              ADD <ArrowRight className="w-6 h-6" />
            </button>
          </div>
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
                onDelete={handleDeletePlaylist}
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
