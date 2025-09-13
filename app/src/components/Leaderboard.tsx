'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Users, TreePine } from 'lucide-react';
import { LEADERBOARD_DATA, BADGE_DEFINITIONS } from '@/data/mockData';

export const Leaderboard: React.FC = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">
          {rank}
        </span>;
    }
  };

  const getBadgeIcon = (badgeName: string) => {
    const badge = BADGE_DEFINITIONS[badgeName as keyof typeof BADGE_DEFINITIONS];
    return badge ? badge.icon : '🏆';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-800">Tree Guardian Leaderboard</h2>
        </div>
        <p className="text-gray-600">
          Top contributors to Almaty's clean air future. Earn badges and climb the ranks!
        </p>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {LEADERBOARD_DATA.map((user, index) => (
            <motion.div
              key={user.publicKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all ${
                user.rank === 1 
                  ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50' 
                  : user.rank === 2
                  ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50'
                  : user.rank === 3
                  ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      {user.rank <= 3 && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          #{user.rank}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <TreePine className="w-4 h-4 text-green-600" />
                        <span>{user.nftCount} trees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span>{user.impactScore} points</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>{user.co2Offset}kg CO₂</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1">
                  {user.badges.slice(0, 3).map((badge, badgeIndex) => (
                    <span
                      key={badge}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      title={BADGE_DEFINITIONS[badge as keyof typeof BADGE_DEFINITIONS]?.description}
                    >
                      {getBadgeIcon(badge)} {badge}
                    </span>
                  ))}
                  {user.badges.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      +{user.badges.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badge Legend */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(BADGE_DEFINITIONS).map(([key, badge]) => (
            <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <div className="font-medium text-gray-800">{badge.name}</div>
                <div className="text-sm text-gray-600">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Community Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">113</div>
            <div className="text-sm text-green-100">Total Trees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">2,480</div>
            <div className="text-sm text-green-100">Impact Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">2,486</div>
            <div className="text-sm text-green-100">kg CO₂ Offset</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">43</div>
            <div className="text-sm text-green-100">Avg PM2.5</div>
          </div>
        </div>
      </div>
    </div>
  );
};
