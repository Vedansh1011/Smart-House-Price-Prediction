from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):

    # ===========================
    # Basic Information
    # ===========================

    OverallQual: int = Field(..., ge=1, le=10)
    OverallCond: int = Field(..., ge=1, le=10)

    YearBuilt: int = Field(..., ge=1800, le=2100)
    YearRemodAdd: int = Field(..., ge=1800, le=2100)

    # ===========================
    # Dimensions
    # ===========================

    GrLivArea: float = Field(..., gt=0)

    TotalBsmtSF: float = Field(..., ge=0)

    FirstFlrSF: float = Field(
        alias="1stFlrSF",
        ge=0
    )

    SecondFlrSF: float = Field(
        alias="2ndFlrSF",
        default=0,
        ge=0
    )

    # ===========================
    # Garage
    # ===========================

    GarageCars: int = Field(..., ge=0)

    GarageArea: float = Field(..., ge=0)

    LotFrontage: float | None = None

    MasVnrArea: float = 0

    # ===========================
    # Interior
    # ===========================

    BedroomAbvGr: int = Field(..., ge=0)

    FullBath: int = Field(..., ge=0)

    HalfBath: int = Field(
        default=0,
        ge=0
    )

    TotRmsAbvGrd: int = Field(..., ge=0)

    Fireplaces: int = Field(
        default=0,
        ge=0
    )

    model_config = {
        "populate_by_name": True
    }