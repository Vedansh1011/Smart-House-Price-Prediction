import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import (
    StandardScaler,
    RobustScaler,
    MinMaxScaler
)

# ============================================================
# Module Constants
# ============================================================

DEFAULT_EXCLUDED_SCALING_COLUMNS = (
    "Id",
    "SalePrice",
)

SUPPORTED_SCALERS = {
    "standard": StandardScaler,
    "robust": RobustScaler,
    "minmax": MinMaxScaler,
}

BINARY_VALUES = {0, 1}

def handle_missing_values(df):
    """
    Apply the same missing value handling
    used in the training notebook.
    """

    df = df.copy()

    # -------------------------
    # Fill categorical columns
    # -------------------------

    none_columns = [
        "PoolQC",
        "MiscFeature",
        "Alley",
        "Fence",
        "FireplaceQu",
        "GarageType",
        "GarageFinish",
        "GarageQual",
        "GarageCond",
        "BsmtQual",
        "BsmtCond",
        "BsmtExposure",
        "BsmtFinType1",
        "BsmtFinType2",
        "MasVnrType"
    ]

    for col in none_columns:
        if col in df.columns:
            df[col] = df[col].fillna("None")

    # -------------------------
    # Fill numeric columns
    # -------------------------

    # LotFrontage median computed from the training dataset.
    # Used during inference because a single-row input cannot
    # compute a meaningful median.
    if "LotFrontage" in df.columns:
        df["LotFrontage"] = df["LotFrontage"].fillna(69.0)

    if "MasVnrArea" in df.columns:
        df["MasVnrArea"] = df["MasVnrArea"].fillna(0)

    if "GarageYrBlt" in df.columns:
        df["GarageYrBlt"] = df["GarageYrBlt"].fillna(0)

    if "Electrical" in df.columns:
        df["Electrical"] = df["Electrical"].fillna(
            df["Electrical"].mode()[0]
        )

    return df

def apply_ordinal_encoding(df):
    """
    Apply ordinal encoding to ordered categorical features.

    This function:
    1. Validates that all required columns exist.
    2. Checks for unexpected category values.
    3. Applies ordinal encoding.
    4. Verifies that encoding did not introduce NaN values.
    """

    print("=" * 60)
    print("INSIDE apply_ordinal_encoding()")
    print("=" * 60)

    quality_map = {
        "None": 0,
        "Po": 1,
        "Fa": 2,
        "TA": 3,
        "Gd": 4,
        "Ex": 5
    }

    exposure_map = {
        "None": 0,
        "No": 1,
        "Mn": 2,
        "Av": 3,
        "Gd": 4
    }

    fin_type_map = {
        "None": 0,
        "Unf": 1,
        "LwQ": 2,
        "Rec": 3,
        "BLQ": 4,
        "ALQ": 5,
        "GLQ": 6
    }

    garage_finish_map = {
        "None": 0,
        "Unf": 1,
        "RFn": 2,
        "Fin": 3
    }

    functional_map = {
        "Sal": 1,
        "Sev": 2,
        "Maj2": 3,
        "Maj1": 4,
        "Mod": 5,
        "Min2": 6,
        "Min1": 7,
        "Typ": 8
    }

    ordinal_mappings = {
        "ExterQual": quality_map,
        "ExterCond": quality_map,
        "BsmtQual": quality_map,
        "BsmtCond": quality_map,
        "HeatingQC": quality_map,
        "KitchenQual": quality_map,
        "FireplaceQu": quality_map,
        "GarageQual": quality_map,
        "GarageCond": quality_map,
        "PoolQC": quality_map,
        "BsmtExposure": exposure_map,
        "BsmtFinType1": fin_type_map,
        "BsmtFinType2": fin_type_map,
        "GarageFinish": garage_finish_map,
        "Functional": functional_map,
    }

    # -------------------------------------------------------
    # Validate Columns
    # -------------------------------------------------------

    missing_columns = [
        col for col in ordinal_mappings
        if col not in df.columns
    ]

    if missing_columns:
        raise KeyError(
            f"Missing ordinal columns: {missing_columns}"
        )

    # -------------------------------------------------------
    # Validate Categories
    # -------------------------------------------------------

    print("\nChecking category mappings...\n")

    for col, mapping in ordinal_mappings.items():

        unique_values = set(df[col].dropna().unique())

        unexpected = unique_values - set(mapping.keys())

        if unexpected:
            raise ValueError(
                f"\nUnmapped categories found in '{col}': "
                f"{sorted(unexpected)}"
            )

    print("✓ All categories successfully validated.\n")

    # -------------------------------------------------------
    # Apply Encoding
    # -------------------------------------------------------

    for col, mapping in ordinal_mappings.items():
        df[col] = df[col].map(mapping)

    # -------------------------------------------------------
    # Final Validation
    # -------------------------------------------------------

    encoded_cols = list(ordinal_mappings.keys())

    nan_after_encoding = (
        df[encoded_cols]
        .isnull()
        .sum()
    )

    if nan_after_encoding.sum() > 0:
        raise ValueError(
            "\nNaN values detected after ordinal encoding:\n"
            f"{nan_after_encoding[nan_after_encoding > 0]}"
        )

    print("✓ Ordinal encoding completed successfully.")

    print("\nEncoded Columns:")

    for col in encoded_cols:
        print(f"{col:<20} -> {df[col].dtype}")

    print("=" * 60)

    return df

def apply_nominal_encoding(df):
    """
    Apply One-Hot Encoding to nominal categorical features.

    This function:
    1. Detects all remaining object columns.
    2. Applies one-hot encoding.
    3. Validates the encoded dataset.
    4. Returns the transformed DataFrame.
    """

    print("=" * 60)
    print("INSIDE apply_nominal_encoding()")
    print("=" * 60)

    # -------------------------------------------------------
    # Detect Nominal Columns
    # -------------------------------------------------------

    nominal_columns = df.select_dtypes(include="object").columns.tolist()

    if not nominal_columns:
        print("No nominal categorical features found.")
        return df

    print(f"\nNominal Features Detected : {len(nominal_columns)}")

    for col in nominal_columns:
        print(f"  • {col}")

    # -------------------------------------------------------
    # Apply One-Hot Encoding
    # -------------------------------------------------------

    original_shape = df.shape

    df = pd.get_dummies(
        df,
        columns=nominal_columns,
        drop_first=False,
        dtype=np.int8
    )

    # -------------------------------------------------------
    # Validation
    # -------------------------------------------------------

    # --------------------------------------------------
    # Debug Missing Values
    # --------------------------------------------------

    missing_columns = df.columns[df.isnull().any()].tolist()
    if len(missing_columns) > 0:
        print("\nMissing Values After Nominal Encoding")
        print("=" * 60)
        for col in missing_columns:
            print(f"{col} : {df[col].isnull().sum()}")

        raise ValueError(
            "Missing values detected after nominal encoding."
        )

    duplicated_columns = df.columns[df.columns.duplicated()]

    if len(duplicated_columns) > 0:
        raise ValueError(
            f"Duplicate columns detected: {duplicated_columns.tolist()}"
        )

    print("\n✓ Nominal encoding completed successfully.")

    print(f"\nOriginal Shape : {original_shape}")
    print(f"Encoded Shape  : {df.shape}")

    print(f"New Features Added : {df.shape[1] - original_shape[1]}")

    print("=" * 60)

    return df

def scale_numerical_features(
    df,
    scaler="standard",
    exclude_columns=None,
    verbose=True,
    return_scaler=True,
    show_statistics=False
):
    """
    Scale continuous numerical features.

    Parameters
    ----------
    df : pandas.DataFrame
        Input dataframe.

    scaler : str
        Scaling technique.
        Options:
            - "standard"
            - "robust"
            - "minmax"

    exclude_columns : list or None
        Columns that should never be scaled.

    Returns
    -------
    tuple
        (
            scaled_dataframe,
            fitted_scaler,
            scaled_columns,
            excluded_columns
        )
    """

    print("=" * 60)
    print("INSIDE scale_numerical_features()")
    print("=" * 60)

    # --------------------------------------------------
    # Basic Validation
    # --------------------------------------------------

    if df is None:
        raise ValueError("Input dataframe is None.")

    if not isinstance(df, pd.DataFrame):
        raise TypeError("Input must be a pandas DataFrame.")

    if df.empty:
        raise ValueError("Input dataframe is empty.")

    if df.isnull().sum().sum() != 0:
        raise ValueError(
            "Missing values detected. Handle missing values before scaling."
        )

    if np.isinf(df.select_dtypes(include=[np.number])).sum().sum() != 0:
        raise ValueError(
            "Infinite values detected."
        )

    print("✓ Input dataframe validation passed.")

    # --------------------------------------------------
    # Create Safe Working Copy
    # --------------------------------------------------

    df_scaled = df.copy(deep=True)

    # --------------------------------------------------
    # Default Excluded Columns
    # --------------------------------------------------

    if exclude_columns is None:
        exclude_columns = list(DEFAULT_EXCLUDED_SCALING_COLUMNS)
    else:
        exclude_columns = list(dict.fromkeys(exclude_columns))

    # --------------------------------------------------
    # Validate Excluded Columns
    # --------------------------------------------------

    missing_columns = [
        column
        for column in exclude_columns
        if column not in df_scaled.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Excluded columns not found in dataframe: {missing_columns}"
        )

    # --------------------------------------------------
    # Validate Requested Scaler
    # --------------------------------------------------

    scaler = scaler.lower().strip()

    if scaler not in SUPPORTED_SCALERS:
        raise ValueError(
            f"""
            Unsupported scaler '{scaler}'.

            Available scalers:
            {list(SUPPORTED_SCALERS.keys())}
            """
            )

    fitted_scaler = SUPPORTED_SCALERS[scaler]()

    # --------------------------------------------------
    # Detect Numerical Features
    # --------------------------------------------------

    numerical_columns = (
        df_scaled
        .select_dtypes(include=[np.number])
        .columns
        .tolist()
    )

    # --------------------------------------------------
    # Detect Binary Features
    # --------------------------------------------------

    binary_columns = []

    for column in numerical_columns:

        if column in exclude_columns:
            continue

        unique_values = set(
            df_scaled[column]
            .dropna()
            .unique()
        )

        if unique_values.issubset(BINARY_VALUES):
            binary_columns.append(column)

    # --------------------------------------------------
    # Detect Constant Features
    # --------------------------------------------------

    constant_columns = []

    for column in numerical_columns:

        if column in exclude_columns:
            continue

        if df_scaled[column].nunique(dropna=True) <= 1:
            constant_columns.append(column)

    # --------------------------------------------------
    # Select Continuous Features
    # --------------------------------------------------

    scaled_columns = [
        column
        for column in numerical_columns
        if (
            column not in exclude_columns
            and column not in binary_columns
            and column not in constant_columns
        )
    ]

    if not scaled_columns:
        raise ValueError(
            "No continuous numerical features available for scaling."
        )

    # --------------------------------------------------
    # Preserve Original Column Order
    # --------------------------------------------------

    scaled_columns = [
        column
        for column in df_scaled.columns
        if column in scaled_columns
    ]

    excluded_columns = [
        column
        for column in df_scaled.columns
        if (
            column in exclude_columns
            or column in binary_columns
            or column in constant_columns
        )
    ]

    # --------------------------------------------------
    # Summary
    # --------------------------------------------------

    print("=" * 60)
    print("FEATURE SCALING SUMMARY")
    print("=" * 60)

    print(f"Scaler Selected        : {fitted_scaler.__class__.__name__}")
    print(f"Numerical Columns      : {len(numerical_columns)}")
    print(f"Continuous Columns     : {len(scaled_columns)}")
    print(f"Binary Columns         : {len(binary_columns)}")
    print(f"Constant Columns       : {len(constant_columns)}")
    print(f"Excluded Columns       : {len(excluded_columns)}")

    print("\nContinuous Features Selected:\n")

    for column in scaled_columns:
        print(f"  • {column}")

    # --------------------------------------------------
    # Apply Feature Scaling
    # --------------------------------------------------

    if verbose:
        print("\nApplying feature scaling...")

    # Fit and transform continuous numerical features
    scaled_values = fitted_scaler.fit_transform(
        df_scaled[scaled_columns]
    )

    # Create a DataFrame to preserve index and column names
    scaled_df = pd.DataFrame(
        scaled_values,
        columns=scaled_columns,
        index=df_scaled.index
    )

    # Replace the original columns with the scaled values
    df_scaled = df_scaled.drop(columns=scaled_columns)

    df_scaled = pd.concat(
        [df_scaled, scaled_df],
        axis=1
    )

    # Restore the original column order
    df_scaled = df_scaled[
        list(df.columns)
    ]

    if verbose:
        print("✓ Feature scaling completed successfully.")

        # --------------------------------------------------
        # Validate Scaled Data
        # --------------------------------------------------

        if df_scaled[scaled_columns].isnull().values.any():
            raise ValueError(
                "NaN values detected after feature scaling."
            )

        if np.isinf(df_scaled[scaled_columns].to_numpy()).any():
            raise ValueError(
                "Infinite values detected after feature scaling."
            )

        if verbose:
            print("✓ Scaled data validation passed.")

    # --------------------------------------------------
    # Scaling Statistics
    # --------------------------------------------------

    scaling_summary = pd.DataFrame(
        {
            "Mean": df_scaled[scaled_columns].mean(),
            "Std": df_scaled[scaled_columns].std(),
            "Min": df_scaled[scaled_columns].min(),
            "Max": df_scaled[scaled_columns].max(),
        }
    )

    if verbose and show_statistics:
        print("\nScaled Feature Statistics\n")
        print(scaling_summary.round(4))

    # --------------------------------------------------
    # Final Summary
    # --------------------------------------------------

    if verbose:

        print("\n" + "=" * 60)
        print("FEATURE SCALING COMPLETED SUCCESSFULLY")
        print("=" * 60)

        print(f"Dataset Shape           : {df_scaled.shape}")
        print(f"Total Features          : {df_scaled.shape[1]}")
        print(f"Scaled Features         : {len(scaled_columns)}")
        print(f"Excluded Features       : {len(excluded_columns)}")

    # --------------------------------------------------
    # Return Results
    # --------------------------------------------------

    if return_scaler:

        return (
            df_scaled,
            fitted_scaler,
            scaled_columns,
            excluded_columns,
        )

    return (
        df_scaled,
        scaled_columns,
        excluded_columns,
    )


def preprocess_for_inference(
    input_df,
    feature_columns,
    scaler,
    scaled_columns,
    excluded_columns=None,
    verbose=False
):
    """
    Complete preprocessing pipeline for inference.

    Parameters
    ----------
    input_df : pandas.DataFrame
        Raw input dataframe.

    feature_columns : list
        Feature columns saved during training.

    scaler : sklearn.preprocessing.StandardScaler
        Trained scaler loaded from disk.

    scaled_columns : list
        Columns that were scaled during training.

    excluded_columns : list, optional
        Columns excluded from scaling.

    verbose : bool
        Print preprocessing information.

    Returns
    -------
    pandas.DataFrame
        Processed dataframe ready for prediction.
    """

    df = input_df.copy()

    # --------------------------------------------------
    # Missing Values
    # --------------------------------------------------

    df = handle_missing_values(df)

    # --------------------------------------------------
    # Ordinal Encoding
    # --------------------------------------------------

    df = apply_ordinal_encoding(df)

    # --------------------------------------------------
    # Nominal Encoding
    # --------------------------------------------------

    df = apply_nominal_encoding(df)

    # --------------------------------------------------
    # Match Training Features
    # --------------------------------------------------

    for column in feature_columns:
        if column not in df.columns:
            df[column] = 0

    df = df.reindex(columns=feature_columns, fill_value=0)

    # --------------------------------------------------
    # Scale ONLY training columns
    # --------------------------------------------------

    columns_to_scale = [
        col for col in scaled_columns
        if col in df.columns
    ]

    if columns_to_scale:
        df[columns_to_scale] = scaler.transform(df[columns_to_scale])

    if verbose:

        print("=" * 60)
        print("Inference preprocessing completed successfully.")
        print("=" * 60)
        print(f"Final Shape : {df.shape}")

    return df