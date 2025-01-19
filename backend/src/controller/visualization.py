from pydantic import BaseModel

from model.db import db

class Filter(BaseModel):
    field: str
    value: str

class Visualization:
    def __init__(self, collection_name):
        raise NotImplementedError("Visualization not implemented yet")

visualization = Visualization("merged-dataset")