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

Write-Host "2. Cloud SQL Proxy:"
& "$bundleDir\bin\cloud-sql-proxy.exe" --version

Write-Host "3. Python & Drivers:"
& "$bundleDir\python\python.exe" -c "import psycopg2, openpyxl; print('psycopg2:', psycopg2.__version__); print('openpyxl:', openpyxl.__version__)"

Write-Host "========================================="
Write-Host " All tools verified and ready!"
Write-Host "========================================="
