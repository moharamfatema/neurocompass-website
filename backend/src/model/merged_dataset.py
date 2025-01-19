from pydantic import BaseModel, Field
from model.db import db

class MergedDataset(BaseModel):
    id_student: str = Field(..., alias='id_student')
    code_module: str = Field(..., alias='code_module')
    code_presentation: str = Field(..., alias='code_presentation')
    activity_type: str = Field(..., alias='activity_type')
    db_sum: str = Field(..., alias='sum')
    db_count: str = Field(..., alias='count')
    id_assessment: str = Field(..., alias='id_assessment')
    assessment_type: str = Field(..., alias='assessment_type')
    date: str = Field(..., alias='date')
    weight: str = Field(..., alias='weight')
    date_submitted: str = Field(..., alias='date_submitted')
    is_banked: str = Field(..., alias='is_banked')
    score: str = Field(..., alias='score')
    date_registration: str = Field(..., alias='date_registration')
    gender: str = Field(...)
    region: str = Field(...)
    highest_education: str = Field(...)
    imd_band: str = Field(...)
    age_band: str = Field(...)
    num_of_prev_attempts: str = Field(...)
    studied_credits: str = Field(...)
    disability: str = Field(...)
    final_result: str = Field(...)
    module_presentation_length: str = Field(...)
    study_status: str = Field(...)
    withdrawal_status: str = Field(...)

    class Config:
        allow_population_by_field_name = True

