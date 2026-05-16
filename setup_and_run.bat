@echo off
echo Installing dependencies (node_modules)...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error: npm install failed! Please make sure Node.js is installed.
    pause
    exit /b %ERRORLEVEL%
)
echo.
echo Dependencies installed successfully!
echo Starting the development server...
npm run dev
pause
