import joblib

from fastapi import HTTPException
import pandas as pd

from config.settings import settings
from config.logger import logger
from model.db import db

class ML:
    def __init__(self):
        self.model = joblib.load(settings.MODEL_PATH)
        logger.info("Model loaded")
    
    def predict(self, student_id):
        student = db.get_collection(settings.DB_COLLECTION_MERGED).find_one({"id_student": f"{student_id}"})
        if student is None:
            logger.error(f"Student ID {student_id} not found")
            raise HTTPException(status_code=404, detail=f"Student ID {student_id} not found")

        logger.info(f"Student {student_id} found, {student}")
        student.pop("_id")
        pd_student = pd.DataFrame([student])

        try:
            prediction = self.model.predict(pd_student)
            logger.info(f"Prediction successful: {prediction}")
            recommended_courses = prediction[0]["courses"]
            recommended_resources = prediction[0]["resources"]
            
            return {
                "student": student,
                "learning_path": {
                    "courses": recommended_courses,
                    "resources": recommended_resources
                }
            }
        except Exception as e:
            logger.error(f"Prediction failed: {e}")
            raise HTTPException(status_code=500, detail="Prediction failed")
    
ml = ML()