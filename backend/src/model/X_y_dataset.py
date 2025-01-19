from pydantic import BaseModel, Field
from model.db import db

class X_y_dataset(BaseModel):
    activity_type_dataplus: float = Field(..., alias='activity_type_dataplus')
    activity_type_dualpane: float = Field(..., alias='activity_type_dualpane')
    activity_type_externalquiz: float = Field(..., alias='activity_type_externalquiz')
    activity_type_folder: float = Field(..., alias='activity_type_folder')
    activity_type_forumng: float = Field(..., alias='activity_type_forumng')
    activity_type_glossary: float = Field(..., alias='activity_type_glossary')
    activity_type_homepage: float = Field(..., alias='activity_type_homepage')
    activity_type_quiz: float = Field(..., alias='activity_type_quiz')
    activity_type_resource: float = Field(..., alias='activity_type_resource')
    gender_F: float = Field(..., alias='gender_F')
    gender_M: float = Field(..., alias='gender_M')
    region_East_Anglian_Region: float = Field(..., alias='region_East Anglian Region')
    region_East_Midlands_Region: float = Field(..., alias='region_East Midlands Region')
    region_Ireland: float = Field(..., alias='region_Ireland')
    region_London_Region: float = Field(..., alias='region_London Region')
    region_North_Region: float = Field(..., alias='region_North Region')
    region_North_Western_Region: float = Field(..., alias='region_North Western Region')
    region_Scotland: float = Field(..., alias='region_Scotland')
    region_South_East_Region: float = Field(..., alias='region_South East Region')
    region_South_Region: float = Field(..., alias='region_South Region')
    region_South_West_Region: float = Field(..., alias='region_South West Region')
    region_Wales: float = Field(..., alias='region_Wales')
    region_West_Midlands_Region: float = Field(..., alias='region_West Midlands Region')
    region_Yorkshire_Region: float = Field(..., alias='region_Yorkshire Region')
    highest_education_A_Level_or_Equivalent: float = Field(..., alias='highest_education_A Level or Equivalent')
    highest_education_HE_Qualification: float = Field(..., alias='highest_education_HE Qualification')
    highest_education_Lower_Than_A_Level: float = Field(..., alias='highest_education_Lower Than A Level')
    highest_education_No_Formal_quals: float = Field(..., alias='highest_education_No Formal quals')
    highest_education_Post_Graduate_Qualification: float = Field(..., alias='highest_education_Post Graduate Qualification')
    imd_band_0_10: float = Field(..., alias='imd_band_0-10%')
    imd_band_10_20: float = Field(..., alias='imd_band_10-20')
    imd_band_20_30: float = Field(..., alias='imd_band_20-30%')
    imd_band_30_40: float = Field(..., alias='imd_band_30-40%')
    imd_band_40_50: float = Field(..., alias='imd_band_40-50%')
    imd_band_50_60: float = Field(..., alias='imd_band_50-60%')
    imd_band_60_70: float = Field(..., alias='imd_band_60-70%')
    imd_band_70_80: float = Field(..., alias='imd_band_70-80%')
    imd_band_80_90: float = Field(..., alias='imd_band_80-90%')
    imd_band_90_100: float = Field(..., alias='imd_band_90-100%')
    age_band_0_35: float = Field(..., alias='age_band_0-35')
    age_band_35_55: float = Field(..., alias='age_band_35-55')
    age_band_55_or_more: float = Field(..., alias='age_band_55<=')
    disability_N: float = Field(..., alias='disability_N')
    disability_Y: float = Field(..., alias='disability_Y')
    final_result_Distinction: float = Field(..., alias='final_result_Distinction')
    final_result_Fail: float = Field(..., alias='final_result_Fail')
    final_result_Pass: float = Field(..., alias='final_result_Pass')
    final_result_Withdrawn: float = Field(..., alias='final_result_Withdrawn')
    study_status_finished: float = Field(..., alias='study_status_finished')
    study_status_unfinished: float = Field(..., alias='study_status_unfinished')
    withdrawal_status_didnt_withdraw: float = Field(..., alias="withdrawal_status_didn't withdraw")
    withdrawal_status_early_withdrawal: float = Field(..., alias='withdrawal_status_early withdrawal')
    withdrawal_status_late_withdrawal: float = Field(..., alias='withdrawal_status_late withdrawal')
    withdrawal_status_normal_withdrawal: float = Field(..., alias='withdrawal_status_normal withdrawal')
    sum: float = Field(..., alias='sum')
    count: float = Field(..., alias='count')
    score: float = Field(..., alias='score')
    num_of_prev_attempts: float = Field(..., alias='num_of_prev_attempts')
    assessment_engagement_score: float = Field(..., alias='assessment_engagement_score')
    submission_timeliness: float = Field(..., alias='submission_timeliness')
    score_per_weight: float = Field(..., alias='score_per_weight')
    module_engagement_rate: float = Field(..., alias='module_engagement_rate')
    repeat_student: float = Field(..., alias='repeat_student')
    performance_by_registration: float = Field(..., alias='performance_by_registration')
    weighted_engagement: float = Field(..., alias='weighted_engagement')
    cumulative_score: float = Field(..., alias='cumulative_score')
    engagement_consistency: float = Field(..., alias='engagement_consistency')
    learning_pace: float = Field(..., alias='learning_pace')
    engagement_dropoff: float = Field(..., alias='engagement_dropoff')
    activity_diversity: float = Field(..., alias='activity_diversity')
    improvement_rate: float = Field(..., alias='improvement_rate')
    kmeans_cluster: int = Field(..., alias='kmeans_cluster')
    average_engagement: float = Field(..., alias='average_engagement')
    engagement_classification: int = Field(..., alias='engagement_classification')
    study_method_preference: int = Field(..., alias='study_method_preference')

    class Config:
        allow_population_by_field_name = True
