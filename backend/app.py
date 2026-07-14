from fastapi import FastAPI

from api.routes import router

app = FastAPI(
    title="Smart House Price Prediction API"
)

app.include_router(router)