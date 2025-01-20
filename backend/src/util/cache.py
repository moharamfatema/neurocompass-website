# request- response caching
from datetime import datetime

from model.db import db
from config.settings import settings

class Cache:
    def __init__(self):
        self.collection = db.get_collection(settings.DB_COLLECTION_CACHE)
    
    def get_cache(self, key, expiration_time_in_seconds=3600):
        db_cache = self.collection.find_one({"key": key})
        if not db_cache:
            return None
        last_updated = db_cache["last_updated"]
        if (datetime.now() - last_updated).total_seconds() > expiration_time_in_seconds:
            return None
        return db_cache["value"]

    
    def set_cache(self, key, value):
        self.collection.update_one({"key": key}, {"$set": {"value": value, "last_updated": datetime.now()}}, upsert=True)
    
    def clear_cache(self):
        self.collection.delete_many({})

cache = Cache()