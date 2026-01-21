from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    mongodb_url: str
    database_name: str = "youtube_playlist_db"
    secret_key: str
    algorithm: str = "HS256"
    cookie_name: str = "access_token"
    cookie_max_age: int = 86400  # 24 hours
    cookie_http_only: bool = True
    cookie_secure: bool = False
    cookie_same_site: str = "lax"
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    class Config:
        env_file = ".env"
        case_sensitive = False

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]


settings = Settings()
