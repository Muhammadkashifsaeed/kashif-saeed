@echo off
echo ==========================================
echo Pushing updates to GitHub (kashif-saeed)
echo ==========================================

echo.
echo 1. Adding changed files...
git add .

echo.
echo 2. Committing changes...
git commit -m "Added 3 new projects and fixed CV preview"

echo.
echo 3. Pushing to GitHub (main branch)...
git push origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ==========================================
    echo [ERROR] Failed to push to GitHub!
    echo Please read the red/white error message above to see what went wrong.
    echo ==========================================
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ==========================================
echo [SUCCESS] Code pushed to GitHub successfully!
echo Vercel will now automatically deploy the updates to your existing link.
echo ==========================================
pause
