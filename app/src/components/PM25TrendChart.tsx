'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

interface PM25TrendChartProps {
  data: number[];
  currentValue: number;
}

export function PM25TrendChart({ data, currentValue }: PM25TrendChartProps) {
  // Generate 24-hour data with timestamps
  const chartData = data.map((value, index) => {
    const hour = new Date();
    hour.setHours(hour.getHours() - (23 - index));
    return {
      time: hour.getHours().toString().padStart(2, '0') + ':00',
      pm25: value,
      hour: hour.getHours()
    };
  });

  const getColorForValue = (value: number) => {
    if (value <= 12) return '#10b981'; // green
    if (value <= 35) return '#f59e0b'; // yellow
    if (value <= 55) return '#f97316'; // orange
    if (value <= 150) return '#ef4444'; // red
    return '#dc2626'; // dark red
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const color = getColorForValue(value);
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{`Time: ${label}`}</p>
          <p className="text-sm" style={{ color }}>
            <span className="font-bold">PM2.5: {value} μg/m³</span>
          </p>
        </div>
      );
    }
    return null;
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
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">24-Hour PM2.5 Trend</h3>
            <p className="text-sm text-gray-600">Real-time air quality monitoring</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{currentValue}</div>
          <div className="text-sm text-gray-600">Current μg/m³</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="pm25Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 'dataMax + 10']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="pm25"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#pm25Gradient)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Air Quality Levels */}
      <div className="mt-6 grid grid-cols-5 gap-2">
        {[
          { label: 'Excellent', range: '0-12', color: 'bg-green-500' },
          { label: 'Good', range: '13-35', color: 'bg-yellow-500' },
          { label: 'Moderate', range: '36-55', color: 'bg-orange-500' },
          { label: 'Unhealthy', range: '56-150', color: 'bg-red-500' },
          { label: 'Hazardous', range: '150+', color: 'bg-red-700' }
        ].map((level, index) => (
          <div key={index} className="text-center">
            <div className={`w-full h-2 ${level.color} rounded-full mb-2`}></div>
            <div className="text-xs font-medium text-gray-700">{level.label}</div>
            <div className="text-xs text-gray-500">{level.range}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
