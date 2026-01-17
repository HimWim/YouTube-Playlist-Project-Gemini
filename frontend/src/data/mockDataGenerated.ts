export type VideoTopic = {
  title: string;
  startTime: string;
  endTime: string;
};

export interface PlaylistVideoItem {
  id: number;
  title: string;
  thumbnail: string;
  url: string;

  prerequisites?: string[];
  topics?: VideoTopic[];

  relevancyScore: number; // 1–10
  watched: boolean;
}

export interface PlaylistMock {
  id: number;
  name: string;
  thumbnail: string;
  createdDate: string;
  videos: PlaylistVideoItem[];
}

export const mockPlaylistData: PlaylistMock[] = [
  // 🔥 PLAYLIST 1
  {
    id: 1,
    name: "Full Stack Development",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    createdDate: "2024-01-10",
    videos: [
      {
        id: 101,
        title: "Full Stack Overview",
        thumbnail:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        url: "/video/fullstack-overview",
        relevancyScore: 9,
        prerequisites: [
          "Basic programming knowledge",
          "Understanding of web apps",
        ],
        topics: [
          {
            title: "What is Full Stack?",
            startTime: "00:00",
            endTime: "08:00",
          },
          {
            title: "Frontend vs Backend",
            startTime: "08:01",
            endTime: "20:00",
          },
          { title: "Career Roadmap", startTime: "20:01", endTime: "35:00" },
        ],
        watched: false,
      },
      {
        id: 102,
        title: "Frontend Fundamentals",
        thumbnail:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
        url: "/video/frontend-fundamentals",
        relevancyScore: 8,
        prerequisites: ["HTML basics", "CSS basics"],
        topics: [
          { title: "HTML Structure", startTime: "00:00", endTime: "10:30" },
          { title: "CSS Layouts", startTime: "10:31", endTime: "25:00" },
          { title: "JavaScript Intro", startTime: "25:01", endTime: "40:00" },
        ],
        watched: false,
      },
    ],
  },

  // 🚀 PLAYLIST 2
  {
    id: 2,
    name: "React Mastery",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    createdDate: "2024-02-05",
    videos: [
      {
        id: 201,
        title: "React Basics",
        thumbnail:
          "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
        url: "/video/react-basics",
        relevancyScore: 7,
        prerequisites: ["JavaScript fundamentals", "DOM basics"],
        topics: [
          { title: "What is React?", startTime: "00:00", endTime: "07:00" },
          { title: "JSX", startTime: "07:01", endTime: "18:00" },
          { title: "Components", startTime: "18:01", endTime: "35:00" },
        ],
        watched: false,
      },
      {
        id: 202,
        title: "React Hooks Deep Dive",
        thumbnail:
          "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&q=80",
        url: "/video/react-hooks",
        relevancyScore: 9,
        prerequisites: ["React basics", "State & props"],
        topics: [
          { title: "Why Hooks?", startTime: "00:00", endTime: "06:00" },
          { title: "useState", startTime: "06:01", endTime: "20:00" },
          { title: "useEffect", startTime: "20:01", endTime: "38:00" },
        ],
        watched: false,
      },
    ],
  },

  // ⚡ PLAYLIST 3
  {
    id: 3,
    name: "JavaScript Core",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    createdDate: "2024-03-01",
    videos: [
      {
        id: 301,
        title: "JavaScript Fundamentals",
        thumbnail:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        url: "/video/js-fundamentals",
        relevancyScore: 8,
        prerequisites: ["HTML basics", "Logical thinking"],
        topics: [
          { title: "Variables", startTime: "00:00", endTime: "12:40" },
          { title: "Conditions", startTime: "12:41", endTime: "25:00" },
          { title: "Functions", startTime: "25:01", endTime: "42:20" },
        ],
        watched: false,
      },
      {
        id: 302,
        title: "Advanced JavaScript",
        thumbnail:
          "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800&q=80",
        url: "/video/advanced-js",
        relevancyScore: 6,
        prerequisites: ["JavaScript fundamentals"],
        topics: [
          { title: "Closures", startTime: "00:00", endTime: "15:00" },
          { title: "Async / Await", startTime: "15:01", endTime: "32:00" },
          { title: "Event Loop", startTime: "32:01", endTime: "48:00" },
        ],
        watched: false,
      },
    ],
  },
];
