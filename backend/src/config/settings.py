from pathlib import Path
from pydantic import BaseSettings

class Settings(BaseSettings):
    DB_IP_ADDRESS: str = '127.0.0.1'
    DB_PORT: int = 27017
    DB_NAME: str = 'neurocompass'
    DB_COLLECTION_X_y: str = 'final-dataframe'
    DB_COLLECTION_MERGED: str = 'merged-dataset'
    DB_COLLECTION_CACHE: str = 'cache'
    MODEL_PATH_SVC: str = str(Path(__file__).resolve().parents[2] / 'assets' / 'models' / 'SVCv1.6.pkl')
    MODEL_PATH_GB: str = str(Path(__file__).resolve().parents[2] / 'assets' / 'models' / 'GBv1.6.pkl')

    class Config:
        env_file = '.env'
    
    def get_db_uri(self):
        return f'mongodb://{self.DB_IP_ADDRESS}:{self.DB_PORT}'
    
    def get_db_name(self):
        return self.DB_NAME
    
    def get_db_connection_string(self):
        return f'{self.get_db_uri()}/{self.get_db_name()}'
    
settings = Settings()