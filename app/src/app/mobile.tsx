'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileHeader } from '@/components/Mobile/Header';
import { AirQualityCard } from '@/components/Mobile/AirQualityCard';
import { PM25Chart } from '@/components/Mobile/PM25Chart';
import { TreeMap } from '@/components/Mobile/TreeMap';
import { BottomNavigation, type Tab } from '@/components/Mobile/BottomNavigation';
import { ConnectWalletBanner } from '@/components/Mobile/ConnectWalletBanner';
import { PM25Dashboard } from '@/components/PM25Dashboard';
import { NFTMinter } from '@/components/NFTMinter';
import { NFTGallery } from '@/components/NFTGallery';
import { Marketplace } from '@/components/Marketplace';
import { Leaderboard } from '@/components/Leaderboard';
import { MOCK_PM25_DATA, TREE_LOCATIONS } from '@/data/mockData';

export default function MobilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pm25Data, setPm25Data] = useState(MOCK_PM25_DATA);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Generate mock 24-hour PM2.5 data
  const generate24HourData = () => {
    const data = [];
    for (let i = 0; i < 24; i++) {
      data.push(Math.max(20, Math.min(80, pm25Data.current + (Math.random() - 0.5) * 20)));
    }
    return data;
  };

  const [chartData] = useState(generate24HourData());

  useEffect(() => {
    const interval = setInterval(() => {
      setPm25Data(prev => ({
        ...prev,
        current: Math.max(15, Math.min(80, prev.current + (Math.random() - 0.5) * 10)),
        lastUpdated: new Date().toISOString(),
      }));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setPm25Data({
      ...MOCK_PM25_DATA,
      lastUpdated: new Date().toISOString(),
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="pb-20">
            <AirQualityCard data={pm25Data} onRefresh={refreshData} />
            <PM25Chart data={chartData} currentValue={pm25Data.current} />
            <TreeMap locations={TREE_LOCATIONS} />
            {!isWalletConnected && <ConnectWalletBanner />}
          </div>
        );
      case 'mint':
        return (
          <div className="pb-20">
            <NFTMinter />
          </div>
        );
      case 'gallery':
        return (
          <div className="pb-20">
            <NFTGallery />
          </div>
        );
      case 'marketplace':
        return (
          <div className="pb-20">
            <Marketplace />
          </div>
        );
      case 'leaderboard':
        return (
          <div className="pb-20">
            <Leaderboard />
          </div>
        );
      default:
        return (
          <div className="pb-20">
            <AirQualityCard data={pm25Data} onRefresh={refreshData} />
            <PM25Chart data={chartData} currentValue={pm25Data.current} />
            <TreeMap locations={TREE_LOCATIONS} />
            {!isWalletConnected && <ConnectWalletBanner />}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader onMenuClick={() => setIsMenuOpen(!isMenuOpen)} />
      
      <main className="px-4 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Menu</h2>
                <div className="space-y-4">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Settings</div>
                    <div className="text-sm text-gray-600">App preferences</div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Help & Support</div>
                    <div className="text-sm text-gray-600">Get help using the app</div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">About Tree Guardian</div>
                    <div className="text-sm text-gray-600">Learn more about our mission</div>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
