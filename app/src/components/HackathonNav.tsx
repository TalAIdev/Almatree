'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TreePine, 
  Image, 
  TrendingUp, 
  Trophy, 
  Menu, 
  X,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

type Tab = 'dashboard' | 'plant' | 'nfts' | 'trade' | 'leaderboard';

interface HackathonNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function HackathonNav({ activeTab, onTabChange }: HackathonNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard' as Tab, label: t('nav.dashboard'), icon: BarChart3, color: 'from-blue-500 to-blue-600' },
    { id: 'plant' as Tab, label: t('nav.plantTree'), icon: TreePine, color: 'from-green-500 to-green-600' },
    { id: 'nfts' as Tab, label: t('nav.myNFTs'), icon: Image, color: 'from-purple-500 to-purple-600' },
    { id: 'trade' as Tab, label: t('nav.trade'), icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
    { id: 'leaderboard' as Tab, label: t('nav.leaderboard'), icon: Trophy, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tree Guardian</h1>
                <p className="text-xs text-gray-600">Clean Air for Almaty</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={{
                      background: isActive ? `linear-gradient(135deg, var(--tw-gradient-stops))` : 'transparent',
                      '--tw-gradient-from': isActive ? tab.color.split(' ')[0].replace('from-', '') : '',
                      '--tw-gradient-to': isActive ? tab.color.split(' ')[2].replace('to-', '') : '',
                    } as React.CSSProperties}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="w-px h-6 bg-gray-300" />
              <div className="text-sm text-gray-600">
                <div className="font-semibold">Live PM2.5</div>
                <div className="text-green-600 font-bold">43 μg/m³</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Tree Guardian</h1>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Language</span>
                  <LanguageSwitcher />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div className="font-semibold">Live PM2.5: 43 μg/m³</div>
                  <div className="text-green-600">Good Air Quality</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.slice(0, 5).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{
                  background: isActive ? `linear-gradient(135deg, var(--tw-gradient-stops))` : 'transparent',
                  '--tw-gradient-from': isActive ? tab.color.split(' ')[0].replace('from-', '') : '',
                  '--tw-gradient-to': isActive ? tab.color.split(' ')[2].replace('to-', '') : '',
                } as React.CSSProperties}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
