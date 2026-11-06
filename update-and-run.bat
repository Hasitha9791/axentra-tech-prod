@echo off
title Axentra - Update from GitHub and Run
cd /d "%~dp0"

echo =============================================================
echo   Step 1: Fetching latest code from GitHub...
echo   Repo: https://github.com/Hasitha9791/axentra-tech-prod.git
echo =============================================================
echo.

git fetch origin main
if %ERRORLEVEL% neq 0 (
    echo.
    echo [NOTICE] Git fetch skipped or unauthenticated. Applying local patch...
) else (
    git reset --hard origin/main
)

node fix-hero.js
node remove-didula.js

echo.
echo =============================================================
echo   Step 2: Starting Local Web Server at http://localhost:8080/
echo =============================================================
echo Auto-opening browser...
start "" "http://localhost:8080/"

node server.js
pause
