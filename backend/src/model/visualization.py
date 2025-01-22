from typing import Annotated, List
from pydantic import BaseModel
from enum import Enum


class FilterType(str, Enum):
    CATEGORICAL = "categorical"
    NUMERICAL = "numerical"


CategoricalValues = List[str]


class NumericalValues(BaseModel):
    min: int
    max: int


class Filter(BaseModel):
    field: Annotated[str, "field name"]
    values: Annotated[CategoricalValues |
                      NumericalValues, "values of the field"]
    type: Annotated[FilterType, "filter type (categorical or numerical)"]



class DataSummary(BaseModel):
    average_sum: int
    average_count: int
