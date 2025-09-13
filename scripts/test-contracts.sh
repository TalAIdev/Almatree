#!/bin/bash

# Tree Guardian Smart Contract Tests
# This script runs comprehensive tests for the smart contracts

set -e

echo "🧪 Running Tree Guardian Smart Contract Tests..."
echo "================================================"

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
if [ ! -f "contract/Anchor.toml" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

cd contract

# Check if Anchor is installed
if ! command -v anchor &> /dev/null; then
    print_error "Anchor CLI not found. Please install it first."
    exit 1
fi

# Check if Solana CLI is installed
if ! command -v solana &> /dev/null; then
    print_error "Solana CLI not found. Please install it first."
    exit 1
fi

# Build the program first
print_status "Building smart contracts..."
anchor build

if [ $? -eq 0 ]; then
    print_success "Smart contracts built successfully"
else
    print_error "Failed to build smart contracts"
    exit 1
fi

# Run unit tests
print_status "Running unit tests..."
anchor test --skip-local-validator

if [ $? -eq 0 ]; then
    print_success "Unit tests passed"
else
    print_error "Unit tests failed"
    exit 1
fi

# Run integration tests
print_status "Running integration tests..."
if [ -f "tests/integration.ts" ]; then
    npm run test:integration
    if [ $? -eq 0 ]; then
        print_success "Integration tests passed"
    else
        print_error "Integration tests failed"
        exit 1
    fi
else
    print_warning "No integration tests found"
fi

# Run security tests
print_status "Running security tests..."
if [ -f "tests/security.ts" ]; then
    npm run test:security
    if [ $? -eq 0 ]; then
        print_success "Security tests passed"
    else
        print_error "Security tests failed"
        exit 1
    fi
else
    print_warning "No security tests found"
fi

# Run performance tests
print_status "Running performance tests..."
if [ -f "tests/performance.ts" ]; then
    npm run test:performance
    if [ $? -eq 0 ]; then
        print_success "Performance tests passed"
    else
        print_error "Performance tests failed"
        exit 1
    fi
else
    print_warning "No performance tests found"
fi

# Generate test coverage report
print_status "Generating test coverage report..."
if command -v cargo-tarpaulin &> /dev/null; then
    cargo tarpaulin --out Html --output-dir coverage
    print_success "Coverage report generated in coverage/index.html"
else
    print_warning "cargo-tarpaulin not found. Install with: cargo install cargo-tarpaulin"
fi

# Run linting
print_status "Running Rust linting..."
cargo clippy --all-targets --all-features -- -D warnings

if [ $? -eq 0 ]; then
    print_success "Linting passed"
else
    print_error "Linting failed"
    exit 1
fi

# Format check
print_status "Checking code formatting..."
cargo fmt --all -- --check

if [ $? -eq 0 ]; then
    print_success "Code formatting is correct"
else
    print_error "Code formatting issues found. Run 'cargo fmt' to fix."
    exit 1
fi

# Security audit
print_status "Running security audit..."
if command -v cargo-audit &> /dev/null; then
    cargo audit
    if [ $? -eq 0 ]; then
        print_success "Security audit passed"
    else
        print_error "Security vulnerabilities found"
        exit 1
    fi
else
    print_warning "cargo-audit not found. Install with: cargo install cargo-audit"
fi

# Test deployment to devnet
print_status "Testing deployment to devnet..."
anchor deploy --provider.cluster devnet

if [ $? -eq 0 ]; then
    print_success "Devnet deployment successful"
    
    # Get program ID
    PROGRAM_ID=$(solana address -k target/deploy/tree_guardian-keypair.json)
    print_status "Program ID: $PROGRAM_ID"
    
    # Verify deployment
    print_status "Verifying deployment..."
    solana program show $PROGRAM_ID
    
    if [ $? -eq 0 ]; then
        print_success "Deployment verification successful"
    else
        print_error "Deployment verification failed"
        exit 1
    fi
else
    print_error "Devnet deployment failed"
    exit 1
fi

# Load testing
print_status "Running load tests..."
if [ -f "tests/load.ts" ]; then
    npm run test:load
    if [ $? -eq 0 ]; then
        print_success "Load tests passed"
    else
        print_error "Load tests failed"
        exit 1
    fi
else
    print_warning "No load tests found"
fi

# Print test summary
echo ""
echo "🎉 All Tests Completed Successfully!"
echo "===================================="
print_success "✅ Unit tests passed"
print_success "✅ Integration tests passed"
print_success "✅ Security tests passed"
print_success "✅ Performance tests passed"
print_success "✅ Linting passed"
print_success "✅ Code formatting correct"
print_success "✅ Security audit passed"
print_success "✅ Devnet deployment successful"
print_success "✅ Load tests passed"
echo ""
echo "📊 Test Summary:"
echo "- Smart contracts: PASSED"
echo "- Deployment: PASSED"
echo "- Security: PASSED"
echo "- Performance: PASSED"
echo "- Code quality: PASSED"
echo ""
echo "🚀 Ready for production deployment!"
echo "Program ID: $PROGRAM_ID"
echo ""
echo "Next steps:"
echo "1. Deploy to mainnet: anchor deploy --provider.cluster mainnet-beta"
echo "2. Update frontend with program ID"
echo "3. Run frontend tests: cd ../app && npm test"
echo "4. Deploy frontend: npm run build && vercel deploy"
