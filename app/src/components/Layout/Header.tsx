'use client';

import React from 'react';
import { TreePine, Leaf, Users, TrendingUp, Trophy } from 'lucide-react';
import { WalletMultiButton } from '@/components/WalletProvider';

export type Tab = 'dashboard' | 'mint' | 'gallery' | 'marketplace' | 'leaderboard';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: 'dashboard' as Tab, label: 'Dashboard', icon: Leaf },
  { id: 'mint' as Tab, label: 'Plant Tree', icon: TreePine },
  { id: 'gallery' as Tab, label: 'My NFTs', icon: Users },
  { id: 'marketplace' as Tab, label: 'Trade', icon: TrendingUp },
  { id: 'leaderboard' as Tab, label: 'Leaderboard', icon: Trophy },
];

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TreePine className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Tree Guardian</h1>
              <p className="text-xs text-gray-500">Almaty Smog Reduction</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Wallet Connection */}
          <WalletMultiButton className="!bg-gradient-to-r !from-green-600 !to-blue-600 hover:!from-green-700 hover:!to-blue-700" />
        </div>
      </div>
    </header>
  );
}
