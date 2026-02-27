@echo off
echo.
echo ==========================================
echo  FormForge UI - Setup Script
echo  Run this ONCE to set everything up
echo ==========================================
echo.

echo [1/4] Installing dependencies...
npm install
echo.

echo [2/4] Starting development server...
echo.
echo ==========================================
echo  SUCCESS! Your app will open at:
echo  http://localhost:5173
echo ==========================================
echo.
npm run dev
