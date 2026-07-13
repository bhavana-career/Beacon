import pandas as pd
import os


def analyze_business(filepath):

    extension = os.path.splitext(filepath)[1].lower()

    if extension == ".csv":
        df = pd.read_csv(filepath)

    elif extension in [".xlsx", ".xls"]:
        df = pd.read_excel(filepath)

    else:
        raise ValueError("Unsupported file format")

    # ---------- Basic Information ----------

    rows = len(df)
    columns = len(df.columns)

    # ---------- Business Metrics ----------

    total_sales = df["Sales"].sum()

    total_profit = df["Profit"].sum()

    best_product = (
        df.groupby("Product")["Sales"]
        .sum()
        .idxmax()
    )

    worst_product = (
        df.groupby("Product")["Sales"]
        .sum()
        .idxmin()
    )

    summary = f"""
Business Summary

Rows: {rows}

Columns: {columns}

Total Sales: {total_sales}

Total Profit: {total_profit}

Best Product: {best_product}

Worst Product: {worst_product}
"""

    return {
    "metrics": {
        "rows": rows,
        "columns": columns,
        "column_names": list(df.columns),
        "total_sales": int(total_sales),
        "total_profit": int(total_profit),
        "best_product": best_product,
        "worst_product": worst_product
    },
    "summary": summary
    }