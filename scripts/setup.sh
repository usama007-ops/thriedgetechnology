#!/bin/bash

# Thrill Edge Technologies - Quick Setup Script
# This script helps you set up the project locally

set -e

echo "🚀 Thrill Edge Technologies - Setup Script"
echo "=========================================="
echo ""

# Check Node.js
echo "✓ Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm"
    exit 1
fi

echo "✓ Node.js: $(node --version)"
echo "✓ pnpm: $(pnpm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo "✓ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local..."
    cp .env.example .env.local
    echo "✓ .env.local created"
    echo ""
    echo "⚠️  Please update .env.local with your configuration:"
    echo "  - NEXT_PUBLIC_WORDPRESS_URL: Your WordPress domain"
    echo "  - UPSTASH_REDIS_REST_URL: From Upstash console"
    echo "  - UPSTASH_REDIS_REST_TOKEN: From Upstash console"
    echo "  - REVALIDATE_SECRET: Generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    echo "  - CACHE_SECRET: Generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Read SETUP_GUIDE.md for detailed instructions"
echo "3. Run 'pnpm dev' to start the development server"
echo "4. Visit http://localhost:3000"
echo ""
echo "📖 Documentation:"
echo "  - README.md: Project overview and features"
echo "  - SETUP_GUIDE.md: Detailed setup instructions"
echo ""
