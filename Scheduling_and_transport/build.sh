#!/bin/bash

# Build script for Render deployment
echo "🚀 Starting build process..."

# Install and build frontend
echo "📦 Building React frontend..."
cd frontend
npm install
npm run build

# Copy built assets to Django static folder
echo "📋 Copying assets to Django static..."
cd ..
mkdir -p backend/static/assets
cp -r frontend/dist/assets/* backend/static/assets/ 2>/dev/null || echo "No assets to copy"

# Copy all frontend dist files for serving
echo "📋 Copying all frontend files..."
mkdir -p backend/templates
cp frontend/dist/index.html backend/templates/ 2>/dev/null || echo "No index.html to copy"

# Copy logo and other public assets
cp frontend/public/logo.png backend/static/ 2>/dev/null || echo "No logo to copy"
cp -r frontend/public/* backend/static/ 2>/dev/null || echo "No public files to copy"

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
cd backend
pip install -r requirements.txt

# Collect static files
echo "🗂️ Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Build complete!"
