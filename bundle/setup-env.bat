@echo off
REM Setup script to add bundled tools to PATH
set PATH=%~dp0bin;%~dp0python;%~dp0python\Scripts;%PATH%
echo ========================================================
echo Bundled automation tools ready. PATH updated.
echo PostgreSQL client (psql), Cloud SQL Proxy, and Python ready.
echo ========================================================
