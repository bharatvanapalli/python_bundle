# Automation Tools & Document Generation Offline Bundle

This repository contains pre-bundled, zero-dependency tools for:
1. **Word Document Creation & Editing** (.docx) via Node.js (`docx`, `mammoth`) & Python (`python-docx`).
2. **Excel Spreadsheet Creation & Formatting** (.xlsx) via Node.js (`exceljs`, `xlsx`) & Python (`openpyxl`, `xlsxwriter`).
3. **Model Context Protocol (MCP)** via `@modelcontextprotocol/sdk`.
4. **AlloyDB / Cloud SQL Pipeline Sanity Checks** via `psql` (PostgreSQL 16.6), `cloud-sql-proxy` (v2.14.3), and `psycopg2`.

**Everything is pre-installed and bundled.** No `npm`, `npx`, `pip`, or internet access is required.

---

## ?? What is Included in the Bundle

### 1. Document & Spreadsheet Engines (Node.js & Python)

| Ecosystem | Library | Version | Capability |
|---|---|---|---|
| **Node.js** | `docx` | 9.7.1 | Generate Word documents (.docx) with styles, tables, headers, and images |
| **Node.js** | `exceljs` | 4.4.0 | Read, write, format Excel (.xlsx) workbooks, formulas, and styles |
| **Node.js** | `xlsx` (SheetJS) | 0.18.5 | Quick spreadsheet parser and converter |
| **Node.js** | `mammoth` | 1.12.2 | Read and extract text/HTML from .docx files |
| **Node.js** | `@modelcontextprotocol/sdk` | 1.30.0 | MCP Server & Client SDK for autonomous AI workflows |
| **Python** | `python-docx` | 1.2.0 | Create and edit Word documents (.docx) |
| **Python** | `openpyxl` | 3.1.5 | Read/write Excel spreadsheets (.xlsx) |
| **Python** | `xlsxwriter` | 3.2.9 | High-performance Excel formatting and charts |
| **Python** | `psycopg2-binary` | 2.9.12 | PostgreSQL / AlloyDB driver |

### 2. Standalone Binaries & Runtimes

- **PostgreSQL Client (psql)**: `bundle/bin/psql.exe` (v16.6)
- **Cloud SQL Proxy**: `bundle/bin/cloud-sql-proxy.exe` (v2.14.3)
- **Python 3.14 Runtime**: `bundle/python/python.exe`
- **Vendored Libraries**: `vendor/`
- **Pre-downloaded Wheels**: `wheels/*.whl`
- **Node Modules**: `node_modules/`

---

## ?? Quick Verification

Run the automated verification script:

```powershell
powershell -ExecutionPolicy Bypass -File .\extract-and-use-bundle.ps1
```

*Verification output:*
```text
=========================================
Verifying bundled tools...
=========================================
1. PostgreSQL Client (psql):
psql (PostgreSQL) 16.6

2. Cloud SQL Proxy:
cloud-sql-proxy version 2.14.3+windows.amd64

3. Python Word & Excel Tools:
  psycopg2:    2.9.12 (dt dec pq3 ext lo64)
  openpyxl:    3.1.5
  python-docx: 1.2.0
  xlsxwriter:  3.2.9

4. Node.js Document & MCP Libraries:
docx Document available: true
ExcelJS Workbook available: true
xlsx utils available: true
mammoth extractRawText available: true
=========================================
 All tools verified and ready for AI use!
=========================================
```

---

## ?? How An AI Can Create Documents Directly (Zero-Install)

### A. Creating Word Documents (.docx)

#### 1. In Node.js:
Run the ready-to-use script:
```bash
node create_word_document.js
```
Or import directly in your script:
```javascript
import * as docx from 'docx';
import fs from 'fs';

const doc = new docx.Document({
    sections: [{
        children: [
            new docx.Paragraph({ text: "Autonomous Report", heading: docx.HeadingLevel.TITLE }),
            new docx.Paragraph({ text: "Generated with pre-bundled docx library." })
        ]
    }]
});
const buffer = await docx.Packer.toBuffer(doc);
fs.writeFileSync("output.docx", buffer);
```

#### 2. In Python:
Run using bundled Python:
```bash
.\bundle\python\python.exe create_word_document.py
```
Or import directly (using `vendor/` fallback):
```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / "vendor"))

import docx

doc = docx.Document()
doc.add_heading("AI Generated Report", level=0)
doc.add_paragraph("This document was generated without running pip install.")
doc.save("output.docx")
```

---

### B. Creating Excel Spreadsheets (.xlsx)

#### 1. In Node.js:
Run the ready-to-use script:
```bash
node create_excel_document.js
```
Or import directly in your script:
```javascript
import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Data');
sheet.columns = [
    { header: 'ID', key: 'id' },
    { header: 'Metric', key: 'metric' },
    { header: 'Value', key: 'val' }
];
sheet.addRow({ id: 1, metric: 'Accuracy', val: 0.98 });
await workbook.xlsx.writeFile('output.xlsx');
```

#### 2. In Python:
Run using bundled Python:
```bash
.\bundle\python\python.exe create_excel_document.py
```
Or import directly (using `vendor/` fallback):
```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent / "vendor"))

import xlsxwriter

wb = xlsxwriter.Workbook("output.xlsx")
ws = wb.add_worksheet("Metrics")
ws.write("A1", "Task")
ws.write("B1", "Status")
ws.write("A2", "Sanity Check")
ws.write("B2", "Passed")
wb.close()
```

---

## ?? Starting the MCP Server

```bash
node gcp-mcp-server.js
```
