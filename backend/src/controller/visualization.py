from pydantic import BaseModel

from config.settings import settings
from model.db import db
from util.cache import cache
class Filter(BaseModel):
    field: str
    value: str

class Visualization:
    def __init__(self):
        self.collection = db.get_collection(settings.DB_COLLECTION_MERGED)
    
    def get_filters(self):
        cached_filters = cache.get_cache("filters")
        if cached_filters:
            return cached_filters
        
        fields = self.collection.find_one().keys()
        fields = list(set(fields) - set(["_id"]))
        categorical_fields = []
        for field in fields:
            if self.collection.find_one({field: {"$exists": True, "$type": "string"}}):
                categorical_fields.append(field)
        numerical_fields = list(set(fields) - set(categorical_fields))

        categorical_values = {field: self.collection.distinct(field) for field in categorical_fields}
        # min and max values for numerical fields
        numerical_values = {field: {"min": self.collection.find_one({}, {field: 1}, sort=[(field, 1)])[field],
                                   "max": self.collection.find_one({}, {field: 1}, sort=[(field, -1)])[field]}
                            for field in numerical_fields}
        
        # filter name, filter type, filter values
        response = []
        for field in categorical_fields:
            response.append({"field": field, "type": "categorical", "values": categorical_values[field]})
        for field in numerical_fields:
            response.append({"field": field, "type": "numerical", "values": numerical_values[field]})
        
        cache.set_cache("filters", response)
        return response

visualization = Visualization()