# Almaty Smog Reduction Tokenization Platform 🌳

> **Hackathon-Ready MVP for Solana Day Kazakhstan 2025 - Asset Tokenization Case**

A simplified, gamified ReFi platform that tokenizes tree-planting efforts as tradeable NFTs, enabling fractional ownership in Almaty tree-planting initiatives for smog reduction. Built on Solana with mock integrations for rapid demo deployment.

## 🎯 Problem Statement

Almaty faces severe air pollution with PM2.5 levels often exceeding 150 μg/m³ (WHO safe limit: 25 μg/m³). Traditional environmental funding lacks transparency and citizen engagement. Our solution tokenizes tree-planting efforts as tradeable NFTs, creating a gamified ecosystem for smog reduction.

## 🚀 Hackathon MVP Features

### ✅ Essential Features (Implemented)
- **Premium UI/UX**: Hackathon-ready design with environmental theme and smooth animations
- **NFT Minting**: Plant trees and mint Tree Guardian NFTs on Solana devnet
- **Air Quality Gauge**: Color-coded PM2.5 monitoring with real-time updates
- **Interactive Charts**: 24-hour PM2.5 trends using Recharts visualization
- **Gamification**: XP system, badges, leaderboard, and impact tracking
- **Location Cards**: Tree planting projects with progress tracking
- **Multi-language Support**: English, Kazakh, and Russian translations
- **Phantom Wallet**: Single wallet integration for simplicity
- **Demo Data**: Pre-seeded accounts and NFTs for showcase

### 🔄 Simplified for Demo
- **Compliance**: Placeholder "✅ Compliance passed" messages
- **Mock Integrations**: Static JSON data instead of real oracles
- **Single Wallet**: Phantom only (removed multi-wallet complexity)
- **Basic Security**: Noted as "future step" in comments
- **Premium UI**: Hackathon-ready design with TailwindCSS, Framer Motion, and Recharts

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │  Solana Chain   │    │   Mock Data     │
│                 │    │                 │    │                 │
│ • Wallet Connect│◄──►│ • Tree Guardian │◄──►│ • PM2.5 Data    │
│ • PM2.5 Dashboard│    │   NFTs (SPL)    │    │ • Compliance    │
│ • NFT Marketplace│    │ • Basic Transfer│    │ • Demo Accounts │
│ • Gamification  │    │ • Minting Logic │    │ • Leaderboard   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

- **Blockchain**: Solana (devnet)
- **Smart Contracts**: Anchor Framework (Rust) - Simplified
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Charts**: Recharts for data visualization
- **UI Components**: Radix UI for accessibility
- **Wallet**: Phantom only
- **Trading**: Mock Jupiter integration
- **Data**: Static JSON files for demo
- **Deployment**: Vercel (free tier)

## 🚀 Quick Start (24-36h Demo Setup)

### Prerequisites

- Node.js 18+
- Rust 1.70+
- Solana CLI 1.16+
- Anchor CLI 0.28+
- Phantom wallet

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/almaty-smog-tokenization.git
cd almaty-smog-tokenization

# Setup Solana environment
solana config set --url devnet
solana-keygen new --outfile ~/.config/solana/id.json
solana airdrop 2

# Build and deploy contracts
cd contract
anchor build
anchor deploy --provider.cluster devnet

# Setup frontend
cd ../app
npm install
npm run dev
```

### Environment Setup

Create `.env.local` in the `app/` directory:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID
```

## 📱 Demo Features

### 1. Hero Section & Dashboard
- **Stunning Hero**: Environmental theme with animated background and clear messaging
- **Air Quality Gauge**: Color-coded PM2.5 monitoring with progress bars
- **Interactive Charts**: 24-hour PM2.5 trends with Recharts visualization
- **Location Cards**: Tree planting projects with progress tracking
- **Gamification Stats**: XP system, badges, and impact metrics
- **Real-time Updates**: Live PM2.5 data with smooth animations

### 2. Plant Tree (NFT Minting)
- Select from 5 hardcoded Almaty locations
- Choose planting date
- Pay 0.01 SOL minting fee
- Receive Tree Guardian NFT with impact score
- Compliance status display

### 3. My NFTs Gallery
- View owned Tree Guardian NFTs
- Demo account switcher (Amir, Aidai, Carol)
- Impact statistics and CO₂ offset tracking
- NFT details with rarity and badges

### 4. Marketplace
- Browse and trade Tree Guardian NFTs
- Filter by location, sort by impact/price
- Mock Jupiter swap integration
- Simple trade modal with quotes

### 5. Leaderboard
- Top contributors ranking
- Badge system and achievements
- Community impact metrics
- Gamification elements

## 🎨 Design System

### **Environmental Theme**
- **Color Palette**: Green (#16a34a) for trees, Blue (#2563eb) for clean air, Yellow/Orange for warnings
- **Background**: Sky blue to green gradient representing clean air
- **Typography**: Inter and Poppins fonts for modern readability
- **Icons**: Lucide React for consistent iconography

### **Premium Components**
- **Air Quality Gauge**: Color-coded PM2.5 monitoring with progress bars
- **Interactive Charts**: Recharts for beautiful data visualization
- **Location Cards**: Tree planting projects with progress tracking
- **Gamification Stats**: XP system, badges, and impact metrics
- **Modern Navigation**: Responsive design with smooth transitions

### **Animations & Interactions**
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Hover Effects**: Gradient buttons with scale transforms
- **Loading States**: Skeleton screens and progress indicators
- **Real-time Updates**: Live data with smooth animations

## 🎮 Gamification Elements

- **XP System**: Level-based progression with visual progress bars
- **Achievement Badges**: Environmental impact rewards and milestones
- **Impact Score**: Comprehensive tracking of environmental contribution
- **Leaderboard**: Top contributors with avatar system and rankings
- **Location Progress**: Visual progress bars for tree planting goals
- **Real-time Stats**: Live updates on trees planted and CO₂ absorbed
- **Smooth Animations**: Framer Motion for delightful user interactions

## 📊 Demo Data

### Pre-seeded Accounts
- **Alice EcoWarrior**: 3 NFTs, 450 impact points
- **Bob GreenThumb**: 2 NFTs, 320 impact points  
- **Carol CleanAir**: 5 NFTs, 680 impact points

### Tree Locations
- Abay Avenue (23 trees, 42 μg/m³ PM2.5)
- Dostyk Avenue (31 trees, 38 μg/m³ PM2.5)
- Berezovsky Street (15 trees, 45 μg/m³ PM2.5)
- Al-Farabi Avenue (18 trees, 48 μg/m³ PM2.5)
- Kazakhstan Avenue (26 trees, 41 μg/m³ PM2.5)

### Mock NFTs
- 5 pre-seeded Tree Guardian NFTs with varying rarities
- Impact scores from 150-280 points
- CO₂ offset calculations (20-30kg per tree)
- Price range: 0.04-0.12 SOL

## 🔮 Future Roadmap

### Phase 2: Production Ready
- Real Pyth oracle integration for PM2.5 data
- Full Jupiter DEX integration
- Token-2022 compliance hooks
- Security audit and mainnet deployment
- Multi-wallet support

### Phase 3: Scale
- Integration with Almaty city government
- Real tree planting verification
- KYC compliance for SEZ KZ
- Mobile app development
- Multi-city expansion

## 🧪 Testing

```bash
# Run smart contract tests
cd contract
anchor test

# Run frontend development
cd app
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
almaty-smog-tokenization/
├── contract/                 # Anchor smart contracts (simplified)
│   ├── programs/tree-guardian/
│   ├── tests/
│   └── migrations/
├── app/                      # Next.js frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── data/            # Mock data files
│   │   ├── lib/             # Utilities
│   │   └── app/             # Next.js app router
│   └── package.json
├── docs/                     # Documentation
└── scripts/                  # Setup scripts
```

## 🎥 Demo Script

### 3-Minute Demo Flow

1. **Hero Section (30s)**
   - Show stunning environmental theme
   - Highlight key stats and messaging
   - Demonstrate smooth animations

2. **Dashboard (45s)**
   - Air quality gauge with color coding
   - Interactive PM2.5 trend charts
   - Location cards with progress tracking
   - Gamification stats and XP system

3. **Plant Tree (30s)**
   - Select location and date
   - Show compliance status
   - Mint NFT with success animation

4. **Leaderboard (30s)**
   - Top contributors with avatars
   - Badge system and achievements
   - Community impact metrics

5. **Navigation (15s)**
   - Show responsive design
   - Language switcher (EN/KK/RU)
   - Mobile-friendly interface

## 🤝 Partnership Opportunities

- **UNDP Kazakhstan**: Environmental impact measurement
- **Almaty City Government**: Tree planting coordination
- **SEZ KZ**: Regulatory compliance framework
- **Solana Foundation**: $50K grant for scaling

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Your Name]
- **Smart Contract Engineer**: [Team Member]
- **Frontend Developer**: [Team Member]
- **UI/UX Designer**: [Team Member]

## 🙏 Acknowledgments

- Solana Foundation for the hackathon opportunity
- Pyth Network for price feed infrastructure
- Jupiter for DEX aggregation
- Almaty environmental data from AirVision.kz

---

**Built with ❤️ for Almaty's clean air future**

*This is a hackathon MVP with simplified features for demo purposes. Production deployment requires security audits and real integrations.*