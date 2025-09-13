'use client';

import React from 'react';
import { TreePine, Menu, Bell } from 'lucide-react';
import { WalletMultiButton } from '@/components/WalletProvider';

interface HeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-green-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Tree Guardian</h1>
                <p className="text-xs text-gray-500">Clean Air for Almaty</p>
              </div>
            </div>
          </div>

          {/* Notifications and Wallet */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors relative">
              <Bell className="w-5 h-5 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <WalletMultiButton className="!bg-gradient-to-r !from-green-500 !to-emerald-600 hover:!from-green-600 hover:!to-emerald-700 !text-white !text-sm !px-4 !py-2 !rounded-lg !font-medium" />
          </div>
        </div>
      </div>
    </header>
  );
}
