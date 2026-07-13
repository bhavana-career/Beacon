import pandas as pd
import os


def analyze_business(filepath):
    """
    Reads a CSV or Excel file and returns basic business insights.
    """

    extension = os.path.splitext(filepath)[1].lower()

    if extension == ".csv":
        df = pd.read_csv(filepath)

    elif extension in [".xlsx", ".xls"]:
        df = pd.read_excel(filepath)

    else:
        raise ValueError("Unsupported file format")

    return {
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": list(df.columns)
    }