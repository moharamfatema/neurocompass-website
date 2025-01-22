from typing import List
import json
from loguru import logger
from fastapi import APIRouter, HTTPException

from controller.visualization import visualization, Filter

router = APIRouter(prefix="/api", tags=["visualize"])

@router.get("/visualize")
def initialize_visualization():
    return HTTPException(status_code=501, detail="Visualization not implemented yet")


@router.get("/visualize/filters", response_model=List[Filter])
def get_filters():
    return visualization.get_filters()


@router.get("/visualize/data-summary", response_model=dict)
def get_data_summary(filters="{}"):
    logger.debug(f"Filters: {filters}")
    filters = json.loads(filters)
    logger.debug(f"Filters decoded: {filters}")
    return visualization.get_data_summary(filters)
