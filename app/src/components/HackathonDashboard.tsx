'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AirQualityGauge } from './AirQualityGauge';
import { PM25TrendChart } from './PM25TrendChart';
import { LocationCards } from './LocationCards';
import { HackathonLeaderboard } from './HackathonLeaderboard';
import { GamificationStats } from './GamificationStats';
import { WalletMultiButton } from '@/components/WalletProvider';
import { useWallet } from '@solana/wallet-adapter-react';

type Tab = 'dashboard' | 'plant' | 'nfts' | 'trade' | 'leaderboard';

export function HackathonDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [pm25Data, setPm25Data] = useState(43);
  const [chartData, setChartData] = useState<number[]>([]);
  const { connected } = useWallet();

  // Mock data
  const locations = [
    {
      id: '1',
      name: 'Central Park',
      address: 'Almaty City Center',
      pm25: 38,
      treesPlanted: 156,
      targetTrees: 200,
      contributors: 23,
      status: 'active' as const
    },
    {
      id: '2',
      name: 'Kok-Tobe Hill',
      address: 'Kok-Tobe District',
      pm25: 45,
      treesPlanted: 89,
      targetTrees: 150,
      contributors: 15,
      status: 'active' as const
    },
    {
      id: '3',
      name: 'Medeu Valley',
      address: 'Medeu District',
      pm25: 32,
      treesPlanted: 200,
      targetTrees: 200,
      contributors: 31,
      status: 'completed' as const
    },
    {
      id: '4',
      name: 'Shymbulak Resort',
      address: 'Shymbulak Area',
      pm25: 28,
      treesPlanted: 0,
      targetTrees: 100,
      contributors: 0,
      status: 'planned' as const
    }
  ];

  const leaderboardEntries = [
    {
      rank: 1,
      name: 'EcoWarrior_2024',
      avatar: '🌱',
      treesPlanted: 45,
      co2Absorbed: 90,
      nftsEarned: 8,
      isCurrentUser: false
    },
    {
      rank: 2,
      name: 'GreenThumb_Almaty',
      avatar: '🌳',
      treesPlanted: 38,
      co2Absorbed: 76,
      nftsEarned: 6,
      isCurrentUser: false
    },
    {
      rank: 3,
      name: 'AirGuardian',
      avatar: '🌿',
      treesPlanted: 32,
      co2Absorbed: 64,
      nftsEarned: 5,
      isCurrentUser: false
    },
    {
      rank: 4,
      name: 'You',
      avatar: '👤',
      treesPlanted: 28,
      co2Absorbed: 56,
      nftsEarned: 4,
      isCurrentUser: true
    }
  ];

  const gamificationData = {
    totalTrees: 28,
    co2Absorbed: 56,
    nftsEarned: 4,
    level: 3,
    xp: 1250,
    nextLevelXp: 2000,
    badges: ['First Tree', 'CO₂ Fighter', 'NFT Collector', 'Eco Champion']
  };

  // Generate mock chart data
  useEffect(() => {
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push(Math.max(20, Math.min(80, pm25Data + (Math.random() - 0.5) * 20)));
      }
      setChartData(data);
    };
    generateData();
  }, [pm25Data]);

  // Simulate real-time PM2.5 updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPm25Data(prev => Math.max(15, Math.min(80, prev + (Math.random() - 0.5) * 10)));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Air Quality Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AirQualityGauge pm25={pm25Data} trend="improving" />
              <PM25TrendChart data={chartData} currentValue={pm25Data} />
            </div>

            {/* Location Cards */}
            <LocationCards locations={locations} />

            {/* Gamification Stats */}
            <GamificationStats {...gamificationData} />
          </div>
        );
      
      case 'plant':
        return (
          <div className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Plant a Tree</h2>
              <p className="text-gray-600 mb-8">Choose a location and plant your tree to earn NFTs</p>
              <LocationCards locations={locations} />
            </div>
          </div>
        );
      
      case 'nfts':
        return (
          <div className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your NFTs</h2>
              <p className="text-gray-600 mb-8">View and manage your environmental impact tokens</p>
              <GamificationStats {...gamificationData} />
            </div>
          </div>
        );
      
      case 'trade':
        return (
          <div className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trade NFTs</h2>
              <p className="text-gray-600 mb-8">Buy and sell environmental impact tokens</p>
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <p className="text-gray-500">Trading interface coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      case 'leaderboard':
        return (
          <div className="space-y-8">
            <HackathonLeaderboard entries={leaderboardEntries} />
            <GamificationStats {...gamificationData} />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🌳</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tree Guardian</h1>
                <p className="text-xs text-gray-600">Clean Air for Almaty</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <div className="font-semibold">Live PM2.5</div>
                <div className="text-green-600 font-bold">{pm25Data} μg/m³</div>
              </div>
              <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-purple-600 hover:!from-purple-600 hover:!to-purple-700 !text-white !font-bold !py-2 !px-6 !rounded-xl !shadow-lg hover:!shadow-purple-500/25 !transition-all !duration-300 hover:!scale-105 !border-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {connected ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-white text-3xl">🌳</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Tree Guardian</h2>
              <p className="text-gray-600 mb-8">
                Connect your wallet to start planting trees, tracking air quality, and earning NFTs for environmental impact.
              </p>
              <WalletMultiButton className="!bg-gradient-to-r !from-green-500 !to-green-600 hover:!from-green-600 hover:!to-green-700 !text-white !font-bold !py-4 !px-8 !rounded-2xl !shadow-2xl hover:!shadow-green-500/25 !transition-all !duration-300 hover:!scale-105 !border-0" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
