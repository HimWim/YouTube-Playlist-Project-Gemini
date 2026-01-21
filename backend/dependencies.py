from fastapi import Cookie, HTTPException, status
from auth import get_current_user
from models import UserResponse
from config import settings


async def get_current_user_from_cookie(
    access_token: str = Cookie(None, alias=settings.cookie_name)
) -> UserResponse:
    """Dependency to get current user from cookie"""
    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return await get_current_user(access_token)
