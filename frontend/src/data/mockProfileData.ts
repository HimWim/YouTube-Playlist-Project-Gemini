import type { PlaylistCard } from "../components/profile/ProfilePlaylists";

export type UserProfileData = {
  fullName: string;
  email: string;
  avatar: string;
  plan: "Free" | "Pro" | "Premium";
  playlistsCreated: number;
  videosSaved: number;
  aiPlaylistsGenerated: number;
  lastActiveDate: string;
};

export const mockUserProfileData: UserProfileData = {
  fullName: "Piyush Kumar",
  email: "piyush@example.com",
  avatar: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  plan: "Pro",
  playlistsCreated: 12,
  videosSaved: 45,
  aiPlaylistsGenerated: 8,
  lastActiveDate: "2 days ago",
};

export const mockProfilePlaylists: PlaylistCard[] = [
  {
    id: 1,
    name: "React Tutorial Series",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    videoCount: 15,
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    name: "JavaScript Fundamentals",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    videoCount: 22,
    createdDate: "2024-01-10",
  },
  {
    id: 3,
    name: "TypeScript Advanced",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    videoCount: 8,
    createdDate: "2024-01-05",
  },
];

export interface PlaylistVideo {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  watched: boolean;
}

export interface PlaylistWithVideos {
  id: number;
  name: string;
  thumbnail: string;
  videoCount: number;
  createdDate: string;
  videos: PlaylistVideo[];
}

export const mockPlaylistsWithVideos: PlaylistWithVideos[] = [
  {
    id: 1,
    name: "React Tutorial Series",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    videoCount: 15,
    createdDate: "2024-01-15",
    videos: [
      {
        id: 1,
        title: "React Introduction - Getting Started",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "12:34",
        watched: true,
      },
      {
        id: 2,
        title: "Components and Props Explained",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "18:45",
        watched: true,
      },
      {
        id: 3,
        title: "State and Lifecycle Methods",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "22:10",
        watched: true,
      },
      {
        id: 4,
        title: "Hooks: useState and useEffect",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "25:30",
        watched: false,
      },
      {
        id: 5,
        title: "Custom Hooks Deep Dive",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "20:15",
        watched: false,
      },
      {
        id: 6,
        title: "Context API and State Management",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "28:45",
        watched: false,
      },
      {
        id: 7,
        title: "React Router Navigation",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "15:20",
        watched: false,
      },
      {
        id: 8,
        title: "Performance Optimization",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "30:00",
        watched: false,
      },
      {
        id: 9,
        title: "Testing React Components",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "19:30",
        watched: false,
      },
      {
        id: 10,
        title: "Building a Todo App",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "35:10",
        watched: false,
      },
      {
        id: 11,
        title: "Advanced Patterns",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "24:50",
        watched: false,
      },
      {
        id: 12,
        title: "Deployment Strategies",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "17:25",
        watched: false,
      },
      {
        id: 13,
        title: "Best Practices",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "21:40",
        watched: false,
      },
      {
        id: 14,
        title: "Common Mistakes to Avoid",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "14:15",
        watched: false,
      },
      {
        id: 15,
        title: "Next Steps and Resources",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "10:30",
        watched: false,
      },
    ],
  },
  {
    id: 2,
    name: "JavaScript Fundamentals",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    videoCount: 22,
    createdDate: "2024-01-10",
    videos: [
      {
        id: 16,
        title: "JavaScript Basics",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "15:20",
        watched: true,
      },
      {
        id: 17,
        title: "Variables and Data Types",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "18:45",
        watched: true,
      },
      {
        id: 18,
        title: "Functions and Scope",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "22:30",
        watched: true,
      },
      {
        id: 19,
        title: "Arrays and Objects",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "25:10",
        watched: false,
      },
      {
        id: 20,
        title: "ES6+ Features",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "30:45",
        watched: false,
      },
    ],
  },
  {
    id: 3,
    name: "TypeScript Advanced",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    videoCount: 8,
    createdDate: "2024-01-05",
    videos: [
      {
        id: 21,
        title: "TypeScript Introduction",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "20:15",
        watched: true,
      },
      {
        id: 22,
        title: "Types and Interfaces",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "24:30",
        watched: true,
      },
      {
        id: 23,
        title: "Generics Explained",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "28:20",
        watched: false,
      },
      {
        id: 24,
        title: "Advanced Types",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "32:10",
        watched: false,
      },
      {
        id: 25,
        title: "Decorators and Metadata",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "26:45",
        watched: false,
      },
      {
        id: 26,
        title: "TypeScript with React",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "35:20",
        watched: false,
      },
      {
        id: 27,
        title: "Best Practices",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "19:50",
        watched: false,
      },
      {
        id: 28,
        title: "Project Setup",
        thumbnail:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
        duration: "16:30",
        watched: false,
      },
    ],
  },
];
