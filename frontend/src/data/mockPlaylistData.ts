export type PlaylistItem = {
  id: number;
  title: string;
  thumbnail: string;
  type: "Video" | "Playlist";
  url: string;
};

export const mockPlaylistData: PlaylistItem[] = [
  // 🎵 Playlists
  {
    id: 1,
    title: "Full Stack Development Tutorials",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    type: "Playlist",
    url: "/playlist/PL_DEV_TUTORIALS"
  },
  {
    id: 2,
    title: "React Mastery",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    type: "Playlist",
    url: "/playlist/PL_REACT_MASTER"
  },

  // 🎬 Videos (playlist videos)
  {
    id: 3,
    title: "HTML Crash Course",
    thumbnail:
      "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80",
    type: "Video",
    url: "/watch/VID_HTML_001"
  },
  {
    id: 4,
    title: "CSS Flexbox & Grid",
    thumbnail:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800&q=80",
    type: "Video",
    url: "/watch/VID_CSS_002"
  },
  {
    id: 5,
    title: "JavaScript Fundamentals",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    type: "Video",
    url: "/watch/VID_JS_003"
  },

  // 🎬 React videos
  {
    id: 6,
    title: "React Basics",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
    type: "Video",
    url: "/watch/VID_REACT_004"
  },
  {
    id: 7,
    title: "React Hooks Deep Dive",
    thumbnail:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&q=80",
    type: "Video",
    url: "/watch/VID_REACT_HOOKS_005"
  },

  // 🎯 Standalone videos
  {
    id: 8,
    title: "Developer Roadmap 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    type: "Video",
    url: "/watch/VID_STANDALONE_007"
  },
  {
    id: 9,
    title: "Tech Interview Tips",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    type: "Video",
    url: "/watch/VID_STANDALONE_008"
  }
];
