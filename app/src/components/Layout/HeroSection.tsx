'use client';

import React, { useState, useEffect } from 'react';
import { TreePine, Zap, MapPin, TrendingUp, ArrowRight } from 'lucide-react';

interface PM25Data {
  current: number;
  whoLimit: number;
  status: string;
}

interface HeroSectionProps {
  pm25Data: PM25Data;
  onMintClick: () => void;
}

export function HeroSection({ pm25Data, onMintClick }: HeroSectionProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by not rendering dynamic content until client-side
  if (!isClient) {
    return (
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            Clear Almaty's Air with Solana
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Mint NFTs to offset 20kg of CO₂ and track local air quality in real-time
          </p>
          
          {/* Live PM2.5 Ticker - Static version for SSR */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Live PM2.5:</span>
            </div>
            <span className="text-2xl font-bold">{pm25Data.current}</span>
            <span className="text-sm text-green-200">μg/m³</span>
            <span className="text-xs bg-green-500/20 px-2 py-1 rounded-full">{pm25Data.status}</span>
          </div>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onMintClick}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <TreePine className="w-6 h-6" />
              Mint Your NFT
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
              Learn More
            </button>
          </div>
          
          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Real-time PM2.5 monitoring</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Location-based tree planting</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Tradeable impact tokens</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
          Clear Almaty's Air with Solana
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
          Mint NFTs to offset 20kg of CO₂ and track local air quality in real-time
        </p>
        
          {/* Live PM2.5 Ticker - Client-side with animation */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live PM2.5:</span>
            </div>
            <span className="text-2xl font-bold">{pm25Data.current}</span>
            <span className="text-sm text-green-200">μg/m³</span>
            <span className="text-xs bg-green-500/20 px-2 py-1 rounded-full">{pm25Data.status}</span>
          </div>
        
        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={onMintClick}
            className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <TreePine className="w-6 h-6" />
            Mint Your NFT
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
            Learn More
          </button>
        </div>
        
        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Real-time PM2.5 monitoring</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Location-based tree planting</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Tradeable impact tokens</span>
          </div>
        </div>
      </div>
    </section>
  );
}
