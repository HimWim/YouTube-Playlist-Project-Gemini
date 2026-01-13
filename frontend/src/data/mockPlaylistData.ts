export type PlaylistItem = {
  id: number;
  title: string;
  thumbnail: string;
  type: "Video" | "Playlist";
  url: string;
};

export const mockPlaylistData: PlaylistItem[] = [
  {
    id: 1,
    title: "React Basics Full Course",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    type: "Video",
    url: "https://youtube.com/watch?v=react123",
  },
  {
    id: 2,
    title: "Advanced React Playlist",
    thumbnail:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
    type: "Playlist",
    url: "https://youtube.com/playlist?list=react456",
  },
];
