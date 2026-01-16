import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { mockPlaylistData } from "../data/mockDataGenerated";
import {
  PlayCircle,
  NotebookPen,
  Save,
  Plus,
  Clock,
  CheckCheck,
  CircleCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const [completedPrereqs, setCompletedPrereqs] = useState<
    Record<string, boolean>
  >({});

  const toggleVideoSeen = (id: number) => {
    setCompletedVideos((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const togglePrereq = (key: string) => {
    setCompletedPrereqs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 🎯 Relevancy Logic
  const getRelevancy = (video: any) => {
    const score =
      (video.prerequisites?.length || 0) + (video.topics?.length || 0);

    if (score >= 8) return { label: "High", color: "bg-red-500" };
    if (score >= 5) return { label: "Medium", color: "bg-yellow-400" };
    return { label: "Low", color: "bg-green-400" };
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-28 max-w-7xl mx-auto px-6">
        {/* 🔥 TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-14">
          <div>
            <h1 className="text-4xl font-extrabold text-red-400 mb-2">
              Video Learning Hub
            </h1>
            <p className="text-gray-400">
              Follow the order, complete topics, and master skills
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-900 border border-red-400/40 rounded-xl hover:bg-red-400 hover:text-black transition-all">
              <Save className="w-5 h-5" />
              Save this Playlist
            </button>

            <button className="flex items-center gap-2 px-5 py-3 bg-red-400 text-black font-semibold rounded-xl hover:bg-red-300 transition-all">
              <Plus className="w-5 h-5" />
              Create New Playlist
            </button>
          </div>
        </div>

        {/* 🎬 VIDEO LIST */}
        <div className="space-y-12">
          {mockPlaylistData.map((video, index) => {
            const isCompleted = completedVideos.includes(video.id);
            const relevancy = getRelevancy(video);

            return (
              <div
                key={video.id}
                className={`relative bg-gray-900 border rounded-2xl shadow-lg overflow-hidden transition-all
                ${
                  isCompleted
                    ? "border-green-400/40 shadow-green-500/20"
                    : "border-red-500/20 shadow-red-500/20"
                }`}
              >
                {/* 🔢 ORDER NUMBER */}
                <div className="absolute top-4 left-4 bg-red-400 text-black font-bold w-9 h-9 flex items-center justify-center rounded-full">
                  {index + 1}
                </div>

                {/* 🔥 RELEVANCY */}
                {/* <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full text-black ${relevancy.color}`}
                >
                  {relevancy.label} Relevancy
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Thumbnail */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover md:h-64"
                  />

                  {/* Content */}
                  <div className="md:col-span-2 p-6 flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-2 text-red-400">
                          <PlayCircle className="w-5 h-5" />
                          <span className="uppercase text-sm font-semibold">
                            Video
                          </span>
                        </div>

                        <label className={`flex items-center gap-2 text-sm cursor-pointer font-semibold ${
                              isCompleted ? "text-green-400" : "text-gray-400"
                            }`}>
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleVideoSeen(video.id)}
                            className={`accent-green-400 w-4 h-4 hover:cursor-pointer`}
                          />
                          Seen
                        </label>
                      </div>

                      <h2 className="text-2xl font-bold mb-4">{video.title}</h2>

                      {/* 📌 PREREQUISITES (Scrollable) */}
                      <div className="mb-4 bg-black/50 border border-red-400/30 rounded-xl p-4 max-h-36 overflow-y-auto">
                        <p className="text-red-300 font-semibold mb-2">
                          Prerequisites
                        </p>
                        <ul className="space-y-2">
                          {video.prerequisites?.map((req, i) => {
                            const key = `${video.id}-pre-${i}`;
                            return (
                              <li
                                key={key}
                                className="flex items-center gap-3 text-gray-300"
                              >
                                <input
                                  type="checkbox"
                                  checked={!!completedPrereqs[key]}
                                  onChange={() => togglePrereq(key)}
                                  className="accent-green-400 w-4 h-4 hover:cursor-pointer"
                                />
                                <span
                                  className={
                                    completedPrereqs[key]
                                      ? "line-through text-gray-500"
                                      : ""
                                  }
                                >
                                  {req}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* ⏱ TOPICS TIMELINE (Scrollable) */}
                      <div className="bg-black/50 border border-red-400/30 rounded-xl p-4 max-h-44 overflow-y-auto">
                        <p className="text-red-300 font-semibold mb-2">
                          Topics Covered
                        </p>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          {video.topics?.map((topic, i) => (
                            <li
                              key={i}
                              className="flex justify-between items-center"
                            >
                              <span>• {topic.title}</span>
                              <span className="flex items-center gap-1 text-gray-400">
                                <Clock className="w-4 h-4" />
                                {topic.startTime} - {topic.endTime}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 🎯 ACTION BUTTONS */}
                    <div className="mt-6 flex flex-wrap gap-4">
                      <button
                        onClick={() => navigate(video.url)}
                        className="px-6 py-3 bg-red-400 text-black font-semibold rounded-xl hover:bg-red-300 hover:cursor-pointer transition-all"
                      >
                        Watch Video
                      </button>

                      <button
                        onClick={() => navigate(`/notes/${video.id}`)}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-800 border border-red-400/30 rounded-xl hover:bg-gray-700 hover:cursor-pointer transition-all"
                      >
                        <NotebookPen className="w-5 h-5 text-red-300" />
                        Create Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Main;
