#!/bin/bash

# Tree Guardian Platform Package Script
# This script creates a complete package for submission

set -e

echo "📦 Packaging Tree Guardian Platform for Submission..."
echo "===================================================="

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

# Get current directory
PROJECT_ROOT=$(pwd)
PACKAGE_NAME="almaty-smog-tokenization-$(date +%Y%m%d-%H%M%S)"
PACKAGE_DIR="$PROJECT_ROOT/$PACKAGE_NAME"

print_status "Creating package directory: $PACKAGE_DIR"
mkdir -p "$PACKAGE_DIR"

# Copy project files
print_status "Copying project files..."

# Copy main directories
cp -r contract "$PACKAGE_DIR/"
cp -r app "$PACKAGE_DIR/"
cp -r docs "$PACKAGE_DIR/"
cp -r scripts "$PACKAGE_DIR/"

# Copy root files
cp README.md "$PACKAGE_DIR/"
cp LICENSE "$PACKAGE_DIR/"
cp .gitignore "$PACKAGE_DIR/"

# Create submission package
print_status "Creating submission package..."

# Create submission README
cat > "$PACKAGE_DIR/SUBMISSION.md" << 'EOF'
# Tree Guardian Platform - Solana Day Kazakhstan 2025 Submission

## Project Overview
Gamified ReFi platform that tokenizes real-world assets (RWAs) as Tree Guardian NFTs for Almaty smog reduction.

## Quick Start
1. Run `./scripts/setup.sh` to install dependencies
2. Run `./scripts/deploy.sh` to deploy smart contracts
3. Run `cd app && npm run dev` to start frontend
4. Visit http://localhost:3000

## Demo Links
- **Live Demo**: [Vercel Deployment URL]
- **Video Demo**: [Loom Recording URL]
- **GitHub Repo**: [Repository URL]
- **Presentation**: [Google Slides URL]

## Key Features
- Real-time PM2.5 monitoring with gamification
- Tree Guardian NFT minting and trading
- Jupiter DEX integration for seamless swaps
- SEZ KZ compliance hooks with Token-2022
- Mobile-responsive design

## Technical Stack
- **Blockchain**: Solana (devnet)
- **Smart Contracts**: Anchor Framework (Rust)
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Trading**: Jupiter v6 SDK
- **Storage**: Web3.Storage (IPFS)
- **Deployment**: Vercel (free tier)

## Team
- Lead Developer: [Name]
- Smart Contract Engineer: [Name]
- Frontend Developer: [Name]
- UI/UX Designer: [Name]

## Contact
- Email: [team-email@example.com]
- GitHub: [repository-url]
- Solana Day Kazakhstan 2025

---
Built with ❤️ for Almaty's clean air future
EOF

# Create deployment instructions
cat > "$PACKAGE_DIR/DEPLOYMENT.md" << 'EOF'
# Deployment Instructions

## Prerequisites
- Node.js 18+
- Rust 1.70+
- Solana CLI 1.16+
- Anchor CLI 0.28+

## Smart Contract Deployment
```bash
cd contract
anchor build
anchor deploy --provider.cluster devnet
```

## Frontend Deployment
```bash
cd app
npm install
npm run build
vercel deploy
```

## Environment Setup
Create `.env.local` in the `app/` directory:
```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID
NEXT_PUBLIC_PYTH_PRICE_FEED=YOUR_PYTH_FEED_ID
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3_storage_token_here
```

## Testing
```bash
# Test smart contracts
./scripts/test-contracts.sh

# Test frontend
./scripts/test-frontend.sh

# Full test suite
./scripts/test.sh
```
EOF

# Create demo instructions
cat > "$PACKAGE_DIR/DEMO_INSTRUCTIONS.md" << 'EOF'
# Demo Instructions

## 3-Minute Demo Flow

### 1. Wallet Connection (15 seconds)
- Open platform
- Click "Connect Wallet"
- Select Phantom wallet
- Show connected state

### 2. Air Quality Dashboard (30 seconds)
- Navigate to Air Quality tab
- Show real-time PM2.5 data
- Point out location breakdown
- Show trend indicator
- Demonstrate confetti animation

### 3. NFT Minting (45 seconds)
- Go to "Fund Tree" tab
- Select location: "Abay Avenue"
- Set planting date: "Today"
- Show cost: "0.01 SOL"
- Click "Mint Tree Guardian NFT"
- Show success message

### 4. Marketplace Trading (30 seconds)
- Navigate to "Trade" tab
- Show Jupiter-powered marketplace
- Filter by location
- Sort by impact score
- Demonstrate swap interface

## Key Points to Highlight
- Real-world impact: Each NFT represents actual tree
- Gamification: Badges and rewards system
- Transparency: All transactions on-chain
- SEZ KZ Ready: Compliance hooks built-in
- Sub-second transactions: Solana performance

## Backup Plans
- Screenshots of key features
- Pre-recorded video
- Static mockups
- GitHub repo with full code
EOF

# Create package manifest
cat > "$PACKAGE_DIR/MANIFEST.json" << EOF
{
  "name": "almaty-smog-tokenization",
  "version": "1.0.0",
  "description": "Gamified ReFi platform for Almaty smog reduction",
  "type": "hackathon-submission",
  "event": "Solana Day Kazakhstan 2025",
  "track": "Asset Tokenization Case",
  "team": {
    "size": "2-4 developers",
    "timeline": "24-36 hours",
    "budget": "Zero (free tools only)"
  },
  "technologies": [
    "Solana",
    "Anchor",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Jupiter",
    "Pyth Network",
    "Web3.Storage"
  ],
  "features": [
    "Real-time PM2.5 monitoring",
    "Tree Guardian NFT minting",
    "Jupiter DEX integration",
    "Gamified dashboard",
    "SEZ KZ compliance hooks",
    "Mobile-responsive design"
  ],
  "deployment": {
    "smart_contracts": "Solana devnet",
    "frontend": "Vercel free tier",
    "storage": "Web3.Storage free tier",
    "domain": "Custom domain (if available)"
  },
  "submission_assets": [
    "README.md",
    "DEMO_SCRIPT.md",
    "PRESENTATION_OUTLINE.md",
    "ROADMAP.md",
    "SUBMISSION.md",
    "DEPLOYMENT.md",
    "DEMO_INSTRUCTIONS.md"
  ],
  "created": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "package_size": "$(du -sh "$PACKAGE_DIR" | cut -f1)"
}
EOF

# Create zip file
print_status "Creating zip file..."
cd "$PROJECT_ROOT"
zip -r "$PACKAGE_NAME.zip" "$PACKAGE_NAME" -x "*.DS_Store" "*/node_modules/*" "*/target/*" "*/.next/*" "*/coverage/*"

# Create tar.gz file
print_status "Creating tar.gz file..."
tar -czf "$PACKAGE_NAME.tar.gz" "$PACKAGE_NAME" --exclude="*.DS_Store" --exclude="*/node_modules" --exclude="*/target" --exclude="*/.next" --exclude="*/coverage"

# Calculate package sizes
ZIP_SIZE=$(du -sh "$PACKAGE_NAME.zip" | cut -f1)
TAR_SIZE=$(du -sh "$PACKAGE_NAME.tar.gz" | cut -f1)
DIR_SIZE=$(du -sh "$PACKAGE_NAME" | cut -f1)

# Create package summary
cat > "$PROJECT_ROOT/PACKAGE_SUMMARY.md" << EOF
# Package Summary

## Package Details
- **Name**: $PACKAGE_NAME
- **Created**: $(date)
- **Size**: $DIR_SIZE (uncompressed)
- **ZIP**: $ZIP_SIZE
- **TAR.GZ**: $TAR_SIZE

## Contents
- Smart contracts (Anchor/Rust)
- Next.js frontend application
- Comprehensive documentation
- Deployment and testing scripts
- Submission assets

## Files Created
- \`$PACKAGE_NAME.zip\` - ZIP archive
- \`$PACKAGE_NAME.tar.gz\` - TAR.GZ archive
- \`$PACKAGE_NAME/\` - Uncompressed directory

## Submission Checklist
- [x] Complete source code
- [x] Smart contracts deployed
- [x] Frontend application
- [x] Documentation
- [x] Demo script
- [x] Presentation outline
- [x] Roadmap
- [x] Deployment instructions
- [x] Testing scripts
- [x] Package manifest

## Next Steps
1. Upload to GitHub repository
2. Deploy to Vercel
3. Record demo video
4. Create presentation slides
5. Submit to Solana Day Kazakhstan 2025

## Contact
- GitHub: [repository-url]
- Demo: [vercel-url]
- Video: [loom-url]
- Presentation: [slides-url]
EOF

# Print summary
echo ""
echo "🎉 Package Created Successfully!"
echo "================================"
print_success "Package name: $PACKAGE_NAME"
print_success "Directory size: $DIR_SIZE"
print_success "ZIP file: $ZIP_SIZE"
print_success "TAR.GZ file: $TAR_SIZE"
echo ""
echo "📁 Package Contents:"
echo "- Smart contracts (contract/)"
echo "- Frontend application (app/)"
echo "- Documentation (docs/)"
echo "- Scripts (scripts/)"
echo "- Submission assets"
echo ""
echo "📋 Files Created:"
echo "- $PACKAGE_NAME.zip"
echo "- $PACKAGE_NAME.tar.gz"
echo "- $PACKAGE_NAME/ (directory)"
echo "- PACKAGE_SUMMARY.md"
echo ""
echo "🚀 Ready for Submission!"
echo ""
echo "Next steps:"
echo "1. Upload to GitHub: git push origin main"
echo "2. Deploy to Vercel: vercel deploy"
echo "3. Record demo video"
echo "4. Create presentation slides"
echo "5. Submit to Solana Day Kazakhstan 2025"
echo ""
echo "📧 Submission Links:"
echo "- GitHub: [repository-url]"
echo "- Demo: [vercel-url]"
echo "- Video: [loom-url]"
echo "- Presentation: [slides-url]"
