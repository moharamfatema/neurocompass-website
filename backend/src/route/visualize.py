from typing import List
import json
from loguru import logger
from fastapi import APIRouter, HTTPException

from controller.visualization import visualization, Filter

router = APIRouter(prefix="/api/visualize", tags=["visualize"])
def initialize_visualization():
    return HTTPException(status_code=501, detail="Visualization not implemented yet")


@router.get("/filters", response_model=List[Filter])
def get_filters():
    return visualization.get_filters()


@router.get("/data-summary", response_model=dict)
def get_data_summary(filters="{}"):
    filters = json.loads(filters)
    return visualization.get_data_summary(filters)

@router.get("/regions-count", response_model=dict)
def get_regions_count(filters="{}"):
    filters = json.loads(filters)
    return visualization.get_regions_count(filters)

@router.get("/scores-hist", response_model=dict)
def get_scores_hist(filters="{}"):
    filters = json.loads(filters)
    return visualization.get_scores_hist(filters)