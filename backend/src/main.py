# src/main.py
import os
import joblib
import uvicorn
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from route.predict import router as predict_router
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

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
