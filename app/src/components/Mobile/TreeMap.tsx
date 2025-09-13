'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TreePine, Navigation } from 'lucide-react';

interface TreeLocation {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  pm25Level: number;
  treesPlanted: number;
  impactScore: number;
  description: string;
}

interface TreeMapProps {
  locations: TreeLocation[];
}

export function TreeMap({ locations }: TreeMapProps) {
  const getAirQualityColor = (pm25: number) => {
    if (pm25 < 25) return 'bg-green-500';
    if (pm25 < 50) return 'bg-blue-500';
    if (pm25 < 100) return 'bg-yellow-500';
    if (pm25 < 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-lg border border-white/50"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-blue-100 rounded-xl">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          Tree Locations in Almaty
        </h3>
        <p className="text-sm text-gray-600 font-medium">Interactive map showing tree planting impact</p>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 mb-6 h-72 overflow-hidden shadow-inner border border-green-100">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-200"></div>
            ))}
          </div>
        </div>

        {/* Tree Location Pins */}
        <div className="relative h-full">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute"
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 20) % 40}%`,
              }}
            >
              <div className="relative group">
                <div className={`w-6 h-6 ${getAirQualityColor(location.pm25Level)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
                  <TreePine className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">{location.treesPlanted}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                    <div className="font-semibold">{location.name}</div>
                    <div>{location.treesPlanted} trees • {location.pm25Level} μg/m³</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="p-2 bg-white/80 rounded-lg shadow-sm hover:bg-white transition-colors">
            <Navigation className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Location List */}
      <div className="space-y-3">
        {locations.slice(0, 3).map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 ${getAirQualityColor(location.pm25Level)} rounded-full`}></div>
              <div>
                <div className="font-medium text-gray-900 text-sm">{location.name}</div>
                <div className="text-xs text-gray-600">{location.description}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{location.treesPlanted} trees</div>
              <div className="text-xs text-gray-600">{location.pm25Level} μg/m³</div>
            </div>
          </motion.div>
        ))}
        
        {locations.length > 3 && (
          <button className="w-full p-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View all {locations.length} locations
          </button>
        )}
      </div>
    </motion.div>
  );
}
