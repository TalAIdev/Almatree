// Mock data for hackathon MVP demo
import { PublicKey } from '@solana/web3.js';

// Pre-seeded demo accounts for showcase
export const DEMO_ACCOUNTS = {
  alice: {
    name: 'Alice EcoWarrior',
    publicKey: 'So11111111111111111111111111111111111111112',
    balance: 2.5,
    nftCount: 3,
    impactScore: 450,
    badges: ['Tree Planter', 'Air Quality Champion', 'Early Adopter']
  },
  bob: {
    name: 'Bob GreenThumb',
    publicKey: 'So22222222222222222222222222222222222222223',
    balance: 1.8,
    nftCount: 2,
    impactScore: 320,
    badges: ['Tree Planter', 'Community Leader']
  },
  carol: {
    name: 'Carol CleanAir',
    publicKey: 'So33333333333333333333333333333333333333334',
    balance: 3.2,
    nftCount: 5,
    impactScore: 680,
    badges: ['Tree Planter', 'Air Quality Champion', 'Super Guardian', 'Top Contributor']
  }
};

// Hardcoded Almaty tree locations for demo
export const TREE_LOCATIONS = [
  {
    id: 'abay-avenue',
    name: 'Abay Avenue',
    coordinates: { lat: 43.2220, lng: 76.8512 },
    pm25Level: 42,
    treesPlanted: 23,
    impactScore: 85,
    description: 'Main commercial street with high foot traffic'
  },
  {
    id: 'dostyk-avenue',
    name: 'Dostyk Avenue',
    coordinates: { lat: 43.2381, lng: 76.9451 },
    pm25Level: 38,
    treesPlanted: 31,
    impactScore: 92,
    description: 'Residential area with parks and schools'
  },
  {
    id: 'berezovsky-street',
    name: 'Berezovsky Street',
    coordinates: { lat: 43.2565, lng: 76.9286 },
    pm25Level: 45,
    treesPlanted: 15,
    impactScore: 78,
    description: 'Industrial area requiring more trees'
  },
  {
    id: 'al-farabi-avenue',
    name: 'Al-Farabi Avenue',
    coordinates: { lat: 43.2074, lng: 76.6608 },
    pm25Level: 48,
    treesPlanted: 18,
    impactScore: 72,
    description: 'University district with student population'
  },
  {
    id: 'kazakhstan-avenue',
    name: 'Kazakhstan Avenue',
    coordinates: { lat: 43.2389, lng: 76.8894 },
    pm25Level: 41,
    treesPlanted: 26,
    impactScore: 88,
    description: 'Government buildings and cultural sites'
  }
];

// Mock PM2.5 data for Almaty
export const MOCK_PM25_DATA = {
  current: 43, // μg/m³
  average: 45,
  max: 68,
  min: 28,
  trend: 'improving' as const,
  lastUpdated: new Date().toISOString(),
  locations: TREE_LOCATIONS.map(loc => ({
    name: loc.name,
    pm25: loc.pm25Level,
    trees: loc.treesPlanted,
    impact: loc.impactScore
  })),
  // Precomputed CO2 offset values for quick display
  co2Offset: {
    total: 1250, // kg CO2
    perTree: 22, // kg CO2 per tree per year
    equivalent: '2.7 trees planted' // equivalent impact
  }
};

// Pre-seeded NFT data for marketplace showcase
export const DEMO_NFTS = [
  {
    mint: new PublicKey('So11111111111111111111111111111111111111112'),
    owner: new PublicKey(DEMO_ACCOUNTS.alice.publicKey),
    location: 'Abay Avenue',
    plantingDate: Date.now() / 1000 - 86400 * 30, // 30 days ago
    treeId: 1001,
    impactScore: 180,
    price: 0.05, // SOL
    seller: 'Alice EcoWarrior',
    metadataUri: 'https://ipfs.io/ipfs/mock-metadata-1',
    image: '/api/placeholder/300/300',
    rarity: 'Common',
    co2Offset: 22
  },
  {
    mint: new PublicKey('So22222222222222222222222222222222222222223'),
    owner: new PublicKey(DEMO_ACCOUNTS.bob.publicKey),
    location: 'Dostyk Avenue',
    plantingDate: Date.now() / 1000 - 86400 * 15, // 15 days ago
    treeId: 1002,
    impactScore: 220,
    price: 0.08, // SOL
    seller: 'Bob GreenThumb',
    metadataUri: 'https://ipfs.io/ipfs/mock-metadata-2',
    image: '/api/placeholder/300/300',
    rarity: 'Rare',
    co2Offset: 25
  },
  {
    mint: new PublicKey('So33333333333333333333333333333333333333334'),
    owner: new PublicKey(DEMO_ACCOUNTS.carol.publicKey),
    location: 'Kazakhstan Avenue',
    plantingDate: Date.now() / 1000 - 86400 * 7, // 7 days ago
    treeId: 1003,
    impactScore: 280,
    price: 0.12, // SOL
    seller: 'Carol CleanAir',
    metadataUri: 'https://ipfs.io/ipfs/mock-metadata-3',
    image: '/api/placeholder/300/300',
    rarity: 'Epic',
    co2Offset: 30
  },
  {
    mint: new PublicKey('So44444444444444444444444444444444444444445'),
    owner: new PublicKey(DEMO_ACCOUNTS.alice.publicKey),
    location: 'Berezovsky Street',
    plantingDate: Date.now() / 1000 - 86400 * 45, // 45 days ago
    treeId: 1004,
    impactScore: 150,
    price: 0.04, // SOL
    seller: 'Alice EcoWarrior',
    metadataUri: 'https://ipfs.io/ipfs/mock-metadata-4',
    image: '/api/placeholder/300/300',
    rarity: 'Common',
    co2Offset: 20
  },
  {
    mint: new PublicKey('So55555555555555555555555555555555555555556'),
    owner: new PublicKey(DEMO_ACCOUNTS.carol.publicKey),
    location: 'Al-Farabi Avenue',
    plantingDate: Date.now() / 1000 - 86400 * 20, // 20 days ago
    treeId: 1005,
    impactScore: 200,
    price: 0.07, // SOL
    seller: 'Carol CleanAir',
    metadataUri: 'https://ipfs.io/ipfs/mock-metadata-5',
    image: '/api/placeholder/300/300',
    rarity: 'Rare',
    co2Offset: 24
  }
];

// Leaderboard data for gamification
export const LEADERBOARD_DATA = [
  {
    rank: 1,
    name: 'Carol CleanAir',
    publicKey: DEMO_ACCOUNTS.carol.publicKey,
    nftCount: 5,
    impactScore: 680,
    co2Offset: 120,
    badges: ['Super Guardian', 'Top Contributor', 'Air Quality Champion'],
    avatar: '/api/placeholder/40/40'
  },
  {
    rank: 2,
    name: 'Alice EcoWarrior',
    publicKey: DEMO_ACCOUNTS.alice.publicKey,
    nftCount: 3,
    impactScore: 450,
    co2Offset: 66,
    badges: ['Tree Planter', 'Air Quality Champion'],
    avatar: '/api/placeholder/40/40'
  },
  {
    rank: 3,
    name: 'Bob GreenThumb',
    publicKey: DEMO_ACCOUNTS.bob.publicKey,
    nftCount: 2,
    impactScore: 320,
    co2Offset: 44,
    badges: ['Tree Planter', 'Community Leader'],
    avatar: '/api/placeholder/40/40'
  },
  {
    rank: 4,
    name: 'David TreeLover',
    publicKey: 'So44444444444444444444444444444444444444445',
    nftCount: 2,
    impactScore: 280,
    co2Offset: 40,
    badges: ['Tree Planter'],
    avatar: '/api/placeholder/40/40'
  },
  {
    rank: 5,
    name: 'Eva GreenFuture',
    publicKey: '55555555555555555555555555555555',
    nftCount: 1,
    impactScore: 150,
    co2Offset: 22,
    badges: ['Tree Planter'],
    avatar: '/api/placeholder/40/40'
  }
];

// Compliance status (simplified for hackathon)
export const COMPLIANCE_STATUS = {
  kyc: {
    status: 'passed',
    message: '✅ KYC Compliance Passed',
    details: 'User identity verified for SEZ KZ compliance'
  },
  aml: {
    status: 'passed',
    message: '✅ AML Compliance Passed',
    details: 'Anti-money laundering checks completed'
  },
  environmental: {
    status: 'verified',
    message: '✅ Environmental Impact Verified',
    details: 'Tree planting verified by Almaty city government'
  }
};

// Badge definitions for gamification
export const BADGE_DEFINITIONS = {
  'Tree Planter': {
    name: 'Tree Planter',
    description: 'Minted your first Tree Guardian NFT',
    icon: '🌱',
    color: 'green',
    requirement: 'Mint 1 NFT'
  },
  'Air Quality Champion': {
    name: 'Air Quality Champion',
    description: 'Contributed to significant air quality improvement',
    icon: '🏆',
    color: 'blue',
    requirement: 'Impact score > 400'
  },
  'Community Leader': {
    name: 'Community Leader',
    description: 'Active in the Tree Guardian community',
    icon: '👑',
    color: 'purple',
    requirement: 'Trade 3+ NFTs'
  },
  'Super Guardian': {
    name: 'Super Guardian',
    description: 'Top contributor to Almaty\'s clean air',
    icon: '🛡️',
    color: 'gold',
    requirement: 'Impact score > 600'
  },
  'Top Contributor': {
    name: 'Top Contributor',
    description: 'Highest impact score in the community',
    icon: '⭐',
    color: 'orange',
    requirement: 'Rank #1 on leaderboard'
  },
  'Early Adopter': {
    name: 'Early Adopter',
    description: 'Joined the platform in its early days',
    icon: '🚀',
    color: 'cyan',
    requirement: 'Joined before mainnet launch'
  }
};

// Mock swap quotes for Jupiter integration
export const MOCK_SWAP_QUOTES = {
  'SOL-TREE': {
    inputAmount: '0.1',
    outputAmount: '1',
    priceImpact: '0.5%',
    minimumReceived: '0.95',
    fee: '0.0025',
    route: 'SOL → TREE (Direct)'
  },
  'USDC-TREE': {
    inputAmount: '5.00',
    outputAmount: '1',
    priceImpact: '0.8%',
    minimumReceived: '0.92',
    fee: '0.005',
    route: 'USDC → SOL → TREE'
  }
};

// Air quality categories helper function
export const getAirQualityCategory = (pm25Level: number): {
  category: string;
  color: string;
  description: string;
} => {
  if (pm25Level < 25) {
    return {
      category: 'Excellent',
      color: 'text-green-600',
      description: 'Air quality is excellent'
    };
  }
  if (pm25Level < 50) {
    return {
      category: 'Good',
      color: 'text-blue-600', 
      description: 'Air quality is good'
    };
  }
  if (pm25Level < 100) {
    return {
      category: 'Moderate',
      color: 'text-yellow-600',
      description: 'Air quality is moderate'
    };
  }
  if (pm25Level < 150) {
    return {
      category: 'Unhealthy',
      color: 'text-orange-600',
      description: 'Air quality is unhealthy'
    };
  }
  return {
    category: 'Hazardous',
    color: 'text-red-600',
    description: 'Air quality is hazardous'
  };
};
