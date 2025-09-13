'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TreePine, Wind, Users, ArrowRight } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  pm25: number;
  treesPlanted: number;
  targetTrees: number;
  contributors: number;
  status: 'active' | 'completed' | 'planned';
}

interface LocationCardsProps {
  locations: Location[];
}

export function LocationCards({ locations }: LocationCardsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'from-green-500 to-green-600';
      case 'completed': return 'from-blue-500 to-blue-600';
      case 'planned': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active Planting';
      case 'completed': return 'Completed';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  };

  const getPM25Color = (pm25: number) => {
    if (pm25 <= 12) return 'text-green-600 bg-green-50 border-green-200';
    if (pm25 <= 35) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (pm25 <= 55) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tree Planting Locations</h2>
          <p className="text-gray-600">Active reforestation projects across Almaty</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(location.status)} text-white`}>
                {getStatusText(location.status)}
              </div>
            </div>

            {/* PM2.5 Level */}
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border ${getPM25Color(location.pm25)} mb-4`}>
              <Wind className="w-4 h-4" />
              <span className="font-semibold">{location.pm25} μg/m³</span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <TreePine className="w-4 h-4" />
                  Trees Planted
                </span>
                <span>{location.treesPlanted} / {location.targetTrees}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(location.treesPlanted / location.targetTrees) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                />
              </div>
            </div>

            {/* Contributors */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{location.contributors} contributors</span>
              </div>
              <button className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">
                Join Project →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
