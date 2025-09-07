@echo off
REM Pre-deployment verification script for KadiPore Chilli Farms

echo 🌶️ KadiPore Chilli Farms - Pre-Deployment Check
echo ==================================================

REM Check if we're in the right directory
if not exist "netlify.toml" (
    echo ❌ Error: netlify.toml not found. Run this from the project root.
    exit /b 1
)

echo ✅ Project structure verified

REM Check frontend directory
if not exist "frontend" (
    echo ❌ Error: frontend directory not found
    exit /b 1
)

echo ✅ Frontend directory found

REM Change to frontend directory
cd frontend

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ Error: package.json not found in frontend/
    exit /b 1
)

echo ✅ Frontend package.json found

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Error: npm install failed
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Run build
echo 🔨 Building for production...
call npm run build

if errorlevel 1 (
    echo ❌ Error: Build failed
    exit /b 1
)

echo ✅ Build completed successfully

REM Check if dist directory exists
if not exist "dist" (
    echo ❌ Error: dist directory not created
    exit /b 1
)

echo ✅ Build output (dist/) created

REM Check critical files
echo 🔍 Checking critical files...

if not exist "dist\index.html" (
    echo ❌ Error: dist\index.html missing
    exit /b 1
)

if not exist "src\components\CustomChatbotWidget.jsx" (
    echo ❌ Error: CustomChatbotWidget.jsx missing
    exit /b 1
)

if not exist "src\chatbotConfig.js" (
    echo ❌ Error: chatbotConfig.js missing
    exit /b 1
)

if not exist "src\utils\scrollAnimations.jsx" (
    echo ❌ Error: scrollAnimations.jsx missing
    exit /b 1
)

echo ✅ All critical files present

REM Return to project root
cd ..

echo.
echo 🎉 PRE-DEPLOYMENT CHECK COMPLETE
echo =================================
echo.
echo ✅ Project ready for Netlify deployment!
echo.
echo Next steps:
echo 1. Push to GitHub repository
echo 2. Connect to Netlify
echo 3. Set build command: npm run build
echo 4. Set publish directory: frontend/dist
echo 5. Set base directory: frontend
echo.
echo 🚀 Ready to deploy KadiPore Chilli Farms!

pause
