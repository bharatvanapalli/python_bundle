"""
Pipeline Sanity Check - AlloyDB Query Automation (Python)

This script can be run using the bundled Python:
    .\bundle\python\python.exe alloydb_query_example.py

It connects to AlloyDB via the bundled Cloud SQL Proxy on localhost:5432.
"""
import os
import sys
import subprocess
import time
from pathlib import Path

# Ensure bundled modules are in sys.path
bundle_dir = Path(__file__).resolve().parent / "bundle"
site_packages = bundle_dir / "python" / "Lib" / "site-packages"
if site_packages.exists():
    sys.path.insert(0, str(site_packages))

try:
    import psycopg2
    from psycopg2 import sql
except ImportError:
    print("Error: psycopg2 not found. Run extract-and-use-bundle.ps1 or use bundle/python/python.exe")
    sys.exit(1)

def run_query(host="127.0.0.1", port=5432, dbname="postgres", user="postgres", password="password", query="SELECT version();"):
    print(f"Connecting to {dbname} at {host}:{port} as {user}...")
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            dbname=dbname,
            user=user,
            password=password,
            connect_timeout=10
        )
        with conn.cursor() as cur:
            cur.execute(query)
            results = cur.fetchall()
            print("Query executed successfully!")
            for row in results:
                print(row)
        conn.close()
    except Exception as e:
        print(f"Database query failed: {e}")

if __name__ == "__main__":
    print("=== AlloyDB Automation Script (Python) ===")
    print(f"Using psycopg2 version: {psycopg2.__version__}")
    # Update credentials or environment variables as needed
    db_host = os.getenv("DB_HOST", "127.0.0.1")
    db_port = int(os.getenv("DB_PORT", "5432"))
    db_name = os.getenv("DB_NAME", "postgres")
    db_user = os.getenv("DB_USER", "postgres")
    db_pass = os.getenv("DB_PASS", "")

    # Example query
    test_query = os.getenv("DB_QUERY", "SELECT 1 AS sanity_check;")
    run_query(host=db_host, port=db_port, dbname=db_name, user=db_user, password=db_pass, query=test_query)
