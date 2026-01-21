from pymongo import MongoClient
from pymongo.database import Database
from config import settings

client: MongoClient = None
db: Database = None


def connect_to_mongo():
    """Create database connection"""
    global client, db
    try:
        client = MongoClient(settings.mongodb_url)
        db = client[settings.database_name]
        # Test connection
        client.admin.command('ping')
        print("✅ Connected to MongoDB successfully")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise


def close_mongo_connection():
    """Close database connection"""
    global client
    if client:
        client.close()
        print("MongoDB connection closed")


def get_database() -> Database:
    """Get database instance"""
    return db
