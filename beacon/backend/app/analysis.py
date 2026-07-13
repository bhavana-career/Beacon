import os
import pandas as pd


def analyze_business(filepath):

    # -------------------------------
    # Read File
    # -------------------------------

    extension = os.path.splitext(filepath)[1].lower()

    if extension == ".csv":
        df = pd.read_csv(filepath)

    elif extension in [".xlsx", ".xls"]:
        df = pd.read_excel(filepath)

    else:
        raise ValueError("Unsupported file format")

    # -------------------------------
    # Monthly Analysis
    # -------------------------------

    sales_by_month = (
        df.groupby("Month")["Sales"]
        .sum()
        .to_dict()
    )

    profit_by_month = (
        df.groupby("Month")["Profit"]
        .sum()
        .to_dict()
    )

    # -------------------------------
    # Overall Sales Growth
    # -------------------------------

    month_order = df["Month"].drop_duplicates().tolist()

    overall_growth = None

    if len(month_order) >= 2:

        first_month = month_order[0]
        last_month = month_order[-1]

        first_sales = sales_by_month[first_month]
        last_sales = sales_by_month[last_month]

        overall_growth = round(
            ((last_sales - first_sales) / first_sales) * 100,
            2
        )

    # -------------------------------
    # Product Growth
    # -------------------------------

    growth = {}

    for product in df["Product"].unique():

        product_data = df[df["Product"] == product]

        if len(product_data) >= 2:

            first = product_data.iloc[0]["Sales"]
            last = product_data.iloc[-1]["Sales"]

            growth[product] = round(
                ((last - first) / first) * 100,
                2
            )

    growing_products = {
        product: value
        for product, value in growth.items()
        if value >= 0
    }

    declining_products = {
        product: value
        for product, value in growth.items()
        if value < 0
    }

    # -------------------------------
    # Basic Information
    # -------------------------------

    rows = len(df)
    columns = len(df.columns)

    total_sales = int(df["Sales"].sum())
    total_profit = int(df["Profit"].sum())

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

    # -------------------------------
    # Business Health Score
    # -------------------------------

    health_score = 50

    if overall_growth is not None and overall_growth > 0:
        health_score += 20

    if total_profit > 0:
        health_score += 15

    health_score += len(growing_products) * 5
    health_score -= len(declining_products) * 5

    health_score = max(0, min(100, health_score))

    if health_score >= 85:
        status = "Excellent"
    elif health_score >= 70:
        status = "Healthy"
    elif health_score >= 50:
        status = "Needs Attention"
    else:
        status = "Critical"

    # -------------------------------
    # AI Summary
    # -------------------------------

    summary = f"""
Business Summary

Rows: {rows}

Columns: {columns}

Total Sales: {total_sales}

Total Profit: {total_profit}

Business Health Score: {health_score}/100

Business Status: {status}

Sales by Month:
{sales_by_month}

Profit by Month:
{profit_by_month}

Overall Sales Growth:
{overall_growth}%

Product Growth:
{growth}

Growing Products:
{growing_products}

Declining Products:
{declining_products}

Best Product:
{best_product}

Worst Product:
{worst_product}
"""

    return {
        "metrics": {
            "rows": rows,
            "columns": columns,
            "column_names": list(df.columns),
            "total_sales": total_sales,
            "total_profit": total_profit,
            "sales_by_month": sales_by_month,
            "profit_by_month": profit_by_month,
            "overall_growth": overall_growth,
            "growth": growth,
            "growing_products": growing_products,
            "declining_products": declining_products,
            "health_score": health_score,
            "status": status,
            "best_product": best_product,
            "worst_product": worst_product,
        },
        "summary": summary,
    }