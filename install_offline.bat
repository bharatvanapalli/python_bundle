@echo off
echo Installing openpyxl and dependencies from bundled wheels (offline)...
python -m pip install --no-index --find-links=wheels -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo Installation failed.
    exit /b %ERRORLEVEL%
)
echo Successfully installed openpyxl offline!
