'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, RefreshCw, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { jupiterClient, JupiterQuote, formatSwapQuote } from '@/lib/jupiter';
import { useStore } from '@/store/useStore';

interface JupiterSwapProps {
  nftMint: string;
  nftPrice: number;
  onSwapComplete?: (txSignature: string) => void;
}

export const JupiterSwap: React.FC<JupiterSwapProps> = ({
  nftMint,
  nftPrice,
  onSwapComplete,
}) => {
  const { publicKey, signTransaction } = useWallet();
  const [inputToken, setInputToken] = useState('SOL');
  const [outputToken, setOutputToken] = useState('TREE');
  const [inputAmount, setInputAmount] = useState('');
  const [quote, setQuote] = useState<JupiterQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supportedTokens = [
    { symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112' },
    { symbol: 'USDC', name: 'USD Coin', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    { symbol: 'USDT', name: 'Tether USD', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
  ];

  const getQuote = async () => {
    if (!inputAmount || !inputToken) return;

    setLoading(true);
    setError(null);

    try {
      const inputTokenInfo = supportedTokens.find(t => t.symbol === inputToken);
      if (!inputTokenInfo) throw new Error('Invalid input token');

      const amount = parseFloat(inputAmount);
      if (isNaN(amount) || amount <= 0) throw new Error('Invalid amount');

      const quoteResponse = await jupiterClient.getQuote(
        inputTokenInfo.address,
        nftMint,
        (amount * Math.pow(10, inputToken === 'SOL' ? 9 : 6)).toString(),
        50 // 0.5% slippage
      );

      setQuote(quoteResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get quote');
    } finally {
      setLoading(false);
    }
  };

  const executeSwap = async () => {
    if (!quote || !publicKey || !signTransaction) return;

    setSwapping(true);
    setError(null);

    try {
      const swapRequest = {
        quoteResponse: quote,
        userPublicKey: publicKey.toString(),
        wrapAndUnwrapSol: true,
        useSharedAccounts: true,
        asLegacyTransaction: false,
      };

      const txSignature = await jupiterClient.swap(swapRequest);
      
      setSuccess(`Swap completed! Transaction: ${txSignature}`);
      onSwapComplete?.(txSignature);
      
      // Reset form
      setInputAmount('');
      setQuote(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Swap failed');
    } finally {
      setSwapping(false);
    }
  };

  const swapTokens = () => {
    const temp = inputToken;
    setInputToken(outputToken);
    setOutputToken(temp);
    setQuote(null);
  };

  useEffect(() => {
    if (inputAmount && inputToken) {
      const timeoutId = setTimeout(getQuote, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [inputAmount, inputToken]);

  const formattedQuote = quote ? formatSwapQuote(quote) : null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <ArrowUpDown className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">Jupiter Swap</h3>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800">{success}</span>
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Input Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <div className="flex gap-2">
            <select
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {supportedTokens.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol} - {token.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={swapping}
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapTokens}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={swapping}
          >
            <ArrowUpDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Output Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <div className="flex gap-2">
            <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 flex items-center">
              TREE - Tree Guardian NFT
            </div>
            <div className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
              {formattedQuote ? formattedQuote.outputAmount : '0.00'}
            </div>
          </div>
        </div>

        {/* Quote Details */}
        {formattedQuote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-50 rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Price Impact:</span>
              <span className="text-gray-800">{formattedQuote.priceImpact}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Minimum Received:</span>
              <span className="text-gray-800">{formattedQuote.minimumReceived}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Trading Fee:</span>
              <span className="text-gray-800">{formattedQuote.fee}</span>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={getQuote}
            disabled={!inputAmount || loading || swapping}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Getting Quote...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Refresh Quote
              </>
            )}
          </button>

          <button
            onClick={executeSwap}
            disabled={!quote || !publicKey || swapping}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {swapping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Swapping...
              </>
            ) : (
              'Execute Swap'
            )}
          </button>
        </div>

        {!publicKey && (
          <div className="text-center text-sm text-gray-500">
            Please connect your wallet to execute swaps
          </div>
        )}
      </div>

      {/* Jupiter Branding */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Powered by <span className="font-medium text-blue-600">Jupiter</span> - 
          Best prices across all Solana DEXs
        </p>
      </div>
    </div>
  );
};
