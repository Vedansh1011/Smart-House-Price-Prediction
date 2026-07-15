from fastapi import APIRouter
from schemas.prediction import PredictionRequest
from services.predictor import predict_house_price

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "API Working"}

@router.post("/predict")
def predict(data: PredictionRequest):
    price = predict_house_price(data.model_dump())

    return {
        "Predicted Price": round(price, 2)
    }