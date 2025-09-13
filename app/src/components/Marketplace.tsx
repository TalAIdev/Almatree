'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, MapPin, Calendar, Star, ArrowUpDown, Filter, Search, Coins } from 'lucide-react';
import { DEMO_NFTS, MOCK_SWAP_QUOTES } from '@/data/mockData';

export const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'impact' | 'date' | 'location' | 'price'>('impact');
  const [filterLocation, setFilterLocation] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  // Use demo NFT data for marketplace
  const marketplaceNFTs = DEMO_NFTS;

  const filteredNFTs = marketplaceNFTs
    .filter(nft => {
      const matchesSearch = nft.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nft.treeId.toString().includes(searchTerm);
      const matchesLocation = !filterLocation || nft.location === filterLocation;
      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'impact':
          return b.impactScore - a.impactScore;
        case 'date':
          return b.plantingDate - a.plantingDate;
        case 'location':
          return a.location.localeCompare(b.location);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

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

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Epic': return { color: 'bg-purple-100 text-purple-800' };
      case 'Rare': return { color: 'bg-blue-100 text-blue-800' };
      case 'Common': return { color: 'bg-gray-100 text-gray-800' };
      default: return { color: 'bg-gray-100 text-gray-800' };
    }
  };

  const locations = Array.from(new Set(marketplaceNFTs.map(nft => nft.location)));

  const handleTrade = (nft: any) => {
    setSelectedNFT(nft);
    setShowSwapModal(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <ArrowUpDown className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Tree Guardian Marketplace</h2>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location or tree ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex gap-2">
            {[
              { key: 'impact', label: 'Impact Score' },
              { key: 'price', label: 'Price' },
              { key: 'date', label: 'Planting Date' },
              { key: 'location', label: 'Location' }
            ].map(option => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === option.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNFTs.map((nft, index) => {
          const impactBadge = getImpactBadge(nft.impactScore);
          const rarityBadge = getRarityBadge(nft.rarity);
          
          return (
            <motion.div
              key={nft.mint.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-shadow"
            >
              {/* NFT Image */}
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg h-48 mb-4 flex items-center justify-center relative">
                <TreePine className="w-16 h-16 text-white" />
                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  #{nft.treeId}
                </div>
              </div>

              {/* NFT Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Tree Guardian #{nft.treeId}
                  </h3>
                  <div className="flex gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactBadge.color}`}>
                      {impactBadge.text}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${rarityBadge.color}`}>
                      {nft.rarity}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="truncate">{nft.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
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

                {/* Price and Actions */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        {nft.price} SOL
                      </div>
                      <div className="text-xs text-gray-500">
                        Seller: {nft.seller}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Buy Now
                    </button>
                    <button 
                      onClick={() => handleTrade(nft)}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Trade
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No NFTs Found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}

      {/* Jupiter Integration Notice */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUpDown className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">Powered by Jupiter</span>
        </div>
        <p className="text-sm text-blue-700">
          All trades are executed through Jupiter's DEX aggregation for the best prices and liquidity.
        </p>
      </div>

      {/* Simple Swap Modal */}
      {showSwapModal && selectedNFT && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Trade Tree Guardian #{selectedNFT.treeId}</h3>
              <button
                onClick={() => setShowSwapModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Current Price</div>
                <div className="text-2xl font-bold text-gray-800">{selectedNFT.price} SOL</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 mb-2">Mock Jupiter Quote</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Input:</span>
                    <span>0.1 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Output:</span>
                    <span>1 Tree Guardian NFT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price Impact:</span>
                    <span>0.5%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Trade executed! (Demo mode)');
                    setShowSwapModal(false);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Execute Trade
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
