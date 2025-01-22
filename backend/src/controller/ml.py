import joblib

from fastapi import HTTPException
import pandas as pd

from config.settings import settings
from config.logger import logger
from model.db import db
from util.cache import cache

class ML:
    def __init__(self):
        try:
            self.model_svc = joblib.load(settings.MODEL_PATH_SVC)    
            self.model_gb = joblib.load(settings.MODEL_PATH_GB)
            logger.info("Models loaded")
        except Exception as e:
            logger.error(f"Failed to load models: {e}")

    def recommend_learning_path(self, student_data):
        # Check if student exists in the data
        if student_data.empty:
            return "Student not found."

        # Predict the study method preference
        predicted_label = self.model_gb.predict(student_data)

        # Extract engagement level
        engagement = student_data["engagement_classification"].iloc[0]

        # Recommendations based on study method and engagement
        recommendations = {
            0: {  # Collaborative
                0: ["Interactive AI Basics: Weekly Quizzes and Forums", "Applied AI: Practical Exercises with Peer Feedback", "Introduction to Machine Learning: Online Workshops", "AI Ethics: Case Studies and Discussion Groups"],  # Moderate Engagement
                1: ["Collaborative AI Projects: Team-Based Learning", "Advanced AI Techniques: Group Workshops and Peer Reviews", "Machine Learning Bootcamp: Intensive Group Projects", "AI in Practice: Team Challenges and Hackathons"],      # High Engagement
                2: ['Introduction to AI: Self-Paced Fundamentals', 'AI Basics: Introductory Video Series',
                    'Foundations of Machine Learning: Self-Study Edition', 'AI for Everyone: Introductory Readings and Quizzes']  # Low Engagement
            },
            1: {  # Offline Content
                0: ["AI Principles: Self-Study with Case Studies", "Machine Learning: Offline Course with Practice Problems",
                    "Applied AI: Textbook and Supplementary Materials", "Data Science: Case Studies and Analytical Exercises"],  # Moderate Engagement
                1: ["Advanced AI: Comprehensive Textbook with Projects", "Deep Learning: In-Depth Study with Capstone Projects",
                    "AI and Machine Learning: Project-Based Learning", "Data Science Mastery: Offline Content with Comprehensive Projects"],  # High Engagement
                2: ['AI Basics: Essential Readings and Key Concepts', 'Machine Learning Fundamentals: Self-Study Workbook',
                    "AI Concepts: Downloadable Lecture Series", "Introduction to Data Science: Offline Learning Modules"]  # Low Engagement
            },
            2: {  # Interactive
                0: ["Machine Learning: Interactive Coding Exercises", "AI Applications: Interactive Case Studies",
                    "Data Science: Interactive Projects and Peer Reviews", "AI Ethics: Discussion Forums and Interactive Scenarios"],  # Moderate Engagement
                1: ["Advanced AI: Interactive Group Projects and Hackathons", "Deep Learning: Interactive Labs and Collaborative Projects",
                    "Machine Learning Mastery: Interactive Workshops and Challenges", "AI Research: Collaborative Research Projects and Peer Feedback"],  # High Engagement
                2: ["AI Basics: Interactive Quizzes and Flashcards", "Introduction to Machine Learning: Interactive Visualizations",
                    "AI Fundamentals: Interactive Notebooks", "AI Concepts: Gamified Learning Modules"]  # Low Engagement
            },
            3: {  # Informational
                0: ["Machine Learning: Structured Video Course", "AI Concepts: Comprehensive Video Series",
                    "Data Science: Interactive Reading and Video Modules", "AI in Practice: Lecture Notes and Case Studies"],  # Moderate Engagement
                1: ["Advanced AI: Detailed Lecture Series and Readings", "Deep Learning: Advanced Lecture Series with Supplemental Readings",
                    "AI and Machine Learning: Research Papers and Advanced Lectures", "Data Science Masterclass: Comprehensive Reading and Video Content"],  # High Engagement
                2: ["AI Overview: Short Video Lectures", "Introduction to Machine Learning: Podcast Series",
                    "AI Fundamentals: Infographics and Summaries", "Data Science: Essential Readings and Articles"]  # Low Engagement
            },
            4: {  # Resource-Based
                0: ["Machine Learning: Comprehensive eBooks and Guides", "AI Applications: Case Study Compilations",
                    "Data Science: In-Depth Articles and White Papers", "AI Concepts: Research Articles and Detailed Guides"],  # Moderate Engagement
                1: ["Advanced AI: Research Papers and Technical Reports", "Deep Learning: Comprehensive Textbooks and Resource Repositories",
                    "Machine Learning Mastery: Advanced Documentation and APIs", "AI Ethics: Government and Institutional Reports"],  # High Engagement
                2: ["AI Basics: Curated Reading Lists", "Introduction to Machine Learning: Beginner-Friendly Blogs",
                    "Data Science Overview: Quick Reference Guides", "AI Fundamentals: Online Documentation"]  # Low Engagement
            }
        }

        # Determine study method and engagement level
        study_method = predicted_label[0]
        engagement_level = engagement.iloc[0] if isinstance(
            engagement, pd.Series) else engagement

        # Get the recommended courses based on study method and engagement level
        recommended_courses = recommendations.get(
            study_method, {}).get(engagement_level, [])

        return recommended_courses, study_method, engagement_level

    def return_map_to_original_preference(self, x):
        if x == 0:
            return 'Collaborative'
        elif x == 1:
            return 'Offline Content'
        elif x == 2:
            return 'Interactive'
        elif x == 3:
            return 'Informational'
        elif x == 4:
            return 'Resource-Based'

    def return_map_to_original_engagement(self, x):
        if x == 0:
            return 'Moderate Engagement'
        elif x == 1:
            return 'High Engagement'
        elif x == 2:
            return 'Low Engagement'

    def predict(self, student_id):
        cache_key = f"predict_{student_id}"
        cached_data = cache.get_cache(cache_key)
        if cached_data:
            logger.info(f"Cache hit: {cache_key}")
            return cached_data
        
        student = db.get_collection(settings.DB_COLLECTION_X_y).find_one({
            "id_student": student_id})
        if student is None:
            logger.error(f"Student ID {student_id} not found")
            raise HTTPException(status_code=404, detail=f"Student ID {student_id} not found")
        
        student_merged = db.get_collection(settings.DB_COLLECTION_MERGED).find_one({
            "id_student": student_id})
        if student_merged is None:
            logger.error(f"Student ID {student_id} not found in merged dataset")
            raise HTTPException(status_code=404, detail=f"Student ID {student_id} not found in merged dataset")

        logger.info(f"Student {student_id} found, predicting learning path...")
        student.pop("_id")
        student_merged.pop("_id")
        student.pop("id_student")
        student.pop("study_method_preference")
        pd_student = pd.DataFrame([student])

        try:
            recommendations, study_method, engegement = self.recommend_learning_path(
                pd_student)
            study_method = self.return_map_to_original_preference(study_method)
            engegement = self.return_map_to_original_engagement(engegement)
            logger.info(f"Prediction successful: recommendations {recommendations}\nstudy_method {study_method}\nengegement {engegement}")

            
            response = {
                "student": student_merged,
                "learning_path": {
                    "recommendations": recommendations,
                    "study_method": study_method,
                    "engagement": engegement
                }
            }
            cache.set_cache(cache_key, response)
            return response
        except Exception as e:
            logger.error(f"Prediction failed: {e}")
            raise HTTPException(status_code=500, detail="Prediction failed")
    
ml = ML()