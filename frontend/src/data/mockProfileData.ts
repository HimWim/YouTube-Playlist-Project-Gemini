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
