'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, MapPin, Calendar, Star, Users, ExternalLink, Coins } from 'lucide-react';
import { DEMO_ACCOUNTS, DEMO_NFTS } from '@/data/mockData';

export const NFTGallery: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('alice');

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  };

  const getImpactBadge = (score: number) => {
    if (score >= 250) return { text: 'Epic', color: 'bg-purple-100 text-purple-800' };
    if (score >= 200) return { text: 'Rare', color: 'bg-blue-100 text-blue-800' };
    if (score >= 150) return { text: 'High Impact', color: 'bg-green-100 text-green-800' };
    if (score >= 100) return { text: 'Medium Impact', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Common', color: 'bg-gray-100 text-gray-800' };
  };

  // Filter NFTs by selected demo account
  const ownedNFTs = DEMO_NFTS.filter(nft => 
    nft.owner.toString() === DEMO_ACCOUNTS[selectedAccount as keyof typeof DEMO_ACCOUNTS].publicKey
  );

  if (ownedNFTs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Tree Guardian NFTs</h3>
        <p className="text-gray-500 mb-6">
          Mint your first Tree Guardian NFT to start contributing to Almaty's clean air future.
        </p>
        <div className="text-sm text-gray-400">
          Each NFT represents a real tree planted in Almaty
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <TreePine className="w-6 h-6 text-green-600" />
          Your Tree Guardians
        </h2>
        <div className="text-sm text-gray-500">
          {ownedNFTs.length} NFT{ownedNFTs.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Demo Account Selector */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-3">Demo Account (for showcase)</h3>
        <div className="flex gap-2">
          {Object.entries(DEMO_ACCOUNTS).map(([key, account]) => (
            <button
              key={key}
              onClick={() => setSelectedAccount(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedAccount === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              }`}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownedNFTs.map((nft, index) => {
          const impactBadge = getImpactBadge(nft.impactScore);
          
          return (
            <motion.div
              key={nft.mint.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-100 hover:shadow-md transition-shadow"
            >
              {/* NFT Image Placeholder */}
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg h-48 mb-4 flex items-center justify-center">
                <TreePine className="w-16 h-16 text-white" />
              </div>

              {/* NFT Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Tree Guardian #{nft.treeId}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactBadge.color}`}>
                    {impactBadge.text}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="truncate">{nft.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{formatDate(nft.plantingDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span>{nft.impactScore} impact points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-green-600" />
                    <span>{nft.co2Offset}kg CO₂ offset</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Trade
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Your Impact Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{ownedNFTs.length}</div>
            <div className="text-sm text-gray-600">Trees Planted</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {ownedNFTs.reduce((sum, nft) => sum + nft.impactScore, 0)}
            </div>
            <div className="text-sm text-gray-600">Impact Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {ownedNFTs.reduce((sum, nft) => sum + nft.co2Offset, 0)}kg
            </div>
            <div className="text-sm text-gray-600">CO₂ Offset</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(ownedNFTs.reduce((sum, nft) => sum + nft.impactScore, 0) / ownedNFTs.length) || 0}
            </div>
            <div className="text-sm text-gray-600">Avg Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};
