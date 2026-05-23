#!/bin/bash
# deploy.sh - Quick deployment script for GamepadTester.live

set -e

echo "🚀 GamepadTester.live - Deployment Script"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "❌ Git not initialized. Please run: git init"
  exit 1
fi

# Check git configuration
if [ -z "$(git config user.name)" ]; then
  echo "⚠️  Git user.name not set. Setting..."
  git config user.name "GamepadTester Developer"
fi

if [ -z "$(git config user.email)" ]; then
  echo "⚠️  Git user.email not set. Setting..."
  git config user.email "dev@gamepadtester.live"
fi

echo "📦 Step 1: Installing dependencies..."
npm install --legacy-peer-deps 2>/dev/null || npm install

echo "🔨 Step 2: Building project..."
npm run build

echo "📋 Step 3: Generating sitemap..."
npm run generate-sitemap

echo "📝 Step 4: Committing changes..."
git add .
git commit -m "Build: Prepare for Vercel deployment" --allow-empty

echo ""
echo "✅ Ready to deploy!"
echo ""
echo "📌 Next steps:"
echo "1. Push to GitHub:"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/YOUR_USERNAME/Gamepadtester.live.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   Visit: https://vercel.com/new"
echo "   Select your GitHub repository"
echo "   Click Deploy"
echo ""
echo "🎉 Your site will be live in seconds!"
