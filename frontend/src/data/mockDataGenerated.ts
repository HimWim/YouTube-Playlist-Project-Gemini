export type VideoTopic = {
  title: string;
  startTime: string; // mm:ss or hh:mm:ss
  endTime: string;
};

export type PlaylistItem = {
  id: number;
  title: string;
  thumbnail: string;
  type: "Video" | "Playlist";
  url: string;
  prerequisites?: string[];
  topics?: VideoTopic[]; // ✅ only for videos
};



export const mockPlaylistData: PlaylistItem[] = [
  {
    id: 1,
    title: "Full Stack Development Tutorials",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    type: "Video",
    url: "/video/PL_DEV_TUTORIALS",
    prerequisites: [
      "React basics",
      "Functional components",
      "State and props"
    ],
    topics: [
      { title: "Course Overview", startTime: "00:00", endTime: "05:20" },
      { title: "Frontend vs Backend", startTime: "05:21", endTime: "18:40" },
      { title: "Technology Stack", startTime: "18:41", endTime: "35:00" },
      { title: "Learning Roadmap", startTime: "35:01", endTime: "48:00" }
    ]
  },
  {
    id: 2,
    title: "React Mastery",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    type: "Video",
    url: "/video/PL_REACT_MASTER",
    prerequisites: [
      "JavaScript fundamentals",
      "HTML & CSS basics"
    ],
    topics: [
      { title: "What is React?", startTime: "00:00", endTime: "08:15" },
      { title: "JSX Explained", startTime: "08:16", endTime: "20:00" },
      { title: "Component Architecture", startTime: "20:01", endTime: "38:40" },
      { title: "Project Structure", startTime: "38:41", endTime: "55:00" }
    ]
  },

  {
    id: 3,
    title: "HTML Crash Course",
    thumbnail:
      "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80",
    type: "Video",
    url: "/watch/VID_HTML_001",
    prerequisites: [
      "Basic computer usage",
      "Understanding of web browsers"
    ],
    topics: [
      { title: "Introduction to HTML", startTime: "00:00", endTime: "04:30" },
      { title: "HTML Document Structure", startTime: "04:31", endTime: "12:00" },
      { title: "Text & Formatting Tags", startTime: "12:01", endTime: "22:45" },
      { title: "Links & Images", startTime: "22:46", endTime: "32:10" },
      { title: "Forms & Inputs", startTime: "32:11", endTime: "45:00" }
    ]
  },
  {
    id: 4,
    title: "CSS Flexbox & Grid",
    thumbnail:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800&q=80",
    type: "Video",
    url: "/watch/VID_CSS_002",
    prerequisites: [
      "HTML basics",
      "CSS selectors",
      "Box model"
    ],
    topics: [
      { title: "CSS Layout Basics", startTime: "00:00", endTime: "06:20" },
      { title: "Flexbox Fundamentals", startTime: "06:21", endTime: "22:30" },
      { title: "Flexbox Examples", startTime: "22:31", endTime: "35:10" },
      { title: "CSS Grid Basics", startTime: "35:11", endTime: "52:00" }
    ]
  },
  {
    id: 5,
    title: "JavaScript Fundamentals",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    type: "Video",
    url: "/watch/VID_JS_003",
    prerequisites: [
      "HTML basics",
      "Logical thinking"
    ],
    topics: [
      { title: "Variables & Data Types", startTime: "00:00", endTime: "12:40" },
      { title: "Operators & Conditions", startTime: "12:41", endTime: "25:00" },
      { title: "Functions", startTime: "25:01", endTime: "42:20" },
      { title: "Loops", startTime: "42:21", endTime: "55:10" },
      { title: "Arrays & Objects", startTime: "55:11", endTime: "70:30" }
    ]
  },
  {
    id: 6,
    title: "React Basics",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
    type: "Video",
    url: "/watch/VID_REACT_004",
    prerequisites: [
      "JavaScript ES6",
      "DOM basics"
    ],
    topics: [
      { title: "Creating a React App", startTime: "00:00", endTime: "10:15" },
      { title: "JSX & Components", startTime: "10:16", endTime: "25:00" },
      { title: "Props", startTime: "25:01", endTime: "35:20" },
      { title: "State Management", startTime: "35:21", endTime: "48:00" }
    ]
  },
  {
    id: 7,
    title: "React Hooks Deep Dive",
    thumbnail:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&q=80",
    type: "Video",
    url: "/watch/VID_REACT_HOOKS_005",
    prerequisites: [
      "React basics",
      "State & props"
    ],
    topics: [
      { title: "Why Hooks?", startTime: "00:00", endTime: "08:00" },
      { title: "useState", startTime: "08:01", endTime: "20:30" },
      { title: "useEffect", startTime: "20:31", endTime: "38:10" },
      { title: "Custom Hooks", startTime: "38:11", endTime: "65:45" }
    ]
  },
  {
    id: 8,
    title: "Developer Roadmap 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    type: "Video",
    url: "/watch/VID_STANDALONE_007",
    prerequisites: [
      "Interest in software development"
    ],
    topics: [
      { title: "Industry Overview", startTime: "00:00", endTime: "08:45" },
      { title: "Frontend Path", startTime: "08:46", endTime: "18:30" },
      { title: "Backend Path", startTime: "18:31", endTime: "28:10" },
      { title: "Career Advice", startTime: "28:11", endTime: "35:00" }
    ]
  },
  {
    id: 9,
    title: "Tech Interview Tips",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    type: "Video",
    url: "/watch/VID_STANDALONE_008",
    prerequisites: [
      "Basic programming knowledge"
    ],
    topics: [
      { title: "Interview Process Overview", startTime: "00:00", endTime: "07:10" },
      { title: "DSA Preparation", startTime: "07:11", endTime: "20:30" },
      { title: "System Design Basics", startTime: "20:31", endTime: "32:00" },
      { title: "Behavioral Questions", startTime: "32:01", endTime: "42:15" }
    ]
  }
];
