#!/bin/bash
# Pre-deployment verification script for KadiPore Chilli Farms

echo "🌶️ KadiPore Chilli Farms - Pre-Deployment Check"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "netlify.toml" ]; then
    echo "❌ Error: netlify.toml not found. Run this from the project root."
    exit 1
fi

echo "✅ Project structure verified"

# Check frontend directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found"
    exit 1
fi

echo "✅ Frontend directory found"

# Change to frontend directory
cd frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in frontend/"
    exit 1
fi

echo "✅ Frontend package.json found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: npm install failed"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run build
echo "🔨 Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not created"
    exit 1
fi

echo "✅ Build output (dist/) created"

# Check critical files
echo "🔍 Checking critical files..."

critical_files=(
    "dist/index.html"
    "src/components/CustomChatbotWidget.jsx"
    "src/chatbotConfig.js"
    "src/utils/scrollAnimations.jsx"
)

for file in "${critical_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Critical file missing: $file"
        exit 1
    fi
done

echo "✅ All critical files present"

# Return to project root
cd ..

echo ""
echo "🎉 PRE-DEPLOYMENT CHECK COMPLETE"
echo "================================="
echo ""
echo "✅ Project ready for Netlify deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub repository"
echo "2. Connect to Netlify"
echo "3. Set build command: npm run build"
echo "4. Set publish directory: frontend/dist"
echo "5. Set base directory: frontend"
echo ""
echo "🚀 Ready to deploy KadiPore Chilli Farms!"
