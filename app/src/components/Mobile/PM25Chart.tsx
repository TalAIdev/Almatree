'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PM25ChartProps {
  data: number[];
  currentValue: number;
}

export function PM25Chart({ data, currentValue }: PM25ChartProps) {
  const maxValue = Math.max(...data, currentValue);
  const minValue = Math.min(...data, currentValue);
  const range = maxValue - minValue;

  const getBarColor = (value: number) => {
    if (value < 25) return 'bg-green-400';
    if (value < 50) return 'bg-blue-400';
    if (value < 100) return 'bg-yellow-400';
    if (value < 150) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getBarHeight = (value: number) => {
    if (range === 0) return 'h-4';
    const percentage = ((value - minValue) / range) * 100;
    return `h-${Math.max(4, Math.min(20, Math.round(percentage / 5) * 4))}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-lg border border-white/50"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">24-Hour PM2.5 Trend</h3>
        <p className="text-sm text-gray-600 font-medium">Hourly air quality readings</p>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 w-8">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>

        {/* Chart */}
        <div className="ml-10 flex items-end gap-1 h-36">
          {data.map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
              className={`flex-1 ${getBarColor(value)} rounded-t-lg opacity-85 hover:opacity-100 transition-all duration-200 hover:scale-105 shadow-sm`}
              style={{ height: `${((value - minValue) / range) * 100}%` }}
              title={`${value} μg/m³`}
            />
          ))}
        </div>

        {/* X-axis */}
        <div className="ml-10 mt-2 flex justify-between text-xs text-gray-500">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* Current Value Indicator */}
      <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-700">Current Reading</div>
            <div className="text-2xl font-bold text-gray-900">{currentValue} μg/m³</div>
          </div>
          <div className={`w-4 h-4 rounded-full ${getBarColor(currentValue)}`}></div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-gray-600">Excellent (0-25)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-gray-600">Good (25-50)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span className="text-gray-600">Moderate (50-100)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
          <span className="text-gray-600">Unhealthy (100-150)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <span className="text-gray-600">Hazardous (150+)</span>
        </div>
      </div>
    </motion.div>
  );
}
