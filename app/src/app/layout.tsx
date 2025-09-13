import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletContextProvider } from '@/components/WalletProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Almaty Smog Reduction Tokenization Platform',
  description: 'Gamified ReFi platform that tokenizes real-world assets as Tree Guardian NFTs for Almaty smog reduction',
  keywords: ['Solana', 'NFT', 'Environmental', 'Tokenization', 'Almaty', 'Air Quality'],
  authors: [{ name: 'Almaty Smog Tokenization Team' }],
  openGraph: {
    title: 'Almaty Smog Reduction Tokenization Platform',
    description: 'Gamified ReFi platform that tokenizes real-world assets as Tree Guardian NFTs for Almaty smog reduction',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Almaty Smog Reduction Tokenization Platform',
    description: 'Gamified ReFi platform that tokenizes real-world assets as Tree Guardian NFTs for Almaty smog reduction',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <WalletContextProvider>
            {children}
          </WalletContextProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}