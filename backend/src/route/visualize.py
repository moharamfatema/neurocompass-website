from fastapi import APIRouter, HTTPException

from controller.visualization import visualization

router = APIRouter(prefix="/api", tags=["visualize"])

@router.get("/visualize")
def initialize_visualization():
    raise NotImplementedError("Visualization not implemented yet")