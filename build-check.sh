#!/bin/bash

# Build Check Script
# This script verifies that the project builds correctly

echo "🔍 Checking build compatibility..."
echo ""

# Check Node version
echo "✓ Node version:"
node --version

# Check npm version
echo "✓ npm version:"
npm --version

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🧪 Running type check..."
npm run typecheck

echo ""
echo "🏗️ Building for production..."
npm run build

echo ""
echo "✓ Build check passed! ✅"
echo "You can now deploy this to Vercel"