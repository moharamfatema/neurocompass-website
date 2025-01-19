from pathlib import Path
from pydantic import BaseSettings

class Settings(BaseSettings):
    DB_IP_ADDRESS: str = '127.0.0.1'
    DB_PORT: int = 27017
    DB_NAME: str = 'neurocompass'
    DB_COLLECTION_X_y: str = 'X-y-dataset'
    DB_COLLECTION_MERGED: str = 'merged-dataset'
    # src/assets/model/model.pkl
    MODEL_PATH: str = str(Path(__file__).resolve().parents[2] / 'assets' / 'models' / 'SVC.pkl')

    class Config:
        env_file = '.env'
    
    def get_db_uri(self):
        return f'mongodb://{self.DB_IP_ADDRESS}:{self.DB_PORT}'
    
    def get_db_name(self):
        return self.DB_NAME
    
    def get_db_connection_string(self):
        return f'{self.get_db_uri()}/{self.get_db_name()}'
    
settings = Settings()