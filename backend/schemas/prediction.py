from pydantic import BaseModel

class PredictionRequest(BaseModel):
    OverallQual: int
    GrLivArea: float
    GarageCars: int
    TotalBsmtSF: float
    YearBuilt: int