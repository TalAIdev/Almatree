'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TreePine, Users, Zap } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  treesPlanted: number;
  co2Absorbed: number;
  nftsEarned: number;
  isCurrentUser?: boolean;
}

interface HackathonLeaderboardProps {
  entries: LeaderboardEntry[];
}

export function HackathonLeaderboard({ entries }: HackathonLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold text-sm">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-500';
      case 2: return 'from-gray-300 to-gray-400';
      case 3: return 'from-amber-500 to-amber-600';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Top Contributors</h3>
            <p className="text-sm text-gray-600">Environmental impact leaders</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Total Impact</div>
          <div className="text-lg font-bold text-green-600">
            {entries.reduce((sum, entry) => sum + entry.treesPlanted, 0)} Trees
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
              entry.isCurrentUser 
                ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {/* Rank */}
            <div className="flex-shrink-0">
              {getRankIcon(entry.rank)}
            </div>

            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                {entry.avatar}
              </div>
              {entry.rank <= 3 && (
                <div className={`absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r ${getRankColor(entry.rank)} rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-xs font-bold">{entry.rank}</span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 truncate">{entry.name}</h4>
                {entry.isCurrentUser && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    You
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <TreePine className="w-4 h-4" />
                  <span>{entry.treesPlanted} trees</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  <span>{entry.co2Absorbed}kg CO₂</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{entry.nftsEarned} NFTs</span>
                </div>
              </div>
            </div>

            {/* Impact Score */}
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {entry.treesPlanted * 2 + entry.co2Absorbed}
              </div>
              <div className="text-xs text-gray-500">Impact Score</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200"
      >
        <div className="text-center">
          <h4 className="font-bold text-gray-900 mb-2">Join the Movement!</h4>
          <p className="text-sm text-gray-600 mb-3">
            Plant trees, earn NFTs, and help clean Almaty's air
          </p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-2 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Planting
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
