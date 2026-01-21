from fastapi import APIRouter, HTTPException, status, Depends
from models import UserResponse, ProfileUpdate, PasswordChange
from database import get_database
from auth import verify_password, get_password_hash
from dependencies import get_current_user_from_cookie
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/profile", response_model=UserResponse)
async def get_profile(current_user: UserResponse = Depends(get_current_user_from_cookie)):
    """Get user profile"""
    return current_user


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    profile_update: ProfileUpdate,
    current_user: UserResponse = Depends(get_current_user_from_cookie)
):
    """Update user profile"""
    db = get_database()
    update_data = {}
    
    if profile_update.full_name is not None:
        update_data["full_name"] = profile_update.full_name
    if profile_update.email is not None:
        # Check if email is already taken by another user
        existing_user = db.users.find_one({
            "email": profile_update.email,
            "_id": {"$ne": ObjectId(current_user.id)}
        })
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use"
            )
        update_data["email"] = profile_update.email
    if profile_update.avatar is not None:
        update_data["avatar"] = profile_update.avatar
    
    if not update_data:
        return current_user
    
    # Update user
    db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": update_data}
    )
    
    # Fetch updated user
    updated_user = db.users.find_one({"_id": ObjectId(current_user.id)})
    updated_user["id"] = str(updated_user["_id"])
    updated_user.pop("password", None)
    return UserResponse(**updated_user)


@router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    current_user: UserResponse = Depends(get_current_user_from_cookie)
):
    """Change user password"""
    db = get_database()
    
    # Get user with password
    user = db.users.find_one({"_id": ObjectId(current_user.id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Verify old password
    if not verify_password(password_data.old_password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect old password"
        )
    
    # Update password
    hashed_password = get_password_hash(password_data.new_password)
    db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": {"password": hashed_password}}
    )
    
    return {"message": "Password changed successfully"}


@router.delete("/account")
async def delete_account(
    current_user: UserResponse = Depends(get_current_user_from_cookie)
):
    """Delete user account"""
    db = get_database()
    
    # Delete user's playlists
    db.playlists.delete_many({"user_id": current_user.id})
    
    # Delete user
    db.users.delete_one({"_id": ObjectId(current_user.id)})
    
    return {"message": "Account deleted successfully"}
