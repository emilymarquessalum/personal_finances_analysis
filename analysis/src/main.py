


import os
import pandas as pd
from finances_reader import process_xlsx_files
from historic_writter import save_finances_summary_to_excel


# Example usage
if __name__ == "__main__":
    folder_path = "finances"  # Replace with your folder path
    folder_res = "./historic.xlsx"
    finances = process_xlsx_files(folder_path)
    save_finances_summary_to_excel(finances, folder_res)