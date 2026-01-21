from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import HTTPException, status, Response
from config import settings
from database import get_database
from models import UserResponse
from bson import ObjectId


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    try:
        # Decode the hashed password if it's a string
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode('utf-8')
        if isinstance(plain_password, str):
            plain_password = plain_password.encode('utf-8')
        return bcrypt.checkpw(plain_password, hashed_password)
    except Exception:
        return False


def get_password_hash(password: str) -> str:
    """Hash a password"""
    # Encode password to bytes
    password_bytes = password.encode('utf-8')
    # Generate salt and hash
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    # Return as string
    return hashed.decode('utf-8')


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def verify_token(token: str) -> Optional[dict]:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        return payload
    except JWTError:
        return None


def set_auth_cookie(response: Response, token: str, max_age: int = None):
    """Set authentication cookie"""
    if max_age is None:
        max_age = settings.cookie_max_age
    
    response.set_cookie(
        key=settings.cookie_name,
        value=token,
        max_age=max_age,
        httponly=settings.cookie_http_only,
        secure=settings.cookie_secure,
        samesite=settings.cookie_same_site,
        path="/"
    )


def delete_auth_cookie(response: Response):
    """Delete authentication cookie"""
    response.delete_cookie(
        key=settings.cookie_name,
        httponly=settings.cookie_http_only,
        secure=settings.cookie_secure,
        samesite=settings.cookie_same_site,
        path="/"
    )


async def get_current_user(token: str) -> UserResponse:
    """Get current user from token"""
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id: str = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    db = get_database()
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    user["id"] = str(user["_id"])
    return UserResponse(**user)
