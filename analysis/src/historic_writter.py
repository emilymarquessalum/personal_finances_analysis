


import pandas as pd

def save_finances_summary_to_excel(results: list[dict], output_path: str):
    """
    Saves a list of finance summaries into an Excel file, expanding Special Costs into dedicated columns.

    Args:
        results (list[dict]): List of dictionaries with finance summaries.
        output_path (str): Path to save the Excel file.
    """
    # Prepare data structure for the DataFrame
    all_columns = set()  # Collect all possible keys, including Special Costs
    for result in results:
        all_columns.update(result.keys())
        if "Special Costs" in result:
            all_columns.update(result["Special Costs"].keys())
    
    if "Special Costs" in all_columns:
        all_columns.remove("Special Costs")
    # Initialize rows for the DataFrame
    processed_rows = []
    for result in results:
        row = {key: result.get(key, None) for key in all_columns}  # Base columns
        if "Special Costs" in result:
            for special_key, value in result["Special Costs"].items():
                row[special_key] = value
        processed_rows.append(row)

    # Convert to DataFrame
    df = pd.DataFrame(processed_rows)

    # Save to Excel
    df.to_excel(output_path, index=False)
    print(f"Summary saved to {output_path}")
