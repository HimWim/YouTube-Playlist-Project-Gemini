# YouTube Playlist Project - Backend API

FastAPI backend with MongoDB for the YouTube Playlist Project.

## Features

- **Authentication & Authorization**: Cookie-based JWT authentication
- **User Management**: Sign up, login, logout, profile management
- **Playlist Management**: CRUD operations for playlists and videos
- **MongoDB Integration**: Persistent data storage

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection String
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Database Name
DATABASE_NAME=youtube_playlist_db

# JWT Secret Key (generate a secure random string)
SECRET_KEY=your-secret-key-change-this-to-a-random-string-in-production

# JWT Algorithm
ALGORITHM=HS256

# Cookie Settings
COOKIE_NAME=access_token
COOKIE_MAX_AGE=86400
COOKIE_HTTP_ONLY=True
COOKIE_SECURE=False
COOKIE_SAME_SITE=lax

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Important**: 
- Replace `MONGODB_URL` with your actual MongoDB connection string
- Generate a secure random string for `SECRET_KEY` (you can use: `python -c "import secrets; print(secrets.token_urlsafe(32))"`)

### 3. Run the Server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password
- `DELETE /api/users/account` - Delete account

### Playlists

- `GET /api/playlists` - Get all playlists for current user
- `POST /api/playlists` - Create a new playlist
- `GET /api/playlists/{playlist_id}` - Get a specific playlist
- `PUT /api/playlists/{playlist_id}` - Update a playlist
- `DELETE /api/playlists/{playlist_id}` - Delete a playlist
- `PATCH /api/playlists/{playlist_id}/videos/{video_id}/watched` - Toggle video watched status

## Database Schema

### Users Collection

```json
{
  "_id": "ObjectId",
  "full_name": "string",
  "email": "string",
  "password": "string (hashed)",
  "plan": "string (Free/Pro/Premium)",
  "avatar": "string (URL)",
  "playlists_created": "number",
  "videos_saved": "number",
  "ai_playlists_generated": "number",
  "last_active_date": "string (ISO date)",
  "created_at": "datetime"
}
```

### Playlists Collection

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "name": "string",
  "thumbnail": "string (URL)",
  "video_count": "number",
  "created_date": "string (ISO date)",
  "videos": [
    {
      "id": "string",
      "title": "string",
      "thumbnail": "string",
      "url": "string",
      "duration": "string",
      "watched": "boolean",
      "prerequisites": ["string"],
      "topics": [{"title": "string", "startTime": "string", "endTime": "string"}],
      "relevancy_score": "number"
    }
  ]
}
```

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens are stored in HTTP-only cookies
- CORS is configured to allow frontend origins
- All authenticated endpoints require valid JWT token in cookie

## Development

To run in development mode with auto-reload:

```bash
uvicorn main:app --reload
```

## Production

For production deployment:

1. Set `COOKIE_SECURE=True` in `.env` (requires HTTPS)
2. Use a strong `SECRET_KEY`
3. Configure proper CORS origins
4. Use a production ASGI server like Gunicorn with Uvicorn workers:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```
