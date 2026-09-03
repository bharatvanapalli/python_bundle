r"""
Zero-install Excel spreadsheet creation utility (Python)
Run directly with:
    python create_excel_document.py
    OR
    .\bundle\python\python.exe create_excel_document.py
r"""
import sys
from pathlib import Path

# Add vendor directory to path if not installed globally
vendor_path = Path(__file__).resolve().parent / "vendor"
if vendor_path.exists():
    sys.path.insert(0, str(vendor_path))

import xlsxwriter

def create_excel_report(output_file="spreadsheet_output.xlsx", sheet_name="Metrics"):
    wb = xlsxwriter.Workbook(output_file)
    ws = wb.add_worksheet(sheet_name)

    # Formats
    title_fmt = wb.add_format({'bold': True, 'font_size': 14, 'font_color': '#1F4E79'})
    header_fmt = wb.add_format({'bold': True, 'font_color': 'white', 'bg_color': '#1F4E79', 'border': 1, 'align': 'center'})
    cell_fmt = wb.add_format({'border': 1})
    currency_fmt = wb.add_format({'border': 1, 'num_format': '$#,##0.00'})

    # Write Title
    ws.write('A1', 'Automated Business Analytics Report', title_fmt)

    # Write Headers
    headers = ["Task ID", "Operation", "Department", "Quarterly Budget", "Status"]
    for col_idx, text in enumerate(headers):
        ws.write(2, col_idx, text, header_fmt)

    # Write Data
    data = [
        [201, "Pipeline Sanity Check", "Data Engineering", 4500.00, "Passed"],
        [202, "Automated Document Generation", "AI Operations", 3200.00, "Active"],
        [203, "AlloyDB Health Monitoring", "Infrastructure", 7800.00, "Operational"],
        [204, "Offline Zero-Install Packaging", "Release Management", 2100.00, "Complete"]
    ]

    for row_idx, row in enumerate(data, start=3):
        ws.write(row_idx, 0, row[0], cell_fmt)
        ws.write(row_idx, 1, row[1], cell_fmt)
        ws.write(row_idx, 2, row[2], cell_fmt)
        ws.write(row_idx, 3, row[3], currency_fmt)
        ws.write(row_idx, 4, row[4], cell_fmt)

    ws.set_column('A:A', 12)
    ws.set_column('B:C', 30)
    ws.set_column('D:D', 20)
    ws.set_column('E:E', 15)

    wb.close()
    print(f"Successfully generated Excel spreadsheet: {output_file}")
    return output_file

if __name__ == "__main__":
    create_excel_report("sample_python_spreadsheet.xlsx")
