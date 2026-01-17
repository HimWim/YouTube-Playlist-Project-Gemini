import React from "react";
import {
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  NotebookPen,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PlaylistVideoItem } from "../../data/mockDataGenerated";

interface VideoItemProps {
  video: PlaylistVideoItem;
  isActive: boolean;
  completedPrereqs: Record<string, boolean>;
  onToggleWatch: () => void;
  onToggleDropdown: () => void;
  onDelete: () => void;
  onTogglePrereq: (key: string) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  isActive,
  completedPrereqs,
  onToggleWatch,
  onToggleDropdown,
  onDelete,
  onTogglePrereq,
}) => {
  const navigate = useNavigate();

  const relevancyPercent = Math.round(
    (video.relevancyScore / 10) * 100
  );

  // console.log(video)

  return (
    <div>
      {/* VIDEO ROW */}
      <div
        onClick={onToggleDropdown}
        className="relative flex items-center gap-4 p-4 rounded-lg border cursor-pointer bg-gray-800/60 border-red-400/30"
      >
        <span className="absolute top-2 right-10 text-xs font-bold text-red-400">
          Relevancy {relevancyPercent}%
        </span>

        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-24 h-16 rounded-md object-cover"
        />

        <div className="flex-1">
          <h4
            className={`font-semibold ${
              video.watched
                ? "line-through text-gray-500"
                : "text-white"
            }`}
          >
            {video.title}
          </h4>
        </div>

        {/* WATCH */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatch();
          }}
        >
          {video.watched ? (
            <CheckCircle2 className="text-green-400" />
          ) : (
            <Circle className="text-gray-500" />
          )}
        </button>

        {/* DELETE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 text-gray-500 hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* DROPDOWN */}
      <div
          className={`
          ml-10 overflow-hidden transition-all duration-300 ease-out
          ${isActive
            ? "max-h-[800px] opacity-100 translate-y-0 mt-3"
            : "max-h-0 opacity-0 -translate-y-2 mt-0"}
        `}
      >
        <div className="p-4 bg-black/50 border border-red-400/30 rounded-xl space-y-4">     
          {video.prerequisites && video.prerequisites.length > 0 && (
            <div>
              <p className="text-red-300 font-semibold mb-2">
                Prerequisites
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                {video.prerequisites.map((p, i) => {
                  const key = `${video.id}-pre-${i}`;
                  return (
                    <li key={key} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!completedPrereqs[key]}
                        onChange={() => onTogglePrereq(key)}
                        className="accent-green-400 w-4 h-4"
                      />
                      <span
                        className={
                          completedPrereqs[key]
                            ? "line-through text-gray-500"
                            : ""
                        }
                      >
                        {p}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* TOPICS */}
          {video.topics && video.topics.length > 0 && (
            <div>
              <p className="text-red-300 font-semibold mb-2">
                Topics Covered
              </p>
              <ul className="space-y-1 text-sm text-gray-300">
                {video.topics.map((t, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{t.title}</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {t.startTime} – {t.endTime}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(video.url)}
              className="flex items-center gap-2 px-4 py-2 bg-red-400 text-black rounded-lg font-semibold"
            >
              <PlayCircle className="w-4 h-4" />
              Watch Video
            </button>

            <button
              onClick={() => navigate(`/notes/${video.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-red-400/30 rounded-lg"
            >
              <NotebookPen className="w-4 h-4 text-red-300" />
              Create Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
