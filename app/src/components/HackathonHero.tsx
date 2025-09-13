'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Wind, Leaf, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { WalletMultiButton } from '@/components/WalletProvider';
import { useLanguage } from '@/contexts/LanguageContext';

export function HackathonHero() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-green-500 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Trees */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          🌳
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 text-5xl opacity-15"
        >
          🌲
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 text-4xl opacity-25"
        >
          🌿
        </motion.div>
        
        {/* Floating Air Particles */}
        <motion.div
          animate={{ x: [0, 100, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-30"
        />
        <motion.div
          animate={{ x: [0, -80, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full opacity-40"
        />
        <motion.div
          animate={{ x: [0, 60, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-35"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-tight">
              <span className="inline-block mr-4">🌳</span>
              Tree Guardian
            </h1>
            <div className="text-2xl md:text-4xl font-bold text-white/90 mb-2">
              Clean Air for Almaty
            </div>
            <div className="text-lg md:text-xl text-white/80 font-medium">
              Plant Trees, Track Pollution, Earn NFTs
            </div>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="text-3xl font-bold text-white mb-2">1,247</div>
              <div className="text-white/80 font-medium">Trees Planted</div>
              <div className="text-sm text-white/60">This Month</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="text-3xl font-bold text-white mb-2">43</div>
              <div className="text-white/80 font-medium">PM2.5 Level</div>
              <div className="text-sm text-white/60">μg/m³ (Good)</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="text-3xl font-bold text-white mb-2">2.4K</div>
              <div className="text-white/80 font-medium">CO₂ Absorbed</div>
              <div className="text-sm text-white/60">kg This Month</div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
              <TreePine className="w-6 h-6" />
              Plant Your First Tree
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="relative">
              <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-purple-600 hover:!from-purple-600 hover:!to-purple-700 !text-white !font-bold !py-4 !px-8 !rounded-2xl !shadow-2xl hover:!shadow-purple-500/25 !transition-all !duration-300 hover:!scale-105 !border-0" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Real-time Monitoring</div>
                <div className="text-white/70 text-sm">Track air quality 24/7</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">NFT Rewards</div>
                <div className="text-white/70 text-sm">Earn tokens for impact</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Gamified Impact</div>
                <div className="text-white/70 text-sm">Make change fun</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
}
