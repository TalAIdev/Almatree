'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HackathonHero } from '@/components/HackathonHero';
import { HackathonDashboard } from '@/components/HackathonDashboard';

export default function Home() {
  const [showHero, setShowHero] = useState(true);

  const handleGetStarted = () => {
    setShowHero(false);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showHero ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <HackathonHero />
            {/* Get Started Button */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
              <motion.button
                onClick={handleGetStarted}
                className="bg-white/90 backdrop-blur-sm text-gray-900 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:bg-white transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HackathonDashboard />
            {/* Back to Hero Button */}
            <div className="fixed top-4 right-4 z-50">
              <motion.button
                onClick={() => setShowHero(true)}
                className="bg-white/90 backdrop-blur-sm text-gray-900 font-semibold py-2 px-4 rounded-xl shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>← Back</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}