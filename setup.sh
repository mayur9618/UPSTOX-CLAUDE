#!/bin/bash

# Production Setup Script for Upstox Trading Assistant
# Run this after cloning the repository

echo "🚀 Upstox Trading Assistant - Production Setup"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if .env exists
if [ -f .env ]; then
    echo "✅ .env file found"
else
    echo "⚠️  .env file not found"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and add your credentials:"
    echo "   - UPSTOX_API_KEY"
    echo "   - UPSTOX_API_SECRET"
    echo "   - UPSTOX_REDIRECT_URI"
    echo "   - ANTHROPIC_API_KEY"
fi

# Check if Vercel CLI is installed
echo ""
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -eq 0 ]; then
        echo "✅ Vercel CLI installed successfully"
    else
        echo "❌ Failed to install Vercel CLI"
        echo "Try manually: npm install -g vercel"
    fi
else
    echo "✅ Vercel CLI found: $(vercel -v)"
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Get your Upstox API credentials from https://upstox.com/developer"
echo "2. Get your Anthropic API key from https://console.anthropic.com"
echo "3. Update .env file with your credentials"
echo "4. Run: vercel login"
echo "5. Run: vercel (to deploy)"
echo "6. Add environment variables in Vercel dashboard"
echo "7. Run: vercel --prod (final deployment)"
echo ""
echo "📚 Read QUICKSTART.md for detailed instructions"
echo ""
