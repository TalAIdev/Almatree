'use client';

import React from 'react';
import { Leaf, TreePine, Users, TrendingUp, Trophy } from 'lucide-react';

export type Tab = 'dashboard' | 'mint' | 'gallery' | 'marketplace' | 'leaderboard';

interface BottomNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { 
    id: 'dashboard' as Tab, 
    label: 'Dashboard', 
    icon: Leaf,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  { 
    id: 'mint' as Tab, 
    label: 'Plant Tree', 
    icon: TreePine,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  { 
    id: 'gallery' as Tab, 
    label: 'My NFTs', 
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  { 
    id: 'marketplace' as Tab, 
    label: 'Trade', 
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  { 
    id: 'leaderboard' as Tab, 
    label: 'Leaderboard', 
    icon: Trophy,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 px-4 py-3 z-50 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? `${tab.bgColor} ${tab.color} shadow-md scale-105` 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-300`} />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''} transition-all duration-300`}>
                {tab.label}
              </span>
              {isActive && (
                <div className={`w-1.5 h-1.5 rounded-full ${tab.color.replace('text-', 'bg-')} shadow-sm`}></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
