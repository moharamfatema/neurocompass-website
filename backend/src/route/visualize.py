from fastapi import APIRouter, HTTPException

from controller.visualization import visualization

router = APIRouter(prefix="/api", tags=["visualize"])

@router.get("/visualize")
def initialize_visualization():
    return HTTPException(status_code=501, detail="Visualization not implemented yet")