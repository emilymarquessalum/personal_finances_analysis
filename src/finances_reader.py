
import pandas as pd
import os

def process_xlsx_files(folder_path):
    """
    Opens a folder, retrieves all .xlsx files, and processes their data.

    Args:
        folder_path (str): Path to the folder containing .xlsx files.
    """
    # Ensure the folder exists
    if not os.path.exists(folder_path):
        raise FileNotFoundError(f"The folder '{folder_path}' does not exist.")

    # Get all .xlsx files in the folder
    xlsx_files = [file for file in os.listdir(folder_path) if file.endswith('.xlsx')]

    if not xlsx_files:
        print("No .xlsx files found in the folder.")
        return
    all_finances = []
    # Process each .xlsx file
    for xlsx_file in xlsx_files:
        file_path = os.path.join(folder_path, xlsx_file)
        try:
            # Read the .xlsx file into a pandas DataFrame
            data = pd.read_excel(file_path,skiprows=10, sheet_name="finances")
            # Call the placeholder function with the data
            date = file_path[12:]
            summary = get_finances_data(data, date) 
            all_finances.append(summary)
        except Exception as e:
            print(f"Failed to process file {xlsx_file}: {e}")

    return all_finances


def get_finances_data(data: pd.DataFrame, date: str):
    """
    Processes financial data for a given month, calculating key financial metrics.

    Args:
        data (pandas.DataFrame): The financial data read from the .xlsx file.
        date (str): The month and year of the data being processed (e.g., "2024-11").
    """
    # Ensure required columns are present
    required_columns = [
        "Pago/Recebido", "✅?", "Type", "Nome", "Descrição", 
        "Gasto Minimo", "Gasto Máximo"
    ]
    if not all(col in data.columns for col in required_columns):
        columns = data.columns
        raise ValueError(f"The data is missing required columns: {required_columns}. Instead had {columns}")

    expected_special_types = ["IFOOD TOTAL", "WITH-OTHER-PEOPLE TOTAL", 
                              "TRANSPORTE TOTAL", "Extra Groceries 🥫 TOTAL",
                              "Beleza TOTAL"]
    special_types = {}

    # Initialize calculated values
    positive_value = 0  # Total income for the month
    min_expense = 0  # Minimum possible expenses
    max_expense = 0  # Maximum possible expenses
    current = 0  # Current available funds
    final_min = 0  # Final available funds assuming minimum expenses
    final_max = 0  # Final available funds assuming maximum expenses

    # Process rows
    for index, row in data.iterrows():
        # Identify and skip category rows
        if (
            pd.isna(row["Gasto Minimo"]) and pd.isna(row["Gasto Máximo"])
            and pd.notna(row["Nome"])
        ):
            continue

        # Ignore rows not marked as "On" (✅? is False)
        if not row["✅?"]:
            continue
        
        if row["Nome"] in expected_special_types:
            special_types[row['Nome']] = row["Gasto Minimo"]

        if row["Type"] == "Ganhos 💰":
            # Gains add to positive value
            positive_value += row["Gasto Minimo"]
        elif row["Type"] == "Custo Comum 🏠":
            # Costs adjust min and max expenses
            min_expense += row["Gasto Minimo"]
            max_expense += row["Gasto Máximo"]

            # If paid, deduct from current funds
            if row["Pago/Recebido"]:
                current -= row["Gasto Minimo"]

    # Calculate final metrics
    final_min = positive_value - min_expense
    final_max = positive_value - max_expense
    current += positive_value

    # Summary output
    summary = {
        "Positive Value": positive_value,
        "Minimum Expense": min_expense,
        "Maximum Expense": max_expense,
        "Current": current,
        "Final Minimum": final_min,
        "Final Maximum": final_max,
        "Special Costs": special_types
    }

    # Print summary (or return it if needed)
    #print(f"Finances Summary for {date}:")
  
    return summary
