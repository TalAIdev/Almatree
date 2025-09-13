'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';

interface AirQualityData {
  current: number;
  average: number;
  max: number;
  min: number;
  trend: 'improving' | 'worsening' | 'stable';
  lastUpdated: string;
}

interface AirQualityCardProps {
  data: AirQualityData;
  onRefresh: () => void;
}

export function AirQualityCard({ data, onRefresh }: AirQualityCardProps) {
  const getAirQualityStatus = (pm25: number) => {
    if (pm25 < 25) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (pm25 < 50) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    if (pm25 < 100) return { status: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    if (pm25 < 150) return { status: 'Unhealthy', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    return { status: 'Hazardous', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
  };

  const getTrendIcon = () => {
    switch (data.trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'worsening': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const airQuality = getAirQualityStatus(data.current);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${airQuality.bgColor} ${airQuality.borderColor} border-2 rounded-3xl p-6 mb-6 shadow-lg backdrop-blur-sm`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Almaty Air Quality</h2>
          <p className="text-sm text-gray-600">Real-time PM2.5 monitoring</p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Main PM2.5 Display */}
      <div className="text-center mb-6">
        <div className="relative">
          <div className="text-6xl font-black text-gray-900 mb-2 tracking-tight">
            {data.current}
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/80 rounded-full flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full ${airQuality.color.replace('text-', 'bg-')}`}></div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-600 mb-4 tracking-wide">μg/m³ PM2.5</div>
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md ${airQuality.color}`}>
          <div className={`w-4 h-4 rounded-full ${airQuality.color.replace('text-', 'bg-')} shadow-sm`}></div>
          <span className="font-bold text-xl tracking-wide">{airQuality.status}</span>
        </div>
      </div>

      {/* Trend and Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50">
          <div className="flex items-center gap-2 mb-2">
            {getTrendIcon()}
            <span className="text-sm font-semibold text-gray-800 capitalize">{data.trend}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Last 24 hours</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50">
          <div className="text-sm font-bold text-gray-900 mb-1">
            {data.min} - {data.max}
          </div>
          <div className="text-xs text-gray-600 font-medium">Range (μg/m³)</div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
      </div>
    </motion.div>
  );
}
