'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, TrendingUp, TrendingDown, Minus, RefreshCw, MapPin, TreePine, Activity, Wind, Sun, AlertTriangle, CheckCircle } from 'lucide-react';
import { MOCK_PM25_DATA, TREE_LOCATIONS, getAirQualityCategory } from '@/data/mockData';
import Confetti from 'react-confetti';
import { useToast } from '@/components/ToastNotification';
import { useLanguage } from '@/contexts/LanguageContext';

export const PM25Dashboard: React.FC = () => {
  const [pm25Data, setPM25Data] = useState(MOCK_PM25_DATA);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const { showToast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    // Simulate real-time updates every 15 seconds for demo
    const interval = setInterval(() => {
      const newData = {
        ...MOCK_PM25_DATA,
        current: Math.max(25, Math.min(60, MOCK_PM25_DATA.current + (Math.random() - 0.5) * 8)),
        lastUpdated: new Date().toISOString(),
      };
      
      setPM25Data(newData);
      
      // Show confetti if air quality is excellent (for demo effect)
      if (newData.current < 35) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    try {
      setPM25Data({
        ...MOCK_PM25_DATA,
        lastUpdated: new Date().toISOString(),
      });
      showToast('success', t('common.success'), t('common.refresh'));
    } catch (error) {
      showToast('error', t('common.error'), t('common.refresh'));
    }
  };

  const airQuality = getAirQualityCategory(pm25Data.current);
  const trendIcon = pm25Data.trend === 'improving' ? TrendingUp : 
                   pm25Data.trend === 'worsening' ? TrendingDown : Minus;
  const TrendIcon = trendIcon;

  return (
    <div className="relative space-y-8">
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
        )}
      </AnimatePresence>

      {/* Premium Main Air Quality Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card p-10 fade-in-up"
        style={{ 
          background: 'var(--neutral-white)',
          boxShadow: 'var(--shadow-large)',
          borderRadius: '2rem'
        }}
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold flex items-center gap-4 tracking-tight" style={{ 
              color: 'var(--neutral-dark)', 
              fontFamily: 'var(--font-heading)' 
            }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'var(--gradient-primary)' }}>
                <Leaf className="w-8 h-8 text-white" />
              </div>
              {t('dashboard.title')}
            </h2>
            <p className="text-xl mt-3 font-medium" style={{ 
              color: 'var(--neutral-medium)', 
              fontFamily: 'var(--font-body)' 
            }}>{t('dashboard.subtitle')}</p>
          </div>
          <button
            onClick={refreshData}
            className="premium-button-secondary p-4 hover:scale-105"
            style={{ 
              background: 'var(--neutral-light)',
              color: 'var(--primary-green)',
              borderColor: 'var(--primary-green)'
            }}
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>

        {/* Premium Main PM2.5 Display */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="text-9xl font-black mb-6 tracking-tight" style={{ 
              color: 'var(--neutral-dark)', 
              fontFamily: 'var(--font-heading)',
              textShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              {pm25Data.current}
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'var(--neutral-white)' }}>
              {isClient && <div className={`w-3 h-3 rounded-full ${airQuality.color.replace('text-', 'bg-')} pulse-premium`}></div>}
            </div>
          </div>
          <div className="text-2xl font-bold mb-6 tracking-wide" style={{ 
            color: 'var(--neutral-medium)', 
            fontFamily: 'var(--font-body)' 
          }}>{t('dashboard.pm25Unit')}</div>
          <div className={`inline-flex items-center gap-4 px-8 py-4 rounded-3xl shadow-xl ${airQuality.color}`} style={{ 
            background: 'var(--neutral-white)',
            boxShadow: 'var(--shadow-medium)'
          }}>
            <div className={`w-6 h-6 rounded-full ${airQuality.color.replace('text-', 'bg-')} shadow-sm`}></div>
            <span className="font-bold text-2xl tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>{airQuality.category}</span>
          </div>
          <p className="text-lg mt-6 font-medium max-w-lg mx-auto leading-relaxed" style={{ 
            color: 'var(--neutral-medium)', 
            fontFamily: 'var(--font-body)' 
          }}>
            {airQuality.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendIcon className={`w-6 h-6 ${
                  pm25Data.trend === 'improving' ? 'text-green-600' :
                  pm25Data.trend === 'worsening' ? 'text-red-600' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 capitalize">
                  {pm25Data.trend}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Last 24 hours
                </div>
              </div>
            </div>
          </motion.div>

          {/* Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {pm25Data.min} - {pm25Data.max}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Range (μg/m³) • Avg: {pm25Data.average}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500 font-medium">
            Last updated: {new Date(pm25Data.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      </motion.div>

      {/* Tree Locations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3 tracking-tight">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            Tree Locations in Almaty
          </h3>
          <p className="text-gray-600 mt-2 font-medium">Interactive map showing tree planting impact</p>
        </div>

        {/* Interactive Map Container */}
        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 h-80 overflow-hidden border border-green-100">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-gray-200"></div>
              ))}
            </div>
          </div>

          {/* Tree Location Pins */}
          <div className="relative h-full">
            {TREE_LOCATIONS.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute group cursor-pointer"
                style={{
                  left: `${20 + (index * 15) % 60}%`,
                  top: `${30 + (index * 20) % 40}%`,
                }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <TreePine className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-gray-700">{location.treesPlanted}</span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-sm rounded-xl px-4 py-3 whitespace-nowrap shadow-lg">
                      <div className="font-semibold">{location.name}</div>
                      <div className="text-xs text-gray-300">{location.treesPlanted} trees • {location.pm25Level} μg/m³</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="p-3 bg-white/80 rounded-xl shadow-sm hover:bg-white transition-colors">
              <Wind className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-3 bg-white/80 rounded-xl shadow-sm hover:bg-white transition-colors">
              <Sun className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Location List */}
        <div className="space-y-3">
          {TREE_LOCATIONS.slice(0, 4).map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:from-gray-100 hover:to-blue-100 transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-sm"></div>
                <div>
                  <div className="font-semibold text-gray-900">{location.name}</div>
                  <div className="text-sm text-gray-600">{location.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{location.treesPlanted} trees</div>
                <div className="text-sm text-gray-600">{location.pm25Level} μg/m³</div>
              </div>
            </motion.div>
          ))}
          
          {TREE_LOCATIONS.length > 4 && (
            <button className="w-full p-4 text-center text-green-600 hover:text-green-700 font-semibold transition-colors bg-green-50 hover:bg-green-100 rounded-2xl">
              View all {TREE_LOCATIONS.length} locations
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
