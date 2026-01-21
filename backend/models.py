from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# User Models
class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    plan: str = "Free"


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    remember: bool = False


class UserResponse(UserBase):
    id: str
    avatar: Optional[str] = None
    playlists_created: int = 0
    videos_saved: int = 0
    ai_playlists_generated: int = 0
    last_active_date: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        populate_by_name = True


# Playlist Models
class PlaylistVideo(BaseModel):
    id: str
    title: str
    thumbnail: str
    url: Optional[str] = None
    duration: Optional[str] = None
    watched: bool = False
    prerequisites: Optional[List[str]] = None
    topics: Optional[List[dict]] = None
    relevancy_score: Optional[float] = None


class PlaylistBase(BaseModel):
    name: str
    thumbnail: Optional[str] = None


class PlaylistCreate(PlaylistBase):
    videos: Optional[List[PlaylistVideo]] = []


class PlaylistResponse(PlaylistBase):
    id: str
    user_id: str
    video_count: int = 0
    created_date: str
    videos: List[PlaylistVideo] = []

    class Config:
        from_attributes = True
        populate_by_name = True


# Profile Update Models
class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    avatar: Optional[str] = None


class PasswordChange(BaseModel):
    old_password: str
    new_password: str
