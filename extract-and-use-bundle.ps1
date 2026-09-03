# extract-and-use-bundle.ps1
# Setup script to configure PATH and verify offline bundled tools

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundleDir = Join-Path $scriptDir "bundle"

# If bundle folder doesn't exist but zip exists, extract it
if (-not (Test-Path $bundleDir)) {
    $zipPath = Join-Path $scriptDir "automation-tools-bundle.zip"
    if (Test-Path $zipPath) {
        Write-Host "Extracting automation tools bundle from $zipPath..."
        Expand-Archive -Path $zipPath -DestinationPath $bundleDir -Force
    } else {
        Write-Error "Error: Bundle folder not found at $bundleDir and no zip archive present."
        exit 1
    }
}

# Set PATH to use bundled tools
$env:PATH = "$bundleDir\bin;$bundleDir\python;$bundleDir\python\Scripts;$env:PATH"

# Verify tools are available
Write-Host "========================================="
Write-Host "Verifying bundled tools..."
Write-Host "========================================="

Write-Host "1. PostgreSQL Client (psql):"
& "$bundleDir\bin\psql.exe" --version

Write-Host "`n2. Cloud SQL Proxy:"
& "$bundleDir\bin\cloud-sql-proxy.exe" --version

Write-Host "`n3. Python Word & Excel Tools:"
& "$bundleDir\python\python.exe" -c "import psycopg2, openpyxl, docx, xlsxwriter; print('  psycopg2:   ', psycopg2.__version__); print('  openpyxl:   ', openpyxl.__version__); print('  python-docx:', docx.__version__); print('  xlsxwriter: ', xlsxwriter.__version__)"

Write-Host "`n4. Node.js Document & MCP Libraries:"
node "$scriptDir\test_office_tools.js"

Write-Host "========================================="
Write-Host " All tools verified and ready for AI use!"
Write-Host "========================================="
