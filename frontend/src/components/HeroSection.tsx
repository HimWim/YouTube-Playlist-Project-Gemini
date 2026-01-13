import React, { useState } from "react";
import { mockPlaylistData } from "../data/mockPlaylistData";
import type { PlaylistItem } from "../data/mockPlaylistData";
import { ArrowRight, DeleteIcon, Plus, Trash, Trash2 } from "lucide-react";

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

  return (
    <div className="absolute top-18 py-10 w-full bg-gray-900 text-white flex flex-col">
      {/* Greeting */}
      <div className="max-w-7xl mx-auto px-10 py-6 text-4xl font-semibold text-red-400">
        Hi, Piyush
      </div>

      {/* Title */}
      <div className="text-center text-5xl font-bold mt-6">
        Create Your YouTube Playlist Planning
      </div>

      {/* Input */}
      <div className="max-w-3xl mx-auto mt-12 flex gap-4 px-6">
        <input
          type="text"
          placeholder="Paste YouTube video or playlist link..."
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          className="flex-1 w-150 h-12 px-4 rounded-lg bg-gray-800 border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <div
          onClick={handleAdd}
          className="px-6 h-12 bg-red-400 text-black font-semibold flex justify-center items-center rounded-lg hover:bg-red-300 transition hover:scale-105"
        >
          <Plus className="h-9 w-9"/>
        </div>
        <div onClick={handleAdd} className="h-12 px-4 flex items-center gap-1 
             bg-red-400 text-black font-semibold 
             text-lg md:text-2xl rounded-lg 
             hover:bg-red-300 hover:scale-105
             transition-transform duration-300 ease-in-out">
            SUBMIT <ArrowRight className="w-9 h-9" />
        </div>
      </div>

      {/* Playlist / Video List */}
      <div
        className="    max-w-5xl mx-auto mt-14 px-6 space-y-4 h-105 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-800 "
      >
        {items.length === 0 ? (
          <p className="text-center text-gray-400">
            No videos or playlists added yet
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex w-150 items-center gap-4 bg-gray-800 border border-red-400/40 rounded-lg p-4 hover:shadow-lg hover:shadow-red-500/20 transition hover:scale-[1.02] hover:cursor-pointer"
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
                  Type: <span className="text-red-400">{item.type}</span>
                </p>
              </div>

              {/* Badge */}
              <span className="px-3 py-1 text-sm rounded-full bg-red-400 text-black font-semibold">
                {item.type}
              </span>
               <Trash2 className="text-gray-500 hover:text-gray-200"/>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeroSection;
