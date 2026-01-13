import React, { useState } from "react";
import { mockPlaylistData } from "../data/mockPlaylistData";
import type { PlaylistItem } from "../data/mockPlaylistData";
import { ArrowRight, DeleteIcon, Plus, Trash, Trash2 } from "lucide-react";
import Bubble from "../ui/Bubble";

const HeroSection: React.FC = () => {
  const [inputLink, setInputLink] = useState("");
  const [items, setItems] = useState<PlaylistItem[]>(mockPlaylistData);

  const handleAdd = () => {
    if (!inputLink.trim()) return;

    // Match existing mock structure
    const isPlaylist = inputLink.includes("playlist");

    const newItem: PlaylistItem = {
      id: Date.now(),
      title: isPlaylist ? "New YouTube Playlist" : "New YouTube Video",
      thumbnail:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
      type: isPlaylist ? "Playlist" : "Video",
      url: inputLink,
    };

    setItems((prev) => [newItem, ...prev]);
    setInputLink("");
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col py-10">
      {/* Greeting */}

      <Bubble position={{ top: 10, left: 10 }} color="#ff004f" />
      <Bubble position={{ bottom: 10, right: 10 }} color="#ff004f" />

      <div className="mt-10 max-w-7xl mx-auto px-10 py-6 text-4xl font-semibold text-red-400">
        Hi, Piyush
      </div>

      {/* Title */}
      <div className="text-center text-5xl font-bold mt-6">
        Create Your YouTube Playlist Planning
      </div>

      {/* Input */}
      <div className="max-w-3xl mx-auto mt-12 flex gap-4 px-6 w-full">
        <input
          type="text"
          placeholder="Paste YouTube video or playlist link..."
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          className="flex-1 h-12 px-4 rounded-lg bg-gray-800 border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          onClick={handleAdd}
          className="px-6 h-12 bg-red-400 text-black font-semibold flex justify-center items-center rounded-lg hover:bg-red-300 transition hover:scale-105 cursor-pointer"
        >
          <Plus className="h-9 w-9" />
        </button>
        <button
          onClick={handleAdd}
          className="h-12 px-4 flex items-center gap-1 
             bg-red-400 text-black font-semibold 
             text-lg md:text-2xl rounded-lg 
             hover:bg-red-300 hover:scale-105
             transition-transform duration-300 ease-in-out cursor-pointer"
        >
          SUBMIT <ArrowRight className="w-9 h-9" />
        </button>
      </div>

      {/* Playlist / Video List */}
      <div className="max-w-5xl mx-auto mt-14 px-6 space-y-4 flex-1 overflow-y-auto  max-h-[100vh] pr-2 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-800 w-full">
        {items.length === 0 ? (
          <p className="text-center text-gray-400">
            No videos or playlists added yet
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="m-5 flex items-center gap-4 bg-gray-800 border border-red-400/40 rounded-lg p-4 hover:shadow-lg hover:shadow-red-500/20 transition hover:scale-[1.02] hover:cursor-pointer"
            >
              {/* Thumbnail */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-16 rounded-md object-cover"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400 flex ">
                  Type: <span className="text-red-400 ml-1">{item.type}</span>
                </p>
              </div>

              {/* Badge */}
              <span className="px-3 py-1 text-sm rounded-full bg-red-400 text-black font-semibold">
                {item.type}
              </span>
              <Trash2
                className="text-gray-500 hover:text-white cursor-pointer transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeroSection;
