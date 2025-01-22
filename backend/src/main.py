# src/main.py
from pathlib import Path
import uvicorn
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from route.predict import router as predict_router
from route.visualize import router as visualize_router

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

@app.get("/api")
def health_check():
    return {"status": "OK"}

# mount routers
app.include_router(predict_router, tags=["predict"])
app.include_router(visualize_router, tags=["visualize"])

main_dir = Path(__file__).resolve().parent
if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000,
                reload=True, reload_dirs=[main_dir])
