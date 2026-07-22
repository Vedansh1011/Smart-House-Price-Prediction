from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services import predictor
from api.routes import router

app = FastAPI(
    title="Smart House Price Prediction API",
    version="1.0.0",
    description="Machine Learning API for House Price Prediction"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Smart House Price Prediction API is running successfully!"
    }