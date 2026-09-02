#!/usr/bin/env bash
set -e
echo "Installing openpyxl and dependencies from bundled wheels (offline)..."
python3 -m pip install --no-index --find-links=wheels -r requirements.txt
echo "Successfully installed openpyxl offline!"
