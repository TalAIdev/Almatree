'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { MobileHeader } from '@/components/Mobile/Header';
import { AirQualityCard } from '@/components/Mobile/AirQualityCard';
import { PM25Chart } from '@/components/Mobile/PM25Chart';
import { TreeMap } from '@/components/Mobile/TreeMap';
import { BottomNavigation, type Tab } from '@/components/Mobile/BottomNavigation';
import { ConnectWalletBanner } from '@/components/Mobile/ConnectWalletBanner';
import { NFTMinter } from '@/components/NFTMinter';
import { NFTGallery } from '@/components/NFTGallery';
import { Marketplace } from '@/components/Marketplace';
import { Leaderboard } from '@/components/Leaderboard';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useToast } from '@/components/ToastNotification';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { MOCK_PM25_DATA, TREE_LOCATIONS } from '@/data/mockData';

export default function MobilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pm25Data, setPm25Data] = useState(MOCK_PM25_DATA);
  const { connected } = useWallet();
  const { showToast, ToastContainer } = useToast();
  const { t } = useLanguage();

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
      setPm25Data(prev => {
        try {
          return {
            ...prev,
            current: Math.max(15, Math.min(80, prev.current + (Math.random() - 0.5) * 10)),
            lastUpdated: new Date().toISOString(),
          };
        } catch (error) {
          console.error('Error updating PM25 data:', error);
          return prev;
        }
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    try {
      setPm25Data({
        ...MOCK_PM25_DATA,
        lastUpdated: new Date().toISOString(),
      });
      showToast('success', t('common.success'), t('common.refresh'));
    } catch (error) {
      showToast('error', t('common.error'), t('common.refresh'));
    }
  };

  // Ensure data integrity
  const safePm25Data = pm25Data || MOCK_PM25_DATA;
  const safeTreeLocations = TREE_LOCATIONS || [];
  const safeChartData = chartData && Array.isArray(chartData) ? chartData : generate24HourData();

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'dashboard':
          return (
            <div className="pb-20">
            <AirQualityCard data={safePm25Data} onRefresh={refreshData} />
            <PM25Chart data={safeChartData} currentValue={safePm25Data.current} />
            <TreeMap locations={safeTreeLocations} />
              {!connected && <ConnectWalletBanner />}
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
            <AirQualityCard data={safePm25Data} onRefresh={refreshData} />
            <PM25Chart data={safeChartData} currentValue={safePm25Data.current} />
            <TreeMap locations={safeTreeLocations} />
            {!connected && <ConnectWalletBanner />}
          </div>
        );
    }
    } catch (error) {
      console.error('Error rendering content:', error);
      showToast('error', t('common.error'), 'Unable to load this section. Please try switching tabs or refreshing.');
      return (
        <div className="pb-20 p-4">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-red-800 font-bold text-lg">Content Loading Issue</h3>
            </div>
            <p className="text-red-700 text-sm leading-relaxed">
              We're having trouble loading this section. Try switching to another tab or refreshing the page.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
        <MobileHeader onMenuClick={() => setIsMenuOpen(!isMenuOpen)} />
        
        <main className="px-4 pt-4 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <ToastContainer />

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
                
                {/* Language Switcher */}
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-3">Language / Тіл / Язык</div>
                  <LanguageSwitcher />
                </div>
                
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
    </ErrorBoundary>
  );
}
