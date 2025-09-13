#!/bin/bash

# Tree Guardian Platform - Hackathon Deployment Script
# Quick deployment for Solana Day Kazakhstan 2025 demo

set -e

echo "🌳 Deploying Tree Guardian Platform for Hackathon Demo..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "contract/Anchor.toml" ] || [ ! -f "app/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Deploy smart contracts
print_status "Deploying smart contracts to devnet..."
cd contract

if [ ! -f "target/deploy/tree_guardian.so" ]; then
    print_status "Building smart contracts..."
    anchor build
fi

print_status "Deploying to devnet..."
anchor deploy --provider.cluster devnet

# Get program ID
PROGRAM_ID=$(solana address -k target/deploy/tree_guardian-keypair.json)
print_success "Program deployed with ID: $PROGRAM_ID"

# Update frontend environment
print_status "Updating frontend environment..."
cd ../app

if [ ! -f ".env.local" ]; then
    print_status "Creating environment file..."
    cat > .env.local << EOF
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=$PROGRAM_ID
NEXT_PUBLIC_PYTH_PRICE_FEED=HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=demo_token_for_hackathon
EOF
else
    print_status "Updating existing environment file..."
    sed -i.bak "s/NEXT_PUBLIC_PROGRAM_ID=.*/NEXT_PUBLIC_PROGRAM_ID=$PROGRAM_ID/" .env.local
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
fi

# Build frontend
print_status "Building frontend..."
npm run build

print_success "Frontend built successfully"

# Start development server
print_status "Starting development server..."
print_success "Demo is ready at: http://localhost:3000"
print_success "Program ID: $PROGRAM_ID"

echo ""
echo "🎉 Hackathon Demo Deployment Complete!"
echo "======================================"
echo ""
echo "📋 Demo Checklist:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Install Phantom wallet if not already installed"
echo "3. Switch to Solana devnet in Phantom"
echo "4. Request devnet SOL: solana airdrop 2"
echo "5. Connect wallet and test all features"
echo ""
echo "🔗 Useful Commands:"
echo "- Check balance: solana balance"
echo "- View program: solana program show $PROGRAM_ID"
echo "- View logs: solana logs $PROGRAM_ID"
echo ""
echo "📱 Demo Features to Test:"
echo "- Dashboard: PM2.5 monitoring and confetti"
echo "- Plant Tree: NFT minting with compliance"
echo "- My NFTs: Gallery with demo accounts"
echo "- Marketplace: Trading with mock Jupiter"
echo "- Leaderboard: Community rankings and badges"
echo ""
echo "🚀 Ready for Solana Day Kazakhstan 2025!"

# Start the development server
npm run dev
