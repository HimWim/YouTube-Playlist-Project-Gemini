from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from models import PlaylistCreate, PlaylistResponse, PlaylistVideo
from database import get_database
from dependencies import get_current_user_from_cookie
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/api/playlists", tags=["playlists"])


@router.get("", response_model=List[PlaylistResponse])
async def get_playlists(
    current_user = Depends(get_current_user_from_cookie)
):
    """Get all playlists for current user"""
    db = get_database()
    playlists = list(db.playlists.find({"user_id": current_user.id}))
    
    result = []
    for playlist in playlists:
        playlist["id"] = str(playlist["_id"])
        result.append(PlaylistResponse(**playlist))
    
    return result


@router.post("", response_model=PlaylistResponse, status_code=status.HTTP_201_CREATED)
async def create_playlist(
    playlist_data: PlaylistCreate,
    current_user = Depends(get_current_user_from_cookie)
):
    """Create a new playlist"""
    db = get_database()
    
    playlist_doc = {
        "user_id": current_user.id,
        "name": playlist_data.name,
        "thumbnail": playlist_data.thumbnail,
        "video_count": len(playlist_data.videos) if playlist_data.videos else 0,
        "created_date": datetime.utcnow().isoformat(),
        "videos": [video.dict() for video in playlist_data.videos] if playlist_data.videos else [],
    }
    
    result = db.playlists.insert_one(playlist_doc)
    playlist_id = str(result.inserted_id)
    
    # Update user stats
    db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$inc": {"playlists_created": 1}}
    )
    
    playlist_doc["id"] = playlist_id
    return PlaylistResponse(**playlist_doc)


@router.get("/{playlist_id}", response_model=PlaylistResponse)
async def get_playlist(
    playlist_id: str,
    current_user = Depends(get_current_user_from_cookie)
):
    """Get a specific playlist"""
    db = get_database()
    
    if not ObjectId.is_valid(playlist_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid playlist ID"
        )
    
    playlist = db.playlists.find_one({
        "_id": ObjectId(playlist_id),
        "user_id": current_user.id
    })
    
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Playlist not found"
        )
    
    playlist["id"] = str(playlist["_id"])
    return PlaylistResponse(**playlist)


@router.put("/{playlist_id}", response_model=PlaylistResponse)
async def update_playlist(
    playlist_id: str,
    playlist_data: PlaylistCreate,
    current_user = Depends(get_current_user_from_cookie)
):
    """Update a playlist"""
    db = get_database()
    
    if not ObjectId.is_valid(playlist_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid playlist ID"
        )
    
    playlist = db.playlists.find_one({
        "_id": ObjectId(playlist_id),
        "user_id": current_user.id
    })
    
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Playlist not found"
        )
    
    update_data = {
        "name": playlist_data.name,
        "thumbnail": playlist_data.thumbnail,
        "video_count": len(playlist_data.videos) if playlist_data.videos else 0,
        "videos": [video.dict() for video in playlist_data.videos] if playlist_data.videos else [],
    }
    
    db.playlists.update_one(
        {"_id": ObjectId(playlist_id)},
        {"$set": update_data}
    )
    
    updated_playlist = db.playlists.find_one({"_id": ObjectId(playlist_id)})
    updated_playlist["id"] = str(updated_playlist["_id"])
    return PlaylistResponse(**updated_playlist)


@router.delete("/{playlist_id}")
async def delete_playlist(
    playlist_id: str,
    current_user = Depends(get_current_user_from_cookie)
):
    """Delete a playlist"""
    db = get_database()
    
    if not ObjectId.is_valid(playlist_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid playlist ID"
        )
    
    playlist = db.playlists.find_one({
        "_id": ObjectId(playlist_id),
        "user_id": current_user.id
    })
    
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Playlist not found"
        )
    
    db.playlists.delete_one({"_id": ObjectId(playlist_id)})
    
    # Update user stats
    db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$inc": {"playlists_created": -1}}
    )
    
    return {"message": "Playlist deleted successfully"}


@router.patch("/{playlist_id}/videos/{video_id}/watched")
async def toggle_video_watched(
    playlist_id: str,
    video_id: str,
    watched: bool,
    current_user = Depends(get_current_user_from_cookie)
):
    """Toggle watched status of a video"""
    db = get_database()
    
    if not ObjectId.is_valid(playlist_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid playlist ID"
        )
    
    playlist = db.playlists.find_one({
        "_id": ObjectId(playlist_id),
        "user_id": current_user.id
    })
    
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Playlist not found"
        )
    
    # Update video watched status
    videos = playlist.get("videos", [])
    video_found = False
    for video in videos:
        if video.get("id") == video_id:
            video["watched"] = watched
            video_found = True
            break
    
    if not video_found:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found in playlist"
        )
    
    db.playlists.update_one(
        {"_id": ObjectId(playlist_id)},
        {"$set": {"videos": videos}}
    )
    
    return {"message": "Video watched status updated"}
