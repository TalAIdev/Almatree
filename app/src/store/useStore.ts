import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';

export interface TreeGuardianNFT {
  mint: PublicKey;
  owner: PublicKey;
  location: string;
  plantingDate: number;
  treeId: number;
  impactScore: number;
  metadataUri?: string;
}

export interface PM25Data {
  current: number;
  average: number;
  max: number;
  min: number;
  trend: 'improving' | 'stable' | 'worsening';
  lastUpdated: string;
  locations: Array<{
    name: string;
    pm25: number;
    trees: number;
  }>;
}

interface AppState {
  // Wallet state
  wallet: {
    connected: boolean;
    publicKey: PublicKey | null;
    balance: number;
  };
  
  // NFT state
  nfts: {
    owned: TreeGuardianNFT[];
    all: TreeGuardianNFT[];
    loading: boolean;
  };
  
  // PM2.5 data
  pm25Data: PM25Data | null;
  pm25Loading: boolean;
  
  // UI state
  ui: {
    showConfetti: boolean;
    selectedLocation: string;
    minting: boolean;
  };
  
  // Actions
  setWallet: (wallet: Partial<AppState['wallet']>) => void;
  setNFTs: (nfts: Partial<AppState['nfts']>) => void;
  setPM25Data: (data: PM25Data | null) => void;
  setPM25Loading: (loading: boolean) => void;
  setUI: (ui: Partial<AppState['ui']>) => void;
  addNFT: (nft: TreeGuardianNFT) => void;
  updateNFT: (mint: PublicKey, updates: Partial<TreeGuardianNFT>) => void;
  removeNFT: (mint: PublicKey) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  wallet: {
    connected: false,
    publicKey: null,
    balance: 0,
  },
  
  nfts: {
    owned: [],
    all: [],
    loading: false,
  },
  
  pm25Data: null,
  pm25Loading: false,
  
  ui: {
    showConfetti: false,
    selectedLocation: '',
    minting: false,
  },
  
  // Actions
  setWallet: (wallet) => 
    set((state) => ({ 
      wallet: { ...state.wallet, ...wallet } 
    })),
    
  setNFTs: (nfts) => 
    set((state) => ({ 
      nfts: { ...state.nfts, ...nfts } 
    })),
    
  setPM25Data: (data) => set({ pm25Data: data }),
  setPM25Loading: (loading) => set({ pm25Loading: loading }),
  
  setUI: (ui) => 
    set((state) => ({ 
      ui: { ...state.ui, ...ui } 
    })),
    
  addNFT: (nft) => 
    set((state) => ({
      nfts: {
        ...state.nfts,
        owned: [...state.nfts.owned, nft],
        all: [...state.nfts.all, nft],
      }
    })),
    
  updateNFT: (mint, updates) => 
    set((state) => ({
      nfts: {
        ...state.nfts,
        owned: state.nfts.owned.map(nft => 
          nft.mint.equals(mint) ? { ...nft, ...updates } : nft
        ),
        all: state.nfts.all.map(nft => 
          nft.mint.equals(mint) ? { ...nft, ...updates } : nft
        ),
      }
    })),
    
  removeNFT: (mint) => 
    set((state) => ({
      nfts: {
        ...state.nfts,
        owned: state.nfts.owned.filter(nft => !nft.mint.equals(mint)),
        all: state.nfts.all.filter(nft => !nft.mint.equals(mint)),
      }
    })),
}));
