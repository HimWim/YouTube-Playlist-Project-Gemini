const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.detail || 'An error occurred',
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Auth endpoints
  async signup(userData: {
    fullName: string;
    email: string;
    password: string;
  }) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        full_name: userData.fullName,
        email: userData.email,
        password: userData.password,
      }),
    });
  }

  async login(credentials: {
    email: string;
    password: string;
    remember: boolean;
  }) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  // User endpoints
  async getProfile() {
    return this.request('/api/users/profile');
  }

  async updateProfile(profileData: {
    fullName?: string;
    email?: string;
    avatar?: string;
  }) {
    return this.request('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify({
        full_name: profileData.fullName,
        email: profileData.email,
        avatar: profileData.avatar,
      }),
    });
  }

  async changePassword(passwordData: {
    oldPassword: string;
    newPassword: string;
  }) {
    return this.request('/api/users/change-password', {
      method: 'POST',
      body: JSON.stringify({
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
      }),
    });
  }

  async deleteAccount() {
    return this.request('/api/users/account', {
      method: 'DELETE',
    });
  }

  // Playlist endpoints
  async getPlaylists() {
    return this.request('/api/playlists');
  }

  async getPlaylist(playlistId: string) {
    return this.request(`/api/playlists/${playlistId}`);
  }

  async createPlaylist(playlistData: {
    name: string;
    thumbnail?: string;
    videos?: any[];
  }) {
    return this.request('/api/playlists', {
      method: 'POST',
      body: JSON.stringify(playlistData),
    });
  }

  async updatePlaylist(playlistId: string, playlistData: {
    name: string;
    thumbnail?: string;
    videos?: any[];
  }) {
    return this.request(`/api/playlists/${playlistId}`, {
      method: 'PUT',
      body: JSON.stringify(playlistData),
    });
  }

  async deletePlaylist(playlistId: string) {
    return this.request(`/api/playlists/${playlistId}`, {
      method: 'DELETE',
    });
  }

  async toggleVideoWatched(playlistId: string, videoId: string, watched: boolean) {
    return this.request(`/api/playlists/${playlistId}/videos/${videoId}/watched?watched=${watched}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const apiService = new ApiService();
