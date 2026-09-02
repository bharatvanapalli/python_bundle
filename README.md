# Automation Tools Offline Bundle (AlloyDB Pipeline Sanity Check)

This repository contains pre-bundled, zero-dependency tools for running automated pipeline sanity checks against **AlloyDB / Cloud SQL** in air-gapped or restricted offline environments.

---

## ?? What is Included in the Bundle

The undle/ directory is completely standalone and self-contained:

| Component | Path | Version | Purpose |
|---|---|---|---|
| **PostgreSQL Client (psql)** | undle/bin/psql.exe | 16.6 | Direct command-line SQL queries & sanity checks |
| **Cloud SQL Proxy** | undle/bin/cloud-sql-proxy.exe | 2.14.3 | Secure tunneling to AlloyDB / Cloud SQL instances |
| **Python Runtime** | undle/python/python.exe | 3.14.0 | Python scripting & automated test execution |
| **PostgreSQL Driver** | undle/python/Lib/site-packages/psycopg2 | 2.9.12 | Python PostgreSQL DB API connector |
| **Excel Library** | undle/python/Lib/site-packages/openpyxl | 3.1.5 | Excel spreadsheet reading and reporting |

Additionally, offline .whl files are stored in wheels/ and vendored source in endor/.

---

## ?? Quick Start / Workspace Setup

### 1. Set PATH & Verify Environment (PowerShell)

Run the included verification script:

`powershell
powershell -ExecutionPolicy Bypass -File .\extract-and-use-bundle.ps1
`

*Output:*
`	ext
=========================================
Verifying bundled tools...
=========================================
1. PostgreSQL Client (psql):
psql (PostgreSQL) 16.6
2. Cloud SQL Proxy:
cloud-sql-proxy version 2.14.3+windows.amd64
3. Python & Drivers:
psycopg2: 2.9.12 (dt dec pq3 ext lo64)
openpyxl: 3.1.5
=========================================
 All tools verified and ready!
=========================================
`

### 2. Using CMD / Batch Script

To update PATH for the current command prompt session:
`cmd
bundle\setup-env.bat
`

To run diagnostic tests on all bundled tools:
`cmd
bundle\test-bundle.bat
`

---

## ?? Automation Scripts Integration

### Python Automation Example (lloydb_query_example.py)

Run using the bundled Python:
`cmd
.\bundle\python\python.exe alloydb_query_example.py
`

Code structure:
`python
import sys
from pathlib import Path

# Load bundled packages
bundle_dir = Path(__file__).resolve().parent / "bundle"
sys.path.insert(0, str(bundle_dir / "python" / "Lib" / "site-packages"))

import psycopg2

conn = psycopg2.connect(
    host="127.0.0.1",
    port=5432,
    dbname="postgres",
    user="postgres",
    password="your_password"
)
with conn.cursor() as cur:
    cur.execute("SELECT 1 AS sanity_check;")
    print(cur.fetchall())
`

### Node.js Automation Example (lloydb_query_example.js)

Run with Node.js:
`javascript
const { execSync } = require('child_process');
const path = require('path');

const bundleDir = path.join(__dirname, 'bundle');
const psqlPath = path.join(bundleDir, 'bin', 'psql.exe');

// Execute query using bundled psql.exe
const result = execSync("" -h 127.0.0.1 -p 5432 -U postgres -d my_db -c "SELECT 1;", {
  encoding: 'utf8'
});
console.log(result);
`

---

## ?? Git & Repository State

All binaries and libraries are located under undle/ and configured to be committed to the repository without needing external internet access or pip install during CI/CD or local test runs.
