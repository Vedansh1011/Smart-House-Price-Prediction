import joblib
import pandas as pd
from pathlib import Path

from utils.preprocessing_pipeline import preprocess_for_inference
from config.default_features import DEFAULT_FEATURES

# ============================================================
# Paths
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[2]
MODELS_DIR = BASE_DIR / "models"

# ============================================================
# Model Files
# ============================================================

MODEL_FILE = "gradient_boosting_tuned.pkl"
SCALER_FILE = "standard_scaler.pkl"
FEATURE_COLUMNS_FILE = "feature_columns.pkl"
METADATA_FILE = "preprocessing_metadata.pkl"

# ============================================================
# Load Artifacts
# ============================================================

model = joblib.load(MODELS_DIR / MODEL_FILE)

scaler = joblib.load(MODELS_DIR / SCALER_FILE)

feature_columns = joblib.load(
    MODELS_DIR / FEATURE_COLUMNS_FILE
)

metadata = joblib.load(
    MODELS_DIR / METADATA_FILE
)

scaled_columns = metadata["scaled_columns"]
excluded_columns = metadata["excluded_columns"]

# ============================================================
# Validation
# ============================================================

if not feature_columns:
    raise RuntimeError(
        "feature_columns.pkl is empty."
    )

if not scaled_columns:
    raise RuntimeError(
        "Scaled columns not found in preprocessing metadata."
    )

# ============================================================
# Startup Information
# ============================================================

print("=" * 60)
print("HOUSE PRICE PREDICTION MODEL LOADED SUCCESSFULLY")
print("=" * 60)
print(f"Model              : Gradient Boosting Regressor")
print(f"Total Features     : {len(feature_columns)}")
print(f"Scaled Features    : {len(scaled_columns)}")
print(f"Model Directory    : {MODELS_DIR}")
print("=" * 60)

def build_complete_input(user_input):
    complete = DEFAULT_FEATURES.copy()
    complete.update(user_input)
    return complete

# ============================================================
# Prediction Function
# ============================================================

def predict_house_price(input_data):
    """
    Predict house price from API input.

    Parameters
    ----------
    input_data : dict
        Dictionary received from FastAPI.

    Returns
    -------
    float
        Predicted house price.
    """

    # ------------------------------------------
    # Convert API input into DataFrame
    # ------------------------------------------

    complete_input = build_complete_input(input_data)

    input_df = pd.DataFrame([complete_input])

    # ------------------------------------------
    # Apply Training Preprocessing
    # ------------------------------------------

    processed_data = preprocess_for_inference(
        input_df=input_df,
        feature_columns=feature_columns,
        scaler=scaler,
        scaled_columns=scaled_columns,
        excluded_columns=excluded_columns,
        verbose=False
    )

    # ------------------------------------------
    # Feature Validation
    # ------------------------------------------

    if processed_data.shape[1] != len(feature_columns):
        raise ValueError(
            f"Feature mismatch.\n"
            f"Expected : {len(feature_columns)}\n"
            f"Received : {processed_data.shape[1]}"
        )

    # ------------------------------------------
    # Predict
    # ------------------------------------------

    prediction = model.predict(processed_data)

    return float(prediction[0])