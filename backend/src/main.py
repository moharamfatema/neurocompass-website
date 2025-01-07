# src/main.py
import os
import joblib
import uvicorn
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS allow local vite on port 5173
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the .pkl model and dataset

model_path = os.path.join(os.path.dirname(__file__), "../assets/models/SVC.pkl")
with open(model_path, "rb") as f:
    model = joblib.load(f)

data_path = os.path.join(os.path.dirname(__file__), "../assets/data/merged_df.csv")
students_data = pd.read_csv(data_path)

@app.get("/api/predict")
def predict(student_id: int):
    student = students_data[students_data["id_student"] == student_id]
    if student.empty:
        return {"error": "Student ID not found"}

    prediction = model.predict(student)
    recommended_courses = prediction[0]["courses"]
    recommended_resources = prediction[0]["resources"]

    return {
        "student": student.to_dict(orient="records"),
        "learning_path": {
            "courses": recommended_courses,
            "resources": recommended_resources
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
