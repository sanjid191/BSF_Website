@echo off
echo ========================================
echo BSF-GUB Backend Server (Node.js)
echo ========================================
echo.

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

:: Check if .env exists
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit .env and set your MySQL password!
    echo.
    pause
)

echo Starting server...
echo.
node src/server.js
