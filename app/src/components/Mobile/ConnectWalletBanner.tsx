'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Shield, TreePine } from 'lucide-react';
import { WalletMultiButton } from '@/components/WalletProvider';

export function ConnectWalletBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-green-100 text-sm mb-4">
            Connect your Solana wallet to start planting trees, minting NFTs, and tracking your environmental impact in Almaty.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1 text-xs bg-white/20 rounded-full px-3 py-1">
              <TreePine className="w-3 h-3" />
              <span>Plant Trees</span>
            </div>
            <div className="flex items-center gap-1 text-xs bg-white/20 rounded-full px-3 py-1">
              <Shield className="w-3 h-3" />
              <span>Mint NFTs</span>
            </div>
            <div className="flex items-center gap-1 text-xs bg-white/20 rounded-full px-3 py-1">
              <ArrowRight className="w-3 h-3" />
              <span>Track Impact</span>
            </div>
          </div>
          
          <WalletMultiButton className="!bg-white !text-green-600 hover:!bg-green-50 !font-semibold !px-6 !py-3 !rounded-xl !text-sm !shadow-lg !transition-all !duration-200" />
        </div>
      </div>
    </motion.div>
  );
}
