from typing import List
from fastapi import HTTPException
from pymongo.errors import PyMongoError
from loguru import logger

from config.settings import settings
from model.db import db
from model.visualization import Filter, FilterType
from util.cache import cache


class Visualization:
    def __init__(self):
        self.collection = db.get_collection(settings.DB_COLLECTION_MERGED)

    def get_filters(self) -> List[Filter]:
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

        categorical_values = {field: self.collection.distinct(
            field) for field in categorical_fields}
        # min and max values for numerical fields
        numerical_values = {field: {"min": self.collection.find_one({}, {field: 1}, sort=[(field, 1)])[field],
                                    "max": self.collection.find_one({}, {field: 1}, sort=[(field, -1)])[field]}
                            for field in numerical_fields}

        response = []
        for field in categorical_fields:
            response.append({"field": field, "type": FilterType.CATEGORICAL,
                            "values": categorical_values[field]})
        for field in numerical_fields:
            response.append({"field": field, "type": FilterType.NUMERICAL,
                            "values": numerical_values[field]})

        cache.set_cache("filters", response)
        return response

    def get_data_summary(self, filters: List[Filter]) -> dict:
        query = {}
        for filter in filters:
            if filter['type'] == "categorical":
                query[filter['field']] = {"$in": filter['values']}
            elif filter['type'] == "numerical":
                query[filter['field']] = {
                    "$gte": filter['values'][0], "$lte": filter['values'][1]}

        cached_data_summary = cache.get_cache(f"data_summary_{query}")
        if cached_data_summary:
            return cached_data_summary

        response = {}
        averages = [
            {"$match": query},
            {"$group": {
                "_id": None, "averageScore": {"$avg": "$score"},
                "averageStudiedCredits": {"$avg": "$studied_credits"},
            }}
        ]

        try:
            result = list(self.collection.aggregate(averages))
            if result:
                response = result[0]
            else:
                response = {"averageScore": 0, "averageStudiedCredits": 0}
        except PyMongoError as e:
            logger.error(f"Error while aggregating data: {e}")
            raise HTTPException(status_code=500, detail=str(e))

        cache.set_cache(f"data_summary_{query}", response)
        return response

    def get_regions_count(self, filters: List[Filter]) -> dict:
        query = {}
        for filter in filters:
            if filter['type'] == "categorical":
                query[filter['field']] = {"$in": filter['values']}
            elif filter['type'] == "numerical":
                query[filter['field']] = {
                    "$gte": filter['values'][0], "$lte": filter['values'][1]}

        cached_regions_count = cache.get_cache(f"regions_count_{query}")
        if cached_regions_count:
            return {"regions": cached_regions_count, "is_cached": True}

        response = {}
        regions_count = [
            {"$match": query},
            {
                '$group': {
                    '_id': {
                        'id_student': '$id_student',
                        'region': '$region'
                    },
                    'student': {
                        '$first': '$$ROOT'
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id.region',
                    'count': {
                        '$count': {}
                    },
                    'region': {
                        '$first': '$_id.region'
                    }
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'region': 1,
                    'count': 1
                }
            }
        ]

        try:
            result = list(self.collection.aggregate(regions_count))
            response = result
        except PyMongoError as e:
            logger.error(f"Error while aggregating data: {e}")
            raise HTTPException(status_code=500, detail=str(e))

        cache.set_cache(f"regions_count_{query}", response)
        return {"regions": response, "is_cached": False}


visualization = Visualization()
