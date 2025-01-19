from pymongo import MongoClient

from config.settings import settings
from config.logger import logger

class Database:
    def __init__(self):
        try:
            self.client = MongoClient(settings.get_db_connection_string())
            self.client.admin.command('ping')
            logger.info("Connected to MongoDB!")
        except Exception as e:
            logger.error(f"Connection failed: {e}")
            exit()
        self.db = self.client[settings.get_db_name()]
    
    def get_collection(self, collection_name):
        return self.db[collection_name]
    
    def close_connection(self):
        self.client.close()

db = Database()