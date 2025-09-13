import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { config } from './config';

export const connection = new Connection(
  config.rpcEndpoint,
  'confirmed'
);

export const getClusterApiUrl = () => {
  return config.solanaNetwork === 'mainnet' 
    ? clusterApiUrl('mainnet-beta')
    : clusterApiUrl('devnet');
};

export const PROGRAM_ID = new PublicKey(config.programId);

// Mock PM2.5 data for Almaty (simulating AirVision.kz data)
export const mockPM25Data = {
  current: 45, // μg/m³
  average: 52,
  max: 78,
  min: 28,
  trend: 'improving', // 'improving', 'stable', 'worsening'
  lastUpdated: new Date().toISOString(),
  locations: [
    { name: 'Berezovsky Street', pm25: 42, trees: 15 },
    { name: 'Abay Avenue', pm25: 48, trees: 23 },
    { name: 'Satpayev Street', pm25: 51, trees: 18 },
    { name: 'Dostyk Avenue', pm25: 38, trees: 31 },
    { name: 'Al-Farabi Avenue', pm25: 55, trees: 12 },
  ]
};

// Tree locations in Almaty
export const TREE_LOCATIONS = [
  'Berezovsky Street',
  'Abay Avenue', 
  'Satpayev Street',
  'Dostyk Avenue',
  'Al-Farabi Avenue',
  'Kazakhstan Avenue',
  'Tole Bi Street',
  'Zhibek Zholy Street',
  'Kabanbay Batyr Avenue',
  'Raiymbek Avenue'
];

// Impact score calculation
export const calculateImpactScore = (pm25Level: number): number => {
  if (pm25Level < 25) return 200; // Excellent
  if (pm25Level < 50) return 150; // Good
  if (pm25Level < 100) return 100; // Moderate
  if (pm25Level < 150) return 50;  // Unhealthy
  return 25; // Hazardous
};

// Air quality categories
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
