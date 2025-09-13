#!/bin/bash

# Tree Guardian Platform Setup Script
# This script sets up the development environment for the Almaty Smog Tokenization Platform

set -e

echo "🌳 Setting up Tree Guardian Platform..."
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This script is designed for macOS. Please adapt for your OS."
    exit 1
fi

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    print_warning "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js..."
    brew install node
else
    print_success "Node.js already installed: $(node --version)"
fi

# Install Rust if not present
if ! command -v rustc &> /dev/null; then
    print_status "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source ~/.cargo/env
else
    print_success "Rust already installed: $(rustc --version)"
fi

# Install Solana CLI if not present
if ! command -v solana &> /dev/null; then
    print_status "Installing Solana CLI..."
    sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
else
    print_success "Solana CLI already installed: $(solana --version)"
fi

# Install Anchor CLI if not present
if ! command -v anchor &> /dev/null; then
    print_status "Installing Anchor CLI..."
    cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
    avm install latest
    avm use latest
else
    print_success "Anchor CLI already installed: $(anchor --version)"
fi

# Setup Solana configuration
print_status "Configuring Solana for devnet..."
solana config set --url devnet
solana config set --keypair ~/.config/solana/id.json

# Create Solana keypair if it doesn't exist
if [ ! -f ~/.config/solana/id.json ]; then
    print_status "Creating Solana keypair..."
    mkdir -p ~/.config/solana
    solana-keygen new --outfile ~/.config/solana/id.json --no-bip39-passphrase
fi

# Airdrop SOL for testing
print_status "Requesting devnet SOL airdrop..."
solana airdrop 2

# Install project dependencies
print_status "Installing smart contract dependencies..."
cd contract
if [ -f "package.json" ]; then
    npm install
else
    print_warning "No package.json found in contract directory"
fi

print_status "Installing frontend dependencies..."
cd ../app
if [ -f "package.json" ]; then
    npm install
else
    print_warning "No package.json found in app directory"
fi

# Build smart contracts
print_status "Building smart contracts..."
cd ../contract
if [ -f "Anchor.toml" ]; then
    anchor build
    print_success "Smart contracts built successfully"
else
    print_warning "No Anchor.toml found. Skipping contract build."
fi

# Create environment file for frontend
print_status "Creating environment configuration..."
cd ../app
if [ ! -f ".env.local" ]; then
    cat > .env.local << EOF
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS
NEXT_PUBLIC_PYTH_PRICE_FEED=HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_web3_storage_token_here
EOF
    print_success "Environment file created"
else
    print_success "Environment file already exists"
fi

# Create deployment script
print_status "Creating deployment script..."
cd ..
cat > scripts/deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying Tree Guardian Platform..."

# Deploy smart contracts
echo "Deploying smart contracts..."
cd contract
anchor deploy --provider.cluster devnet

# Get program ID
PROGRAM_ID=$(solana address -k target/deploy/tree_guardian-keypair.json)
echo "Program ID: $PROGRAM_ID"

# Update frontend environment
cd ../app
sed -i '' "s/NEXT_PUBLIC_PROGRAM_ID=.*/NEXT_PUBLIC_PROGRAM_ID=$PROGRAM_ID/" .env.local

# Build and start frontend
echo "Building frontend..."
npm run build

echo "✅ Deployment complete!"
echo "Program ID: $PROGRAM_ID"
echo "Frontend: npm run dev"
EOF

chmod +x scripts/deploy.sh

# Create test script
print_status "Creating test script..."
cat > scripts/test.sh << 'EOF'
#!/bin/bash

echo "🧪 Running Tree Guardian Platform tests..."

# Test smart contracts
echo "Testing smart contracts..."
cd contract
if [ -f "Anchor.toml" ]; then
    anchor test --skip-local-validator
else
    echo "No Anchor.toml found. Skipping contract tests."
fi

# Test frontend
echo "Testing frontend..."
cd ../app
if [ -f "package.json" ]; then
    npm test
else
    echo "No package.json found. Skipping frontend tests."
fi

echo "✅ Tests complete!"
EOF

chmod +x scripts/test.sh

# Create development script
print_status "Creating development script..."
cat > scripts/dev.sh << 'EOF'
#!/bin/bash

echo "🔧 Starting Tree Guardian Platform development..."

# Start Solana test validator in background
echo "Starting Solana test validator..."
solana-test-validator --reset --quiet &
VALIDATOR_PID=$!

# Wait for validator to start
sleep 5

# Deploy contracts
echo "Deploying contracts to local validator..."
cd contract
anchor deploy --provider.cluster localnet

# Start frontend development server
echo "Starting frontend development server..."
cd ../app
npm run dev &
FRONTEND_PID=$!

echo "✅ Development environment started!"
echo "Frontend: http://localhost:3000"
echo "Solana Explorer: https://explorer.solana.com/?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899"
echo ""
echo "To stop development environment:"
echo "kill $VALIDATOR_PID $FRONTEND_PID"

# Keep script running
wait
EOF

chmod +x scripts/dev.sh

# Create production deployment script
print_status "Creating production deployment script..."
cat > scripts/deploy-production.sh << 'EOF'
#!/bin/bash

echo "🌐 Deploying Tree Guardian Platform to production..."

# Deploy to Vercel
echo "Deploying to Vercel..."
cd app

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    npm install -g vercel
fi

# Deploy
vercel --prod

echo "✅ Production deployment complete!"
echo "Check your Vercel dashboard for the deployment URL"
EOF

chmod +x scripts/deploy-production.sh

# Print setup summary
echo ""
echo "🎉 Setup Complete!"
echo "=================="
print_success "All dependencies installed and configured"
print_success "Solana configured for devnet"
print_success "Development scripts created"
echo ""
echo "📋 Next Steps:"
echo "1. Run 'npm run dev' in the app directory to start the frontend"
echo "2. Run './scripts/deploy.sh' to deploy smart contracts"
echo "3. Run './scripts/test.sh' to run all tests"
echo "4. Run './scripts/dev.sh' for full development environment"
echo ""
echo "🔗 Useful Commands:"
echo "- Check Solana balance: solana balance"
echo "- Check Solana config: solana config get"
echo "- View program logs: solana logs <program-id>"
echo "- Deploy contracts: anchor deploy --provider.cluster devnet"
echo ""
echo "📚 Documentation:"
echo "- README.md: Project overview and setup"
echo "- docs/DEMO_SCRIPT.md: Demo presentation guide"
echo "- docs/PRESENTATION_OUTLINE.md: Google Slides template"
echo "- docs/ROADMAP.md: Development roadmap"
echo ""
print_success "Happy coding! 🌳"
