'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Wind, Award, Target, Zap, Leaf } from 'lucide-react';

interface GamificationStatsProps {
  totalTrees: number;
  co2Absorbed: number;
  nftsEarned: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  badges: string[];
}

export function GamificationStats({ 
  totalTrees, 
  co2Absorbed, 
  nftsEarned, 
  level, 
  xp, 
  nextLevelXp, 
  badges 
}: GamificationStatsProps) {
  const xpPercentage = (xp / nextLevelXp) * 100;

  const stats = [
    {
      icon: TreePine,
      label: 'Trees Planted',
      value: totalTrees,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      icon: Wind,
      label: 'CO₂ Absorbed',
      value: `${co2Absorbed}kg`,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      icon: Award,
      label: 'NFTs Earned',
      value: nftsEarned,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Progress</h3>
              <p className="text-sm text-gray-600">Level {level} Environmental Guardian</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{xp}</div>
            <div className="text-sm text-gray-600">XP</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Level {level}</span>
            <span>{xp} / {nextLevelXp} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
            />
          </div>
        </div>

        {/* Next Level Info */}
        <div className="text-center text-sm text-gray-600">
          {nextLevelXp - xp} XP until Level {level + 1}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-2xl p-4 border border-gray-100`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
            <p className="text-sm text-gray-600">Your environmental impact badges</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-xs font-semibold text-gray-700">{badge}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Impact Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-6 text-white shadow-xl"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Your Environmental Impact</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{totalTrees}</div>
              <div className="text-green-100">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{co2Absorbed}kg</div>
              <div className="text-green-100">CO₂ Absorbed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{nftsEarned}</div>
              <div className="text-green-100">NFTs Earned</div>
            </div>
          </div>
          <p className="text-green-100 text-sm">
            You've made a real difference in Almaty's air quality! 🌱
          </p>
        </div>
      </motion.div>
    </div>
  );
}
