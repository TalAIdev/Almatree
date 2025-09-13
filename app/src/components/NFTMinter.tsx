'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, MapPin, Calendar, Coins, Loader2, CheckCircle } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { TREE_LOCATIONS, COMPLIANCE_STATUS } from '@/data/mockData';

export const NFTMinter: React.FC = () => {
  const { publicKey, signTransaction } = useWallet();
  const [location, setLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const handleMint = async () => {
    if (!publicKey || !location || !plantingDate) {
      return;
    }

    setMinting(true);

    try {
      // Simulate minting process (simplified for hackathon demo)
      await new Promise(resolve => setTimeout(resolve, 2000));

      setMintSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setLocation('');
        setPlantingDate('');
        setMintSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
    const day = dateObj.getDate();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <TreePine className="w-8 h-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Fund a Tree</h2>
      </div>

      <div className="space-y-6">
        {/* Location Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Tree Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={minting}
          >
            <option value="">Select a location in Almaty</option>
            {TREE_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Planting Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Planting Date
          </label>
          <input
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={minting}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Cost Information */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Minting Cost</span>
          </div>
          <div className="text-2xl font-bold text-green-600">0.01 SOL</div>
          <div className="text-sm text-green-700">
            This covers the transaction fee and contributes to tree planting efforts
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-3">Compliance Status</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700">{COMPLIANCE_STATUS.kyc.message}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700">{COMPLIANCE_STATUS.aml.message}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700">{COMPLIANCE_STATUS.environmental.message}</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        {location && plantingDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <h3 className="font-medium text-gray-800 mb-2">NFT Preview</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div><strong>Location:</strong> {location}</div>
              <div><strong>Planting Date:</strong> {formatDate(plantingDate)}</div>
              <div><strong>Impact Score:</strong> 100 points</div>
              <div><strong>Estimated PM2.5 Reduction:</strong> 1 μg/m³</div>
            </div>
          </motion.div>
        )}

        {/* Mint Button */}
        {mintSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-green-100 border-2 border-green-300 text-green-800 py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Tree Guardian NFT Minted Successfully!
          </motion.div>
        ) : (
          <button
            onClick={handleMint}
            disabled={!publicKey || !location || !plantingDate || minting}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {minting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Minting Tree Guardian NFT...
              </>
            ) : (
              <>
                <TreePine className="w-5 h-5" />
                Mint Tree Guardian NFT
              </>
            )}
          </button>
        )}

        {!publicKey && (
          <div className="text-center text-sm text-gray-500">
            Please connect your wallet to mint a Tree Guardian NFT
          </div>
        )}
      </div>
    </div>
  );
};
