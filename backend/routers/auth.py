from fastapi import APIRouter, HTTPException, status, Response, Depends
from datetime import timedelta
from models import UserCreate, UserLogin, UserResponse
from database import get_database
from auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    set_auth_cookie,
    delete_auth_cookie,
)
from dependencies import get_current_user_from_cookie
from bson import ObjectId
from config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate, response: Response):
    """Register a new user"""
    db = get_database()
    
    # Check if user already exists
    existing_user = db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create user document
    user_doc = {
        "full_name": user_data.full_name,
        "email": user_data.email,
        "password": hashed_password,
        "plan": user_data.plan,
        "avatar": None,
        "playlists_created": 0,
        "videos_saved": 0,
        "ai_playlists_generated": 0,
        "last_active_date": None,
        "created_at": None,
    }
    
    # Insert user
    result = db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    # Set cookie
    set_auth_cookie(response, access_token)
    
    # Return user (without password)
    user_doc["id"] = user_id
    user_doc.pop("password", None)
    return UserResponse(**user_doc)


@router.post("/login", response_model=UserResponse)
async def login(credentials: UserLogin, response: Response):
    """Login user and set authentication cookie"""
    db = get_database()
    
    # Find user by email
    user = db.users.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    user_id = str(user["_id"])
    expires_delta = timedelta(days=30) if credentials.remember else timedelta(hours=24)
    access_token = create_access_token(
        data={"sub": user_id},
        expires_delta=expires_delta
    )
    
    # Set cookie with appropriate max_age
    max_age = 2592000 if credentials.remember else 86400  # 30 days or 24 hours
    set_auth_cookie(response, access_token, max_age=max_age)
    
    # Update last active date
    from datetime import datetime
    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"last_active_date": datetime.utcnow().isoformat()}}
    )
    
    # Return user (without password)
    user["id"] = user_id
    user.pop("password", None)
    return UserResponse(**user)


@router.post("/logout")
async def logout(response: Response):
    """Logout user by deleting authentication cookie"""
    delete_auth_cookie(response)
    print("Logged out successfully")
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserResponse = Depends(get_current_user_from_cookie)):
    """Get current authenticated user information"""
    return current_user
