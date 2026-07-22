import joblib
from pathlib import Path

from utils.preprocessing import preprocess_input

# -----------------------------
# Load Model Files
# -----------------------------

MODELS_DIR = Path(r"C:\Users\HP\AI Projects\Smart-House-Price-Prediction\models")

model = joblib.load(MODELS_DIR / "gradient_boosting_tuned.pkl")
scaler = joblib.load(MODELS_DIR / "standard_scaler.pkl")
feature_columns = joblib.load(MODELS_DIR / "feature_columns.pkl")

print("✅ Gradient Boosting model loaded successfully.")
print("✅ Scaler loaded successfully.")
print(f"✅ Feature columns loaded successfully ({len(feature_columns)} features).")


# -----------------------------
# Prediction Function
# -----------------------------

def predict_house_price(input_data):
    try:
        processed_data = preprocess_input(
            input_data=input_data,
            feature_columns=feature_columns
        )

        processed_data = scaler.transform(processed_data)

        prediction = model.predict(processed_data)

        return float(prediction[0])

    except Exception as e:
        raise Exception(f"Prediction failed: {str(e)}")