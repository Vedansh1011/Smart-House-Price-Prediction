import pandas as pd


def preprocess_input(input_data, feature_columns):
    """
    Convert raw user input into the same feature format
    used during model training.
    """

    # Convert dictionary to DataFrame
    df = pd.DataFrame([input_data])

    # ---------- Ordinal Encoding ----------

    quality_map = {
        "Po": 1,
        "Fa": 2,
        "TA": 3,
        "Gd": 4,
        "Ex": 5
    }

    quality_columns = [
        "ExterQual",
        "ExterCond",
        "BsmtQual",
        "BsmtCond",
        "HeatingQC",
        "KitchenQual",
        "FireplaceQu",
        "GarageQual",
        "GarageCond",
        "PoolQC"
    ]

    for col in quality_columns:
        if col in df.columns:
            df[col] = df[col].map(quality_map).fillna(0)

    # ---------- One-Hot Encoding ----------

    df = pd.get_dummies(df)

    # ---------- Match Training Columns ----------

    df = df.reindex(columns=feature_columns, fill_value=0)

    return df