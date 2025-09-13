export const config = {
  solanaNetwork: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet',
  programId: process.env.NEXT_PUBLIC_PROGRAM_ID || 'Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS',
  pythPriceFeed: process.env.NEXT_PUBLIC_PYTH_PRICE_FEED || 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
  web3StorageToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || '',
  rpcEndpoint: process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet' 
    ? 'https://api.mainnet-beta.solana.com'
    : 'https://api.devnet.solana.com',
} as const;
