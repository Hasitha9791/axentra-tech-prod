@echo off
title Axentra Tech Local Server
cd /d "%~dp0"
echo =============================================================
echo   Axentra Tech - High Performance Local Server (v5.0)
echo =============================================================
echo   Local URL : http://localhost:8080/
echo   Starting server and opening default browser...
echo   (Press Ctrl+C to stop the server anytime)
echo =============================================================
echo.

:: Automatically open default browser after 1 second
start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:8080/"

:: Launch server
node server.js
if %errorlevel% neq 0 (
  echo.
  echo [Notice] Make sure Node.js is installed. If not, open index.html directly in your browser.
  pause
)
