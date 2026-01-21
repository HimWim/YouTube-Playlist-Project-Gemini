# YouTube Playlist Project - Setup Guide

This guide will help you set up both the frontend and backend for the YouTube Playlist Project.

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- pip (Python package manager)

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd YouTube-Playlist-Project-Gemini/backend
```

### 2. Create Virtual Environment (Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection String
# Get this from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Database Name
DATABASE_NAME=youtube_playlist_db

# JWT Secret Key (generate a secure random string)
# Run: python -c "import secrets; print(secrets.token_urlsafe(32))"
SECRET_KEY=your-generated-secret-key-here

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

**Important Steps:**
1. Sign up for MongoDB Atlas at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier is fine)
3. Create a database user and get the connection string
4. Replace `username` and `password` in `MONGODB_URL` with your credentials
5. Generate a secret key: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
6. Replace `SECRET_KEY` with the generated key

### 5. Run the Backend Server

```bash
# Option 1: Using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Option 2: Using the run script
python run.py
```

The backend API will be available at `http://localhost:8000`

You can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd YouTube-Playlist-Project-Gemini/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API URL (Optional)

Create a `.env` file in the `frontend` directory if you want to change the API URL:

```env
VITE_API_URL=http://localhost:8000
```

By default, the frontend will use `http://localhost:8000` as the API URL.

### 4. Run the Frontend Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in the terminal)

## Running the Application

1. **Start the Backend** (in one terminal):
   ```bash
   cd backend
   python run.py
   ```

2. **Start the Frontend** (in another terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Testing the Setup

1. Open the application in your browser
2. Click "Sign Up" to create a new account
3. After signing up, you should be redirected to your profile page
4. Try logging out and logging back in

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify your MongoDB connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas
- Ensure your database user has the correct permissions

**Module Not Found Errors:**
- Make sure you've activated your virtual environment
- Run `pip install -r requirements.txt` again

**Port Already in Use:**
- Change the port in `run.py` or use: `uvicorn main:app --reload --port 8001`

### Frontend Issues

**API Connection Errors:**
- Ensure the backend is running on `http://localhost:8000`
- Check browser console for CORS errors
- Verify `VITE_API_URL` in frontend `.env` matches backend URL

**Build Errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Project Structure

```
YouTube-Playlist-Project-Gemini/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # MongoDB connection
│   ├── auth.py              # Authentication utilities
│   ├── models.py            # Pydantic models
│   ├── dependencies.py      # FastAPI dependencies
│   ├── routers/             # API route handlers
│   │   ├── auth.py          # Authentication routes
│   │   ├── users.py         # User management routes
│   │   └── playlists.py     # Playlist routes
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables (create this)
│   └── README.md            # Backend documentation
│
└── frontend/
    ├── src/
    │   ├── services/
    │   │   └── api.ts       # API service client
    │   ├── pages/           # React pages
    │   ├── components/      # React components
    │   └── ...
    ├── package.json
    └── vite.config.ts
```

## Next Steps

- Read the backend [README.md](backend/README.md) for API documentation
- Explore the API documentation at http://localhost:8000/docs
- Customize the application to your needs

## Support

If you encounter any issues, check:
1. All dependencies are installed correctly
2. MongoDB connection string is valid
3. Both servers are running on the correct ports
4. CORS settings allow your frontend origin
