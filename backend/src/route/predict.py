from fastapi import APIRouter, HTTPException

from controller.ml import ml

router = APIRouter(prefix="/api", tags=["predict"])

@router.get("/predict")
def predict(student_id: int):
    return ml.predict(student_id)
