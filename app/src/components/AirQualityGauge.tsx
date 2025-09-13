'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AirQualityGaugeProps {
  pm25: number;
  trend?: 'improving' | 'worsening' | 'stable';
}

export function AirQualityGauge({ pm25, trend = 'stable' }: AirQualityGaugeProps) {
  const getAirQualityData = (pm25: number) => {
    if (pm25 <= 12) return { 
      status: 'Excellent', 
      color: 'from-green-400 to-green-500', 
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      percentage: (pm25 / 12) * 20
    };
    if (pm25 <= 35) return { 
      status: 'Good', 
      color: 'from-green-500 to-yellow-400', 
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      percentage: 20 + ((pm25 - 12) / 23) * 20
    };
    if (pm25 <= 55) return { 
      status: 'Moderate', 
      color: 'from-yellow-400 to-orange-400', 
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200',
      percentage: 40 + ((pm25 - 35) / 20) * 20
    };
    if (pm25 <= 150) return { 
      status: 'Unhealthy', 
      color: 'from-orange-400 to-red-400', 
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
      percentage: 60 + ((pm25 - 55) / 95) * 20
    };
    return { 
      status: 'Hazardous', 
      color: 'from-red-400 to-red-600', 
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      percentage: 80 + ((pm25 - 150) / 100) * 20
    };
  };

  const airQuality = getAirQualityData(pm25);
  const trendIcon = trend === 'improving' ? TrendingUp : trend === 'worsening' ? TrendingDown : Minus;
  const trendColor = trend === 'improving' ? 'text-green-500' : trend === 'worsening' ? 'text-red-500' : 'text-gray-500';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${airQuality.bgColor} ${airQuality.borderColor} border-2 rounded-3xl p-6 shadow-lg`}
    >
      <div className="text-center">
        {/* Gauge Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${airQuality.color} rounded-2xl flex items-center justify-center shadow-lg`}>
            <Gauge className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* PM2.5 Value */}
        <div className="mb-4">
          <div className="text-4xl font-black text-gray-900 mb-2">{pm25}</div>
          <div className="text-lg font-semibold text-gray-600">μg/m³ PM2.5</div>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${airQuality.bgColor} ${airQuality.borderColor} border shadow-sm mb-4`}>
          <div className={`w-3 h-3 bg-gradient-to-r ${airQuality.color} rounded-full`}></div>
          <span className={`font-bold ${airQuality.textColor}`}>{airQuality.status}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>0</span>
            <span>WHO Limit: 15</span>
            <span>250+</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(airQuality.percentage, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${airQuality.color} rounded-full`}
            />
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm">
          {React.createElement(trendIcon, { className: `w-4 h-4 ${trendColor}` })}
          <span className={`font-medium ${trendColor}`}>
            {trend === 'improving' ? 'Improving' : trend === 'worsening' ? 'Worsening' : 'Stable'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
